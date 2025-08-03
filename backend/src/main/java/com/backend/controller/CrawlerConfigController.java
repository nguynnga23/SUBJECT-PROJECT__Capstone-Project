package com.backend.controller;

import com.backend.entity.CrawlerConfig;
import com.backend.service.CrawlerConfigService;
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
@RequestMapping("/api/crawler-configs")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CrawlerConfigController {
    
    private final CrawlerConfigService crawlerConfigService;
    
    @PostMapping
    public ResponseEntity<CrawlerConfig> createCrawlerConfig(@RequestBody CrawlerConfig crawlerConfig) {
        log.info("Creating new crawler config");
        try {
            CrawlerConfig savedConfig = crawlerConfigService.save(crawlerConfig);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedConfig);
        } catch (Exception e) {
            log.error("Error creating crawler config: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CrawlerConfig> getCrawlerConfigById(@PathVariable UUID id) {
        log.info("Getting crawler config by id: {}", id);
        Optional<CrawlerConfig> config = crawlerConfigService.findById(id);
        return config.map(value -> ResponseEntity.ok().body(value))
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<CrawlerConfig>> getAllCrawlerConfigs() {
        log.info("Getting all crawler configs");
        List<CrawlerConfig> configs = crawlerConfigService.findAll();
        return ResponseEntity.ok(configs);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<CrawlerConfig>> getAllCrawlerConfigsPageable(Pageable pageable) {
        log.info("Getting all crawler configs with pagination: {}", pageable);
        Page<CrawlerConfig> configs = crawlerConfigService.findAll(pageable);
        return ResponseEntity.ok(configs);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CrawlerConfig> updateCrawlerConfig(@PathVariable UUID id, @RequestBody CrawlerConfig crawlerConfig) {
        log.info("Updating crawler config with id: {}", id);
        try {
            if (!crawlerConfigService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            crawlerConfig.setId(id);
            CrawlerConfig updatedConfig = crawlerConfigService.update(crawlerConfig);
            return ResponseEntity.ok(updatedConfig);
        } catch (Exception e) {
            log.error("Error updating crawler config: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrawlerConfig(@PathVariable UUID id) {
        log.info("Deleting crawler config with id: {}", id);
        try {
            if (!crawlerConfigService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            crawlerConfigService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting crawler config: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/department-website/{departmentWebsiteId}")
    public ResponseEntity<List<CrawlerConfig>> getCrawlerConfigsByDepartmentWebsiteId(@PathVariable UUID departmentWebsiteId) {
        log.info("Getting crawler configs by department website id: {}", departmentWebsiteId);
        List<CrawlerConfig> configs = crawlerConfigService.findByDepartmentWebsiteId(departmentWebsiteId);
        return ResponseEntity.ok(configs);
    }
    
    @GetMapping("/search/title-containing")
    public ResponseEntity<List<CrawlerConfig>> getCrawlerConfigsByTitleContaining(@RequestParam String keyword) {
        log.info("Getting crawler configs by title containing: {}", keyword);
        List<CrawlerConfig> configs = crawlerConfigService.findByTitleContaining(keyword);
        return ResponseEntity.ok(configs);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getCrawlerConfigCount() {
        log.info("Getting total crawler config count");
        long count = crawlerConfigService.count();
        return ResponseEntity.ok(count);
    }
}
