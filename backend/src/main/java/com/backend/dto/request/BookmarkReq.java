package com.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record BookmarkReq(
        @Schema(example = "cpqi5bobkdtl3kfdzxcys7dx")String userId,
        String articleId
) {
}
