package com.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginReq(
        @Schema(example = "nga2@gmail.com") String email,
        @Schema(example = "123456789") String password
) {}


