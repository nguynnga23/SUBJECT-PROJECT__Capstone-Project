package com.backend.mapper;

import com.backend.dto.DepartmentDto;
import com.backend.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentMapper {

    public DepartmentDto toDto(Department entity) {
        if (entity == null) {
            return null;
        }
        
        return new DepartmentDto(
            entity.getId(),
            entity.getDepartmentName(),
            entity.getKeyDepartment(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }

    public Department toEntity(DepartmentDto dto) {
        if (dto == null) {
            return null;
        }
        
        Department entity = new Department();
        entity.setId(dto.getId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setKeyDepartment(dto.getKeyDepartment());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
