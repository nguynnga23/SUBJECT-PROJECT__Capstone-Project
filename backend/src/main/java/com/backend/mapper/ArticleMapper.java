package com.backend.mapper;

import com.backend.dto.ArticleDto;
import com.backend.entity.Article;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleMapper {

    private final CategoryMapper categoryMapper;

    public ArticleDto toDto(Article entity) {
        if (entity == null) {
            return null;
        }
        
        ArticleDto dto = new ArticleDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setSummary(entity.getSummary());
        dto.setThumbnail(entity.getThumbnail());
        dto.setExternalUri(entity.getExternalUri());
        dto.setExternalSlug(entity.getExternalSlug());
        dto.setExternalPublishDate(entity.getExternalPublishDate());
        dto.setCategory(categoryMapper.toDto(entity.getCategory()));
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        
        return dto;
    }

    public Article toEntity(ArticleDto dto) {
        if (dto == null) {
            return null;
        }
        
        Article entity = new Article();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setSummary(dto.getSummary());
        entity.setThumbnail(dto.getThumbnail());
        entity.setExternalUri(dto.getExternalUri());
        entity.setExternalSlug(dto.getExternalSlug());
        entity.setExternalPublishDate(dto.getExternalPublishDate());
        entity.setCategory(categoryMapper.toEntity(dto.getCategory()));
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
