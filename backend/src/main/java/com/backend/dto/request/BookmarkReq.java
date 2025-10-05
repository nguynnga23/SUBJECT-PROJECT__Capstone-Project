package com.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record BookmarkReq(
        @Schema(example = "u4kb6vezhrt9z81buvqrygrv")String userId,
        String articleId
) {
}
