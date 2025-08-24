package com.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID id;
    private String email;
    private String username;
    private String provider;
    private Boolean confirmed;
    private Boolean blocked;
    private DepartmentDto department;
    private Instant createdAt;
    private Instant updatedAt;
    
    // Constructor without password for security
    public UserDto(UUID id, String email, String username, String provider, 
                   Boolean confirmed, Boolean blocked, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.provider = provider;
        this.confirmed = confirmed;
        this.blocked = blocked;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
