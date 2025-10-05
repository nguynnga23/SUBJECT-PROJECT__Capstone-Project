package com.backend.dto.request;

import com.backend.strapi.model.BookmarkFlat;
import com.backend.strapi.model.CategoryFlat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record ArticleReq(
        String title,
        String content,
        String external_url,
        String summary,
        String thumbnail,
        String external_slug
) {}
