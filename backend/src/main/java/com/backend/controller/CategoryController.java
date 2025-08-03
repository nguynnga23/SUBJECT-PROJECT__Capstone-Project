package com.backend.controller;

import com.backend.entity.Category;
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
    
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        log.info("Creating new category: {}", category.getCategoryName());
        try {
            Category savedCategory = categoryService.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
        } catch (Exception e) {
            log.error("Error creating category: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable UUID id) {
        log.info("Getting category by id: {}", id);
        Optional<Category> category = categoryService.findById(id);
        return category.map(value -> ResponseEntity.ok().body(value))
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        log.info("Getting all categories");
        List<Category> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<Category>> getAllCategoriesPageable(Pageable pageable) {
        log.info("Getting all categories with pagination: {}", pageable);
        Page<Category> categories = categoryService.findAll(pageable);
        return ResponseEntity.ok(categories);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable UUID id, @RequestBody Category category) {
        log.info("Updating category with id: {}", id);
        try {
            if (!categoryService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            category.setId(id);
            Category updatedCategory = categoryService.update(category);
            return ResponseEntity.ok(updatedCategory);
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
    public ResponseEntity<Category> getCategoryByName(@RequestParam String name) {
        log.info("Getting category by name: {}", name);
        Optional<Category> category = categoryService.findByCategoryName(name);
        return category.map(value -> ResponseEntity.ok().body(value))
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/name-containing")
    public ResponseEntity<List<Category>> getCategoriesByNameContaining(@RequestParam String keyword) {
        log.info("Getting categories by name containing: {}", keyword);
        List<Category> categories = categoryService.findByCategoryNameContaining(keyword);
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getCategoryCount() {
        log.info("Getting total category count");
        long count = categoryService.count();
        return ResponseEntity.ok(count);
    }
}
