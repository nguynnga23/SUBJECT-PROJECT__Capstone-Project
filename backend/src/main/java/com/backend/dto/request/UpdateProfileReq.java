package com.backend.dto.request;

public record UpdateProfileReq(
        String username,
        String fullName,
        String phone,
        String departmentId
) {}
