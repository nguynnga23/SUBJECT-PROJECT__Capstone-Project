package com.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    private UUID id;
    private String action;
    private String subject;
    private Map<String, Object> properties;
    private Map<String, Object> conditions;
    private Instant createdAt;
    private Instant updatedAt;
}
