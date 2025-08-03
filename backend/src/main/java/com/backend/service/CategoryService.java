package com.backend.service;

import com.backend.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryService {
    Category save(Category category);
    
    Optional<Category> findById(UUID id);
    
    List<Category> findAll();
    
    Page<Category> findAll(Pageable pageable);
    
    Category update(Category category);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    Optional<Category> findByCategoryName(String categoryName);
    
    List<Category> findByCategoryNameContaining(String keyword);
}
