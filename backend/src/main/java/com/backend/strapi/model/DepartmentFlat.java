package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DepartmentFlat(
        Long id,
        String documentId,
        String department_name,
        String key_department,
        String department_url
) {}
