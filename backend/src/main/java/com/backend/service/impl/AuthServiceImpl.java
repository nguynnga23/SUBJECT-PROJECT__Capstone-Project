package com.backend.service.impl;

import com.backend.client.StrapiClient;
import com.backend.dto.request.ChangePasswordReq;
import com.backend.dto.request.LoginReq;
import com.backend.dto.request.RegisterReq;
import com.backend.dto.request.UpdateProfileReq;
import com.backend.service.AuthService;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private final StrapiClient strapiClient;

    public AuthServiceImpl(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @Override
    public Map<String, Object> login(LoginReq req) {
        Map<String, Object> body = Map.of(
                "identifier", req.email(),
                "password", req.password()
        );

        ParameterizedTypeReference<Map<String, Object>> type =
                new ParameterizedTypeReference<>() {};
        return strapiClient.login(body, type);
    }

    @Override
    public Map<String, Object> register(RegisterReq req) {
        Map<String, Object> body = new HashMap<>();
        body.put("email", req.email());
        body.put("password", req.password());
        body.put("username",
                (req.username() == null || req.username().isBlank())
                        ? req.email()
                        : req.username());

        ParameterizedTypeReference<Map<String, Object>> type =
                new ParameterizedTypeReference<>() {};
        return strapiClient.register(body, type);
    }

    @Override
    public Map<String, Object> me(String token) {
        ParameterizedTypeReference<Map<String, Object>> type =
                new ParameterizedTypeReference<>() {};
        return strapiClient.get("/users/me", type, null, token);
    }

    @Override
    public Map<String, Object> updateMe(String token, UpdateProfileReq req) {
        // 1) Lấy user hiện tại
        ParameterizedTypeReference<Map<String, Object>> meType =
                new ParameterizedTypeReference<>() {};
        Map<String, Object> me = strapiClient.get("/users/me", meType, null, token);

        Object idObj = me.get("id");
        if (idObj == null) {
            throw new IllegalStateException("Cannot resolve current user");
        }
        String userId = String.valueOf(idObj);

        // 2) Build body whitelist field
        Map<String, Object> body = new HashMap<>();
        if (req.username() != null && !req.username().isBlank()) {
            body.put("username", req.username());
        }
        if (req.fullName() != null) {
            body.put("fullName", req.fullName());
        }
        if (req.departmentId() != null && !req.departmentId().isBlank()) {
            body.put("department", Map.of("connect", req.departmentId()));
        }

        ParameterizedTypeReference<Map<String, Object>> type =
                new ParameterizedTypeReference<>() {};
        return strapiClient.putJson("/users/" + userId, body, type, token);
    }

    @Override
    public Map<String, Object> changePassword(String token, ChangePasswordReq req) {
        Map<String, Object> body = Map.of(
                "currentPassword", req.currentPassword(),
                "password", req.password(),
                "passwordConfirmation", req.passwordConfirmation()
        );

        ParameterizedTypeReference<Map<String, Object>> type =
                new ParameterizedTypeReference<>() {};
        return strapiClient.postJson("/auth/change-password", body, type, token);
    }
}
