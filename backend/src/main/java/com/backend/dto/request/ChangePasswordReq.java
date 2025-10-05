package com.backend.dto.request;

public record ChangePasswordReq(
        String currentPassword,
        String password,
        String passwordConfirmation
) {}
