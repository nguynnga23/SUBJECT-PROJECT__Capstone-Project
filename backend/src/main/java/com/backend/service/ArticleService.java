package com.backend.service;

import com.backend.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticleService {
    Article save(Article article);
    
    Optional<Article> findById(UUID id);
    
    List<Article> findAll();
    
    Page<Article> findAll(Pageable pageable);
    
    Article update(Article article);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    List<Article> findByCategoryId(UUID categoryId);
    
    List<Article> findByTitle(String title);
    
    List<Article> findByTitleContaining(String keyword);
}
