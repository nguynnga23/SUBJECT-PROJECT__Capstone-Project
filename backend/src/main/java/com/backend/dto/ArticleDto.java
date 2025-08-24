package com.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDto {
    private UUID id;
    private String title;
    private String content;
    private String summary;
    private String thumbnail;
    private String externalUri;
    private String externalSlug;
    private LocalDate externalPublishDate;
    private CategoryDto category;
    private Instant createdAt;
    private Instant updatedAt;
}
