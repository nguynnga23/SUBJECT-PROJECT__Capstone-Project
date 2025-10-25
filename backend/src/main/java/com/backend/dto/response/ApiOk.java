package com.backend.dto.response;

import java.time.OffsetDateTime;

public record ApiOk(
        String status,
        String message,
        Object data,
        OffsetDateTime timestamp
) {
    public static ApiOk ok(String message) {
        return new ApiOk("ok", message, null, OffsetDateTime.now());
    }

    public static ApiOk ok(String message, Object data) {
        return new ApiOk("ok", message, data, OffsetDateTime.now());
    }
}

