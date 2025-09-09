package com.backend.mapper;

import com.backend.dto.ScheduleConfigDto;
import com.backend.entity.ScheduleConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduleConfigMapper {

    private final DepartmentWebsiteMapper departmentWebsiteMapper;

    public ScheduleConfigDto toDto(ScheduleConfig entity) {
        if (entity == null) {
            return null;
        }
        
        ScheduleConfigDto dto = new ScheduleConfigDto();
        dto.setId(entity.getId());
        dto.setType(entity.getType());
        dto.setValue(entity.getValue());
        dto.setDepartmentWebsite(departmentWebsiteMapper.toDto(entity.getDepartmentWebsite()));
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        
        return dto;
    }

    public ScheduleConfig toEntity(ScheduleConfigDto dto) {
        if (dto == null) {
            return null;
        }
        
        ScheduleConfig entity = new ScheduleConfig();
        entity.setId(dto.getId());
        entity.setType(dto.getType());
        entity.setValue(dto.getValue());
        entity.setDepartmentWebsite(departmentWebsiteMapper.toEntity(dto.getDepartmentWebsite()));
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
