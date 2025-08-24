package com.backend.mapper;

import com.backend.dto.DepartmentWebsiteDto;
import com.backend.entity.DepartmentWebsite;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DepartmentWebsiteMapper {

    private final DepartmentMapper departmentMapper;

    public DepartmentWebsiteDto toDto(DepartmentWebsite entity) {
        if (entity == null) {
            return null;
        }
        
        return new DepartmentWebsiteDto(
            entity.getId(),
            entity.getDepartmentWebsiteUrl(),
            entity.getKeyDepartmentWebsite(),
            departmentMapper.toDto(entity.getDepartment()),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }

    public DepartmentWebsite toEntity(DepartmentWebsiteDto dto) {
        if (dto == null) {
            return null;
        }
        
        DepartmentWebsite entity = new DepartmentWebsite();
        entity.setId(dto.getId());
        entity.setDepartmentWebsiteUrl(dto.getDepartmentWebsiteUrl());
        entity.setKeyDepartmentWebsite(dto.getKeyDepartmentWebsite());
        entity.setDepartment(departmentMapper.toEntity(dto.getDepartment()));
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
