package com.backend.service.impl;

import com.backend.entity.CrawlerConfig;
import com.backend.repository.CrawlerConfigRepository;
import com.backend.service.CrawlerConfigService;
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
public class CrawlerConfigServiceImpl implements CrawlerConfigService {
    
    private final CrawlerConfigRepository crawlerConfigRepository;
    
    @Override
    public CrawlerConfig save(CrawlerConfig crawlerConfig) {
        log.debug("Saving crawler config: {}", crawlerConfig.getId());
        return crawlerConfigRepository.save(crawlerConfig);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<CrawlerConfig> findById(UUID id) {
        log.debug("Finding crawler config by id: {}", id);
        return crawlerConfigRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CrawlerConfig> findAll() {
        log.debug("Finding all crawler configs");
        return crawlerConfigRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<CrawlerConfig> findAll(Pageable pageable) {
        log.debug("Finding all crawler configs with pagination: {}", pageable);
        return crawlerConfigRepository.findAll(pageable);
    }
    
    @Override
    public CrawlerConfig update(CrawlerConfig crawlerConfig) {
        log.debug("Updating crawler config: {}", crawlerConfig.getId());
        if (!crawlerConfigRepository.existsById(crawlerConfig.getId())) {
            throw new RuntimeException("CrawlerConfig not found with id: " + crawlerConfig.getId());
        }
        return crawlerConfigRepository.save(crawlerConfig);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting crawler config by id: {}", id);
        if (!crawlerConfigRepository.existsById(id)) {
            throw new RuntimeException("CrawlerConfig not found with id: " + id);
        }
        crawlerConfigRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return crawlerConfigRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return crawlerConfigRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CrawlerConfig> findByDepartmentWebsiteId(UUID departmentWebsiteId) {
        log.debug("Finding crawler configs by department website id: {}", departmentWebsiteId);
        return crawlerConfigRepository.findAll().stream()
                .filter(config -> config.getDepartmentWebsite() != null && 
                       config.getDepartmentWebsite().getId().equals(departmentWebsiteId))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CrawlerConfig> findByTitleContaining(String keyword) {
        log.debug("Finding crawler configs by title containing: {}", keyword);
        return crawlerConfigRepository.findAll().stream()
                .filter(config -> config.getTitle() != null && 
                       config.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                .toList();
    }
}
