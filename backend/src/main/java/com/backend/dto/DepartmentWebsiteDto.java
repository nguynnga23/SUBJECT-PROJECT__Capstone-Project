package com.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentWebsiteDto {
    private UUID id;
    private String departmentWebsiteUrl;
    private String keyDepartmentWebsite;
    private DepartmentDto department;
    private Instant createdAt;
    private Instant updatedAt;
}
