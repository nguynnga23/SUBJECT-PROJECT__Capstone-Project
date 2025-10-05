package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.ChangePasswordReq;
import com.backend.dto.request.LoginReq;
import com.backend.dto.request.RegisterReq;
import com.backend.dto.request.UpdateProfileReq;
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
@RequestMapping("/v1/auth")
public class AuthController {
    private final StrapiClient strapiClient;

    @Autowired
    public AuthController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req) {
        Map<String, Object> body = Map.of(
                "identifier", req.email(),
                "password", req.password());
        var type = new ParameterizedTypeReference<Map<String, Object>>() {
        };

        Map<String, Object> auth;
        try {
            auth = strapiClient.login(body, type); // forward /auth/local
        } catch (org.springframework.web.client.RestClientResponseException e) {
            String msg = extractStrapiMessage(e.getResponseBodyAsString());
            int status = e.getRawStatusCode();

            if (status == 400 && "Invalid identifier or password".equalsIgnoreCase(msg)) {
                return ResponseEntity.status(401).body(Map.of(
                        "ok", false,
                        "code", "INVALID_CREDENTIALS",
                        "message", msg));
            }
            if (status == 400 && msg.toLowerCase().contains("not confirmed")) {
                return ResponseEntity.status(403).body(Map.of(
                        "ok", false,
                        "code", "EMAIL_NOT_CONFIRMED",
                        "message", msg));
            }
            if ((status == 400 || status == 403) && msg.toLowerCase().contains("blocked")) {
                return ResponseEntity.status(403).body(Map.of(
                        "ok", false,
                        "code", "USER_BLOCKED",
                        "message", msg));
            }
            return ResponseEntity.status(status).body(Map.of(
                    "ok", false,
                    "code", "UPSTREAM_" + status,
                    "message", msg));
        }

        String jwt = (String) auth.get("jwt");
        return ResponseEntity.ok(Map.of(
                "ok", true,
                "jwt", jwt,
                "user", auth.get("user")));
    }

    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody RegisterReq req) {
        if (req.email() == null || req.password() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("ok", false, "message", "email/password is required"));
        }

        Map<String, Object> body = new HashMap<>();
        body.put("email", req.email());
        body.put("password", req.password());
        body.put("username",
                (req.username() == null || req.username().isBlank())
                        ? req.email()
                        : req.username());

        var type = new ParameterizedTypeReference<Map<String, Object>>() {
        };
        Map<String, Object> auth;
        try {
            // Forward tới Strapi
            auth = strapiClient.register(body, type);
        } catch (RestClientResponseException e) {
            String msg = extractStrapiMessage(e.getResponseBodyAsString());
            int status = e.getRawStatusCode();

            if (status == 400
                    && msg != null
                    && msg.toLowerCase().contains("email")
                    && msg.toLowerCase().contains("already")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("ok", false, "code", "EMAIL_TAKEN", "message", msg));
            }

            return ResponseEntity.status(status)
                    .body(Map.of("ok", false, "code", "REGISTER_FAILED", "message", msg));
        }

        String jwt = (String) auth.get("jwt");
        Object user = auth.get("user");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                        "ok", true,
                        "jwt", jwt,
                        "user", user));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String authz) {
        if (authz == null || !authz.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("ok", false, "message", "Missing token"));
        }
        var headers = new HttpHeaders();
        headers.setBearerAuth(authz.substring(7));

        var type = new ParameterizedTypeReference<Map<String, Object>>() {
        };
        Map<String, Object> me = strapiClient.get("/users/me", type, null, authz.substring(7));
        return ResponseEntity.ok(Map.of("ok", true, "user", me));
    }

    private static String extractStrapiMessage(String body) {
        try {
            var node = new com.fasterxml.jackson.databind.ObjectMapper().readTree(body);
            var err = node.path("error");
            if (!err.isMissingNode())
                return err.path("message").asText("Upstream error");
            return node.path("message").asText("Upstream error");
        } catch (Exception ignore) {
            return "Upstream error";
        }
    }

    @PutMapping(path = "/me", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateMe(
            @RequestHeader(value = "Authorization", required = false) String authz,
            @RequestBody UpdateProfileReq req
    ) {
        if (authz == null || !authz.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("ok", false, "message", "Missing token"));
        }
        String token = authz.substring(7);

        try {
            var meType = new ParameterizedTypeReference<Map<String, Object>>() {};
            Map<String, Object> me = strapiClient.get("/users/me", meType, null, token);
            Object idObj = me.get("id");
            if (idObj == null) {
                return ResponseEntity.status(401).body(Map.of("ok", false, "message", "Cannot resolve current user"));
            }
            String userId = String.valueOf(idObj);

            // 2) Xây body chỉ gồm các field có giá trị (whitelist)
            Map<String, Object> body = new HashMap<>();
            if (req.username() != null && !req.username().isBlank()) body.put("username", req.username());
            if (req.fullName() != null) body.put("fullName", req.fullName());

            if (req.departmentId() != null && !req.departmentId().isBlank()) {
                body.put("department", Map.of("connect", req.departmentId()));
            }

            var type = new ParameterizedTypeReference<Map<String, Object>>() {};
            Map<String, Object> updated = strapiClient.putJson("/users/" + userId, body, type, token);

            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "user", updated
            ));

        } catch (RestClientResponseException e) {
            String msg = extractStrapiMessage(e.getResponseBodyAsString());
            int status = e.getRawStatusCode();
            return ResponseEntity.status(status).body(Map.of(
                    "ok", false,
                    "code", "UPSTREAM_" + status,
                    "message", msg
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("ok", false, "message", "Failed to update profile"));
        }
    }

    @PostMapping(path = "/change-password", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changePassword(
            @RequestHeader(value = "Authorization", required = false) String authz,
            @RequestBody ChangePasswordReq req
    ) {
        if (authz == null || !authz.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("ok", false, "message", "Missing token"));
        }
        String token = authz.substring(7);

        if (req.currentPassword() == null || req.password() == null || req.passwordConfirmation() == null) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "message", "currentPassword/password/passwordConfirmation are required"));
        }

        try {
            var type = new ParameterizedTypeReference<Map<String, Object>>() {};
            Map<String, Object> body = Map.of(
                    "currentPassword", req.currentPassword(),
                    "password", req.password(),
                    "passwordConfirmation", req.passwordConfirmation()
            );

            // Strapi route chuẩn: /api/auth/change-password (users-permissions)
            Map<String, Object> resp = strapiClient.postJson("/auth/change-password", body, type, token);

            return ResponseEntity.ok(Map.of("ok", true, "message", "Password changed", "data", resp));
        } catch (RestClientResponseException e) {
            String msg = extractStrapiMessage(e.getResponseBodyAsString());
            int status = e.getRawStatusCode();
            return ResponseEntity.status(status).body(Map.of(
                    "ok", false,
                    "code", "UPSTREAM_" + status,
                    "message", msg
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("ok", false, "message", "Failed to change password"));
        }
    }
}
