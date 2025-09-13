package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CategoryFlat(
        String documentId,
        String category_name,
        String category_url,
        String key_category,
        LocalDate last_external_publish_date,
        DepartmentSourceFlat departmentSourceFlat,
        List<ArticleFlat> articleFlats) {
}
