package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DepartmentFlat(
        String documentId,
        String department_name,
        List<DepartmentSourceFlat> department_sources,
        List<UserFlat> users
) {}
