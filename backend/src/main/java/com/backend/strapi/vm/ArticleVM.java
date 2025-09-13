package com.backend.strapi.vm;

import lombok.Data;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
public class ArticleVM {
    private Long id;
    private String documentId;
    private String title;
    private LocalDate externalPublishDate;
    private String content;
    private String externalUrl;
    private String summary;
    private String thumbnail;
    private String externalSlug;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private OffsetDateTime publishedAt;
    private Long categoryId;
    private String categoryName;
}
