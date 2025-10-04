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

    @PostMapping("/auth/login")
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

    @PostMapping(path = "/auth/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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

    @GetMapping("/auth/me")
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
}
