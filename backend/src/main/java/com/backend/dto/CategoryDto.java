package com.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private UUID id;
    private String categoryName;
    private String categoryUrl;
    private String keyCategory;
    private LocalDate lastExternalPublishDate;
    private DepartmentWebsiteDto departmentWebsite;
    private Instant createdAt;
    private Instant updatedAt;
}
