package com.backend.dto.request;

import com.backend.strapi.model.CategoryFlat;
import com.backend.strapi.model.CrawlerConfigFlat;
import com.backend.strapi.model.DepartmentFlat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record DepartmentSourceReq(
        String url,
        String label,
        String key_departmentSource,
        String department_id) {
}
