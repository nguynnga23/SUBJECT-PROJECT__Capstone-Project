package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ArticleFlat(
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
        CategoryFlat category,
        List<BookMarkFlat> bookmarks
) {}
