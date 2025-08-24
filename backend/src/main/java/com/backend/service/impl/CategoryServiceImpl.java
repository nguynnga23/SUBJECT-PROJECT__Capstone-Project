package com.backend.service.impl;

import com.backend.entity.Category;
import com.backend.repository.CategoryRepository;
import com.backend.service.CategoryService;
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
public class CategoryServiceImpl implements CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    @Override
    public Category save(Category category) {
        log.debug("Saving category: {}", category.getCategoryName());
        return categoryRepository.save(category);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Category> findById(UUID id) {
        log.debug("Finding category by id: {}", id);
        return categoryRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Category> findAll() {
        log.debug("Finding all categories");
        return categoryRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Category> findAll(Pageable pageable) {
        log.debug("Finding all categories with pagination: {}", pageable);
        return categoryRepository.findAll(pageable);
    }
    
    @Override
    public Category update(Category category) {
        log.debug("Updating category: {}", category.getId());
        if (!categoryRepository.existsById(category.getId())) {
            throw new RuntimeException("Category not found with id: " + category.getId());
        }
        return categoryRepository.save(category);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting category by id: {}", id);
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return categoryRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return categoryRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Category> findByCategoryName(String categoryName) {
        log.debug("Finding category by name: {}", categoryName);
        // This will need to be implemented in repository with custom query
        return categoryRepository.findAll().stream()
                .filter(category -> category.getCategoryName().equals(categoryName))
                .findFirst();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Category> findByCategoryNameContaining(String keyword) {
        log.debug("Finding categories by name containing: {}", keyword);
        // This will need to be implemented in repository with custom query
        return categoryRepository.findAll().stream()
                .filter(category -> category.getCategoryName().toLowerCase()
                       .contains(keyword.toLowerCase()))
                .toList();
    }
}
