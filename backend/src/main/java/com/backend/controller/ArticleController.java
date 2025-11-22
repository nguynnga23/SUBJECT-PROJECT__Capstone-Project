package com.backend.controller;

import com.backend.dto.request.ArticleReq;
import com.backend.service.ArticleService;
import com.backend.strapi.vm.ArticleVM;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/count")
    public int countItems() {
        return articleService.countItems();
    }

    @GetMapping
    public List<ArticleVM> list(@RequestParam(defaultValue = "1") int page,
                                @RequestParam(defaultValue = "10") int pageSize) {
        return articleService.list(page, pageSize);
    }

    @GetMapping("/{id}")
    public ArticleVM one(@PathVariable("id") String id) {
        return articleService.one(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ArticleReq req) {
        Object created = articleService.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(@PathVariable("documentId") String documentId,
                                    @RequestBody ArticleReq req) {
        Object updated = articleService.update(documentId, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable("documentId") String documentId) {
        articleService.delete(documentId);
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
