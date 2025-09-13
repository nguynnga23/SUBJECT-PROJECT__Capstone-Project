package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DepartmentFlat(
        Long id,
        String documentId,
        String department_name,
        String key_department,
        List<DepartmentSourceFlat> departmentSources,
        List<UserFlat> user
) {}
