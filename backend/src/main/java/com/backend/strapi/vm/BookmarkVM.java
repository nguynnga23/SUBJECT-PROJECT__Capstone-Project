package com.backend.strapi.vm;

import lombok.Data;

@Data
public class BookmarkVM {
    private String documentId;
    private String userId;
    private ArticleVM article;
}
