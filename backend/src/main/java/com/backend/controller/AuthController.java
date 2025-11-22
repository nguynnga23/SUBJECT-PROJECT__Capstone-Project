package com.backend.controller;

import com.backend.dto.request.ChangePasswordReq;
import com.backend.dto.request.LoginReq;
import com.backend.dto.request.RegisterReq;
import com.backend.dto.request.UpdateProfileReq;
import com.backend.service.AuthService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req) {
        if (req == null || req.email() == null || req.password() == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "ok", false,
                    "code", "MISSING_FIELDS",
                    "message", "Email and password are required"
            ));
        }

        Map<String, Object> auth = authService.login(req);
        String jwt = (String) auth.get("jwt");

        return ResponseEntity.ok(Map.of(
                "ok", true,
                "jwt", jwt,
                "user", auth.get("user")
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterReq req) {
        if (req.email() == null || req.password() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("ok", false, "message", "email/password is required"));
        }

        Map<String, Object> auth = authService.register(req);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                        "ok", true,
                        "jwt", auth.get("jwt"),
                        "user", auth.get("user")
                ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String authz) {
        if (authz == null || !authz.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(Map.of("ok", false, "message", "Missing token"));
        }

        Map<String, Object> me = authService.me(authz.substring(7));
        return ResponseEntity.ok(Map.of("ok", true, "user", me));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe(
            @RequestHeader(value = "Authorization", required = false) String authz,
            @RequestBody UpdateProfileReq req
    ) {
        if (authz == null || !authz.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(Map.of("ok", false, "message", "Missing token"));
        }

        Map<String, Object> updated = authService.updateMe(authz.substring(7), req);
        return ResponseEntity.ok(Map.of("ok", true, "user", updated));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader(value = "Authorization", required = false) String authz,
            @RequestBody ChangePasswordReq req
    ) {
        if (authz == null || !authz.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(Map.of("ok", false, "message", "Missing token"));
        }

        if (req.currentPassword() == null || req.password() == null || req.passwordConfirmation() == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "ok", false,
                    "message", "currentPassword, password, and passwordConfirmation are required"
            ));
        }

        Map<String, Object> resp = authService.changePassword(authz.substring(7), req);
        return ResponseEntity.ok(Map.of(
                "ok", true,
                "message", "Password changed successfully",
                "data", resp
        ));
    }
}
