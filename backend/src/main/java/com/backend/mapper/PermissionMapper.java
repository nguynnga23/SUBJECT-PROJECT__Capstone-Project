package com.backend.mapper;

import com.backend.dto.PermissionDto;
import com.backend.entity.Permission;
import org.springframework.stereotype.Component;

@Component
public class PermissionMapper {

    public PermissionDto toDto(Permission entity) {
        if (entity == null) {
            return null;
        }
        
        PermissionDto dto = new PermissionDto();
        dto.setId(entity.getId());
        dto.setAction(entity.getAction());
        dto.setSubject(entity.getSubject());
        dto.setProperties(entity.getProperties());
        dto.setConditions(entity.getConditions());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        
        return dto;
    }

    public Permission toEntity(PermissionDto dto) {
        if (dto == null) {
            return null;
        }
        
        Permission entity = new Permission();
        entity.setId(dto.getId());
        entity.setAction(dto.getAction());
        entity.setSubject(dto.getSubject());
        entity.setProperties(dto.getProperties());
        entity.setConditions(dto.getConditions());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
