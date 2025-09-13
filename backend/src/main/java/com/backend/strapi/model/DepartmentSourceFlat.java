package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DepartmentSourceFlat(
        String documentId,
        String url,
        CategoryFlat categoryFlat,
        CrawlerConfigFlat crawlerConfigFlat,
        String label,
        DepartmentFlat departmentFlat,
        List<CategoryFlat> categories) {
}
