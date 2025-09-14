package com.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginReq(
        @Schema(example = "s1@iuh.edu.vn") String email,
        @Schema(example = "Strong_Passw0rd") String password
) {}


