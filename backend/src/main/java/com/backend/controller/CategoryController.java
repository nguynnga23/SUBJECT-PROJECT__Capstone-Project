package com.backend.controller;

import com.backend.dto.CategoryDto;
import com.backend.entity.Category;
import com.backend.mapper.CategoryMapper;
import com.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CategoryController {
    
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    
    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        log.info("Creating new category: {}", categoryDto.getCategoryName());
        try {
            Category category = categoryMapper.toEntity(categoryDto);
            Category savedCategory = categoryService.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryMapper.toDto(savedCategory));
        } catch (Exception e) {
            log.error("Error creating category: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable UUID id) {
        log.info("Getting category by id: {}", id);
        Optional<Category> category = categoryService.findById(id);
        return category.map(value -> ResponseEntity.ok().body(categoryMapper.toDto(value)))
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        log.info("Getting all categories");
        List<Category> categories = categoryService.findAll();
        List<CategoryDto> categoryDtos = categories.stream()
                .map(categoryMapper::toDto)
                .toList();
        return ResponseEntity.ok(categoryDtos);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<CategoryDto>> getAllCategoriesPageable(Pageable pageable) {
        log.info("Getting all categories with pagination: {}", pageable);
        Page<Category> categories = categoryService.findAll(pageable);
        Page<CategoryDto> categoryDtos = categories.map(categoryMapper::toDto);
        return ResponseEntity.ok(categoryDtos);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable UUID id, @RequestBody CategoryDto categoryDto) {
        log.info("Updating category with id: {}", id);
        try {
            if (!categoryService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            Category category = categoryMapper.toEntity(categoryDto);
            category.setId(id);
            Category updatedCategory = categoryService.update(category);
            return ResponseEntity.ok(categoryMapper.toDto(updatedCategory));
        } catch (Exception e) {
            log.error("Error updating category: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        log.info("Deleting category with id: {}", id);
        try {
            if (!categoryService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            categoryService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting category: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/search/name")
    public ResponseEntity<CategoryDto> getCategoryByName(@RequestParam String name) {
        log.info("Getting category by name: {}", name);
        Optional<Category> category = categoryService.findByCategoryName(name);
        return category.map(value -> ResponseEntity.ok().body(categoryMapper.toDto(value)))
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/name-containing")
    public ResponseEntity<List<CategoryDto>> getCategoriesByNameContaining(@RequestParam String keyword) {
        log.info("Getting categories by name containing: {}", keyword);
        List<Category> categories = categoryService.findByCategoryNameContaining(keyword);
        List<CategoryDto> categoryDtos = categories.stream()
                .map(categoryMapper::toDto)
                .toList();
        return ResponseEntity.ok(categoryDtos);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getCategoryCount() {
        log.info("Getting total category count");
        long count = categoryService.count();
        return ResponseEntity.ok(count);
    }
}
