package com.backend.strapi.vm;

import java.time.OffsetDateTime;

public record ArticleVM(
                Long id,
                String title,
                String content,
                String summary,
                String thumbnail,
                String externalUrl,
                String externalSlug,
                OffsetDateTime publishedAt,
                String categoryName,
                String keyCategory,
                String departmentName,
                String keyDepartment) {
}
