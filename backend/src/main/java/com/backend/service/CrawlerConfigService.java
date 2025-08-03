package com.backend.service;

import com.backend.entity.CrawlerConfig;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CrawlerConfigService {
    CrawlerConfig save(CrawlerConfig crawlerConfig);
    
    Optional<CrawlerConfig> findById(UUID id);
    
    List<CrawlerConfig> findAll();
    
    Page<CrawlerConfig> findAll(Pageable pageable);
    
    CrawlerConfig update(CrawlerConfig crawlerConfig);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    List<CrawlerConfig> findByDepartmentWebsiteId(UUID departmentWebsiteId);
    
    List<CrawlerConfig> findByTitleContaining(String keyword);
}
