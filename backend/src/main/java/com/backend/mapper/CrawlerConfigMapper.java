package com.backend.mapper;

import com.backend.dto.CrawlerConfigDto;
import com.backend.entity.CrawlerConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CrawlerConfigMapper {

    private final DepartmentWebsiteMapper departmentWebsiteMapper;

    public CrawlerConfigDto toDto(CrawlerConfig entity) {
        if (entity == null) {
            return null;
        }
        
        CrawlerConfigDto dto = new CrawlerConfigDto();
        dto.setId(entity.getId());
        dto.setRelativeUrlList(entity.getRelativeUrlList());
        dto.setRelativeUrl(entity.getRelativeUrl());
        dto.setThumbnail(entity.getThumbnail());
        dto.setNextPages(entity.getNextPages());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setExternalPublishDate(entity.getExternalPublishDate());
        dto.setDepartmentWebsite(departmentWebsiteMapper.toDto(entity.getDepartmentWebsite()));
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        
        return dto;
    }

    public CrawlerConfig toEntity(CrawlerConfigDto dto) {
        if (dto == null) {
            return null;
        }
        
        CrawlerConfig entity = new CrawlerConfig();
        entity.setId(dto.getId());
        entity.setRelativeUrlList(dto.getRelativeUrlList());
        entity.setRelativeUrl(dto.getRelativeUrl());
        entity.setThumbnail(dto.getThumbnail());
        entity.setNextPages(dto.getNextPages());
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setExternalPublishDate(dto.getExternalPublishDate());
        entity.setDepartmentWebsite(departmentWebsiteMapper.toEntity(dto.getDepartmentWebsite()));
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
