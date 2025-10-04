package com.backend.strapi.model;

import com.backend.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UserFlat(
                String documentId,
                String username,
                String email,
                String provider,
                String password,
                String resetPasswordToken,
                String confirmationToken,
                Boolean confirm,
                Boolean blocked,
                @JsonProperty("department") DepartmentFlat departmentFlat,
                String fullName) {
}
