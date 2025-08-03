package com.backend.service.impl;

import com.backend.entity.Article;
import com.backend.repository.ArticleRepository;
import com.backend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService {
    
    private final ArticleRepository articleRepository;
    
    @Override
    public Article save(Article article) {
        log.debug("Saving article: {}", article.getTitle());
        return articleRepository.save(article);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Article> findById(UUID id) {
        log.debug("Finding article by id: {}", id);
        return articleRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Article> findAll() {
        log.debug("Finding all articles");
        return articleRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Article> findAll(Pageable pageable) {
        log.debug("Finding all articles with pagination: {}", pageable);
        return articleRepository.findAll(pageable);
    }
    
    @Override
    public Article update(Article article) {
        log.debug("Updating article: {}", article.getId());
        if (!articleRepository.existsById(article.getId())) {
            throw new RuntimeException("Article not found with id: " + article.getId());
        }
        return articleRepository.save(article);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting article by id: {}", id);
        if (!articleRepository.existsById(id)) {
            throw new RuntimeException("Article not found with id: " + id);
        }
        articleRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return articleRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return articleRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Article> findByCategoryId(UUID categoryId) {
        log.debug("Finding articles by category id: {}", categoryId);
        // This will need to be implemented in repository with custom query
        return articleRepository.findAll().stream()
                .filter(article -> article.getCategory() != null && 
                       article.getCategory().getId().equals(categoryId))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Article> findByTitle(String title) {
        log.debug("Finding articles by title: {}", title);
        // This will need to be implemented in repository with custom query
        return articleRepository.findAll().stream()
                .filter(article -> article.getTitle().equals(title))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Article> findByTitleContaining(String keyword) {
        log.debug("Finding articles by title containing: {}", keyword);
        // This will need to be implemented in repository with custom query
        return articleRepository.findAll().stream()
                .filter(article -> article.getTitle().toLowerCase()
                       .contains(keyword.toLowerCase()))
                .toList();
    }
}
