package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DepartmentSourceFlat(
        String documentId,
        String url,
        CrawlerConfigFlat crawler_config,
        String label,
        String key_departmentSource,
        @JsonProperty("department") DepartmentFlat department,
        List<CategoryFlat> categories) {
}
