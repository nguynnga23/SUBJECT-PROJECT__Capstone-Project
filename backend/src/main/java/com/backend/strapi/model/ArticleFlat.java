package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ArticleFlat(
        Long id,
        String documentId,
        String title,
        LocalDate external_publish_date,
        String content,
        String external_url,
        String summary,
        String thumbnail,
        String external_slug,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt,
        OffsetDateTime publishedAt,
        CategoryFlat category
) {}
