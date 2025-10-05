package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CrawlerConfigFlat(
        String documentId,
        String url,
        String relative_url_list,
        String relative_url,
        String thumbnail,
        String next_pages,
        String title,
        String content,
        String external_publish_date,
        @JsonProperty("department_source") DepartmentSourceFlat department_source) {
}
