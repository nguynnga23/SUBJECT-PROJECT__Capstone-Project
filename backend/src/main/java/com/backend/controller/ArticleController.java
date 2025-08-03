package com.backend.controller;

import com.backend.entity.Article;
import com.backend.service.ArticleService;
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
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ArticleController {
    
    private final ArticleService articleService;
    
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        log.info("Creating new article: {}", article.getTitle());
        try {
            Article savedArticle = articleService.save(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
        } catch (Exception e) {
            log.error("Error creating article: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable UUID id) {
        log.info("Getting article by id: {}", id);
        Optional<Article> article = articleService.findById(id);
        return article.map(value -> ResponseEntity.ok().body(value))
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        log.info("Getting all articles");
        List<Article> articles = articleService.findAll();
        return ResponseEntity.ok(articles);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<Article>> getAllArticlesPageable(Pageable pageable) {
        log.info("Getting all articles with pagination: {}", pageable);
        Page<Article> articles = articleService.findAll(pageable);
        return ResponseEntity.ok(articles);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable UUID id, @RequestBody Article article) {
        log.info("Updating article with id: {}", id);
        try {
            if (!articleService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            article.setId(id);
            Article updatedArticle = articleService.update(article);
            return ResponseEntity.ok(updatedArticle);
        } catch (Exception e) {
            log.error("Error updating article: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable UUID id) {
        log.info("Deleting article with id: {}", id);
        try {
            if (!articleService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            articleService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting article: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Article>> getArticlesByCategoryId(@PathVariable UUID categoryId) {
        log.info("Getting articles by category id: {}", categoryId);
        List<Article> articles = articleService.findByCategoryId(categoryId);
        return ResponseEntity.ok(articles);
    }
    
    @GetMapping("/search/title")
    public ResponseEntity<List<Article>> getArticlesByTitle(@RequestParam String title) {
        log.info("Getting articles by title: {}", title);
        List<Article> articles = articleService.findByTitle(title);
        return ResponseEntity.ok(articles);
    }
    
    @GetMapping("/search/title-containing")
    public ResponseEntity<List<Article>> getArticlesByTitleContaining(@RequestParam String keyword) {
        log.info("Getting articles by title containing: {}", keyword);
        List<Article> articles = articleService.findByTitleContaining(keyword);
        return ResponseEntity.ok(articles);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getArticleCount() {
        log.info("Getting total article count");
        long count = articleService.count();
        return ResponseEntity.ok(count);
    }
}
