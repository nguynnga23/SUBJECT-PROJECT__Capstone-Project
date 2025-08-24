package com.backend.mapper;

import com.backend.dto.CategoryDto;
import com.backend.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final DepartmentWebsiteMapper departmentWebsiteMapper;

    public CategoryDto toDto(Category entity) {
        if (entity == null) {
            return null;
        }
        
        return new CategoryDto(
            entity.getId(),
            entity.getCategoryName(),
            entity.getCategoryUrl(),
            entity.getKeyCategory(),
            entity.getLastExternalPublishDate(),
            departmentWebsiteMapper.toDto(entity.getDepartmentWebsite()),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }

    public Category toEntity(CategoryDto dto) {
        if (dto == null) {
            return null;
        }
        
        Category entity = new Category();
        entity.setId(dto.getId());
        entity.setCategoryName(dto.getCategoryName());
        entity.setCategoryUrl(dto.getCategoryUrl());
        entity.setKeyCategory(dto.getKeyCategory());
        entity.setLastExternalPublishDate(dto.getLastExternalPublishDate());
        entity.setDepartmentWebsite(departmentWebsiteMapper.toEntity(dto.getDepartmentWebsite()));
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
