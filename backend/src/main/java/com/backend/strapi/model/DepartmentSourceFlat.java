package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DepartmentSourceFlat(
                String url,
                CategoryFlat categoryFlat,
                CrawlerConfigFlat crawlerConfigFlat,
                String label,
                DepartmentFlat departmentFlat) {
}
