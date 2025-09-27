package com.backend.strapi.model;

import com.backend.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UserFlat(
                String username,
                String email,
                String provider,
                String password,
                String resetPasswordToken,
                String confirmationToken,
                Boolean confirm,
                Boolean blocked,
                DepartmentFlat departmentFlat,
                String fullName) {
}
