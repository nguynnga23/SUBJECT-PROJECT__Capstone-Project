package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.LoginReq;
import com.backend.dto.request.RegisterReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.DepartmentFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.DepartmentVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientResponseException;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1")
public class AuthController {
    private final StrapiClient strapiClient;
    @Autowired
    public AuthController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }
    @PostMapping("/v1/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req) {
        Map<String, Object> body = Map.of(
                "identifier", req.email(),
                "password",   req.password()
        );
        var type = new ParameterizedTypeReference<Map<String,Object>>() {};

        Map<String,Object> auth;
        try {
            auth = strapiClient.login(body, type); // forward /auth/local
        } catch (org.springframework.web.client.RestClientResponseException e) {
            // Đọc message Strapi và chuyển mã lỗi phù hợp
            String msg = extractStrapiMessage(e.getResponseBodyAsString());
            int status = e.getRawStatusCode(); // thường là 400

            // Chuẩn hoá: 400 "Invalid identifier or password" -> 401 cho FE
            if (status == 400 && "Invalid identifier or password".equalsIgnoreCase(msg)) {
                return ResponseEntity.status(401).body(Map.of(
                        "ok", false,
                        "code", "INVALID_CREDENTIALS",
                        "message", msg
                ));
            }
            // Có thể gặp các case khác: chưa confirm email / bị block
            if (status == 400 && msg.toLowerCase().contains("not confirmed")) {
                return ResponseEntity.status(403).body(Map.of(
                        "ok", false,
                        "code", "EMAIL_NOT_CONFIRMED",
                        "message", msg
                ));
            }
            if ((status == 400 || status == 403) && msg.toLowerCase().contains("blocked")) {
                return ResponseEntity.status(403).body(Map.of(
                        "ok", false,
                        "code", "USER_BLOCKED",
                        "message", msg
                ));
            }
            // Mặc định: trả đúng status từ upstream, tránh 500
            return ResponseEntity.status(status).body(Map.of(
                    "ok", false,
                    "code", "UPSTREAM_"+status,
                    "message", msg
            ));
        }

        String jwt = (String) auth.get("jwt");
        ResponseCookie cookie = ResponseCookie.from("sj", jwt)
                .httpOnly(true).secure(true).sameSite("Lax").path("/")
                .maxAge(Duration.ofDays(7)).build();
        System.out.println("cookie: " + cookie);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("ok", true, "user", auth.get("user")));
    }

    @PostMapping(path = "/auth/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody RegisterReq req) {
        if (req.email() == null || req.password() == null) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "message", "email/password is required"));
        }

        // Body theo Strapi /auth/local/register
        Map<String, Object> body = new HashMap<>();
        body.put("email", req.email());
        body.put("password", req.password());
        body.put("username", (req.username() == null || req.username().isBlank()) ? req.email() : req.username());
        // Nếu đã mở rộng schema user/override register, thêm các field:
//        if (req.fullName()  != null) body.put("fullName",  req.fullName());
//        if (req.studentId() != null) body.put("studentId", req.studentId());
//        if (req.department()!= null) body.put("department", req.department());

        var type = new ParameterizedTypeReference<Map<String, Object>>() {};
        Map<String, Object> auth;
        try {
            // Forward tới Strapi
            auth = strapiClient.register(body, type);
        } catch (RestClientResponseException e) {
            // Map lỗi Strapi -> status hợp lý cho FE (tránh 500)
            String msg = extractStrapiMessage(e.getResponseBodyAsString());
            int status = e.getRawStatusCode(); // đa số 400 khi email trùng/validate fail
            // Ví dụ nhận diện email trùng để trả 409
            if (status == 400 && msg.toLowerCase().contains("email") && msg.toLowerCase().contains("already")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("ok", false, "code", "EMAIL_TAKEN", "message", msg));
            }
            return ResponseEntity.status(status)
                    .body(Map.of("ok", false, "code", "REGISTER_FAILED", "message", msg));
        }

        // Lấy JWT & set cookie HttpOnly cho FE
        String jwt = (String) auth.get("jwt");
        ResponseCookie cookie = ResponseCookie.from("sj", jwt)
                .httpOnly(true)
                .secure(true)             // dùng HTTPS ở môi trường thật
                .sameSite("Lax")          // nếu FE khác domain -> dùng "None"
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();
        System.out.println("cookie: " + cookie.toString());
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("ok", true, "user", auth.get("user")));
    }


    private static String extractStrapiMessage(String body) {
        try {
            var node = new com.fasterxml.jackson.databind.ObjectMapper().readTree(body);
            var err = node.path("error");
            if (!err.isMissingNode()) return err.path("message").asText("Upstream error");
            return node.path("message").asText("Upstream error");
        } catch (Exception ignore) {
            return "Upstream error";
        }
    }
}

