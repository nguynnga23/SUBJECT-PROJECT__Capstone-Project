package com.backend.dto.request;

import com.backend.strapi.model.DepartmentSourceFlat;
import com.fasterxml.jackson.annotation.JsonProperty;

public record CrawlerConfigReq(
        String url,
        String relative_url_list,
        String relative_url,
        String thumbnail,
        String next_pages,
        String title,
        String content,
        String external_publish_date,
        String department_source_id) {
}
