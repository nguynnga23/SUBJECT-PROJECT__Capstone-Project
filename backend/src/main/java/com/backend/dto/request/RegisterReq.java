package com.backend.dto.request;

public record RegisterReq(
        String email,
        String password,
        String username

) {}
