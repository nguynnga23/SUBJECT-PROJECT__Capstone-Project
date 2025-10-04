package com.backend.dto.request;

public record BookmarkReq(
        String userId,
        String articleId
) {
}
