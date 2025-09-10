package com.backend.strapi.model;

import java.time.Instant;
import java.time.LocalDate;

public record CrawlerConfigFlat(
        String url,
        String relativeUrlList,
        String relativeUrl,
        String thumbnail,
        String next_pages,
        String title,
        String content,
        LocalDate externalPublishDate,
        DepartmentSourceFlat departmentSourceFlat) {
}
