package com.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleConfigDto {
    private UUID id;
    private String type;
    private Integer value;
    private DepartmentWebsiteDto departmentWebsite;
    private Instant createdAt;
    private Instant updatedAt;
}
