package com.backend.controller;

import com.backend.dto.CrawlerConfigDto;
import com.backend.entity.CrawlerConfig;
import com.backend.mapper.CrawlerConfigMapper;
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
    private final CrawlerConfigMapper crawlerConfigMapper;
    
    @PostMapping
    public ResponseEntity<CrawlerConfigDto> createCrawlerConfig(@RequestBody CrawlerConfigDto crawlerConfigDto) {
        log.info("Creating new crawler config");
        try {
            CrawlerConfig crawlerConfig = crawlerConfigMapper.toEntity(crawlerConfigDto);
            CrawlerConfig savedConfig = crawlerConfigService.save(crawlerConfig);
            return ResponseEntity.status(HttpStatus.CREATED).body(crawlerConfigMapper.toDto(savedConfig));
        } catch (Exception e) {
            log.error("Error creating crawler config: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CrawlerConfigDto> getCrawlerConfigById(@PathVariable UUID id) {
        log.info("Getting crawler config by id: {}", id);
        Optional<CrawlerConfig> config = crawlerConfigService.findById(id);
        return config.map(value -> ResponseEntity.ok().body(crawlerConfigMapper.toDto(value)))
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<CrawlerConfigDto>> getAllCrawlerConfigs() {
        log.info("Getting all crawler configs");
        List<CrawlerConfig> configs = crawlerConfigService.findAll();
        List<CrawlerConfigDto> configDtos = configs.stream()
                .map(crawlerConfigMapper::toDto)
                .toList();
        return ResponseEntity.ok(configDtos);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<CrawlerConfigDto>> getAllCrawlerConfigsPageable(Pageable pageable) {
        log.info("Getting all crawler configs with pagination: {}", pageable);
        Page<CrawlerConfig> configs = crawlerConfigService.findAll(pageable);
        Page<CrawlerConfigDto> configDtos = configs.map(crawlerConfigMapper::toDto);
        return ResponseEntity.ok(configDtos);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CrawlerConfigDto> updateCrawlerConfig(@PathVariable UUID id, @RequestBody CrawlerConfigDto crawlerConfigDto) {
        log.info("Updating crawler config with id: {}", id);
        try {
            if (!crawlerConfigService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            CrawlerConfig crawlerConfig = crawlerConfigMapper.toEntity(crawlerConfigDto);
            crawlerConfig.setId(id);
            CrawlerConfig updatedConfig = crawlerConfigService.update(crawlerConfig);
            return ResponseEntity.ok(crawlerConfigMapper.toDto(updatedConfig));
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
    public ResponseEntity<List<CrawlerConfigDto>> getCrawlerConfigsByDepartmentWebsiteId(@PathVariable UUID departmentWebsiteId) {
        log.info("Getting crawler configs by department website id: {}", departmentWebsiteId);
        List<CrawlerConfig> configs = crawlerConfigService.findByDepartmentWebsiteId(departmentWebsiteId);
        List<CrawlerConfigDto> configDtos = configs.stream()
                .map(crawlerConfigMapper::toDto)
                .toList();
        return ResponseEntity.ok(configDtos);
    }
    
    @GetMapping("/search/title-containing")
    public ResponseEntity<List<CrawlerConfigDto>> getCrawlerConfigsByTitleContaining(@RequestParam String keyword) {
        log.info("Getting crawler configs by title containing: {}", keyword);
        List<CrawlerConfig> configs = crawlerConfigService.findByTitleContaining(keyword);
        List<CrawlerConfigDto> configDtos = configs.stream()
                .map(crawlerConfigMapper::toDto)
                .toList();
        return ResponseEntity.ok(configDtos);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getCrawlerConfigCount() {
        log.info("Getting total crawler config count");
        long count = crawlerConfigService.count();
        return ResponseEntity.ok(count);
    }
}
