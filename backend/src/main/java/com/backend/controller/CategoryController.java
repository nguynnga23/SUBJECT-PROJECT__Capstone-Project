package com.backend.controller;

import com.backend.dto.request.CategoryReq;
import com.backend.service.CategoryService;
import com.backend.strapi.vm.CategoryVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/categories")
@Slf4j
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryVM> list() {
        return categoryService.list();
    }

    @GetMapping("/{documentId}")
    public CategoryVM one(@PathVariable("documentId") String documentId) {
        return categoryService.one(documentId);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CategoryReq req) {
        Object created = categoryService.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(@PathVariable("documentId") String documentId,
                                    @RequestBody CategoryReq req) {
        Object updated = categoryService.update(documentId, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable("documentId") String documentId) {
        categoryService.delete(documentId);
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
