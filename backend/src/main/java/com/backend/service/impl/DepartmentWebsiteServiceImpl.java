package com.backend.service.impl;

import com.backend.entity.DepartmentWebsite;
import com.backend.repository.DepartmentWebsiteRepository;
import com.backend.service.DepartmentWebsiteService;
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
public class DepartmentWebsiteServiceImpl implements DepartmentWebsiteService {
    
    private final DepartmentWebsiteRepository departmentWebsiteRepository;
    
    @Override
    public DepartmentWebsite save(DepartmentWebsite departmentWebsite) {
        log.debug("Saving department website: {}", departmentWebsite.getDepartmentWebsiteUrl());
        return departmentWebsiteRepository.save(departmentWebsite);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<DepartmentWebsite> findById(UUID id) {
        log.debug("Finding department website by id: {}", id);
        return departmentWebsiteRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentWebsite> findAll() {
        log.debug("Finding all department websites");
        return departmentWebsiteRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<DepartmentWebsite> findAll(Pageable pageable) {
        log.debug("Finding all department websites with pagination: {}", pageable);
        return departmentWebsiteRepository.findAll(pageable);
    }
    
    @Override
    public DepartmentWebsite update(DepartmentWebsite departmentWebsite) {
        log.debug("Updating department website: {}", departmentWebsite.getId());
        if (!departmentWebsiteRepository.existsById(departmentWebsite.getId())) {
            throw new RuntimeException("DepartmentWebsite not found with id: " + departmentWebsite.getId());
        }
        return departmentWebsiteRepository.save(departmentWebsite);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting department website by id: {}", id);
        if (!departmentWebsiteRepository.existsById(id)) {
            throw new RuntimeException("DepartmentWebsite not found with id: " + id);
        }
        departmentWebsiteRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return departmentWebsiteRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return departmentWebsiteRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentWebsite> findByDepartmentId(UUID departmentId) {
        log.debug("Finding department websites by department id: {}", departmentId);
        return departmentWebsiteRepository.findAll().stream()
                .filter(website -> website.getDepartment() != null && 
                       website.getDepartment().getId().equals(departmentId))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<DepartmentWebsite> findByUrl(String url) {
        log.debug("Finding department website by url: {}", url);
        return departmentWebsiteRepository.findAll().stream()
                .filter(website -> website.getDepartmentWebsiteUrl().equals(url))
                .findFirst();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentWebsite> findByUrlContaining(String keyword) {
        log.debug("Finding department websites by url containing: {}", keyword);
        return departmentWebsiteRepository.findAll().stream()
                .filter(website -> website.getDepartmentWebsiteUrl().toLowerCase()
                       .contains(keyword.toLowerCase()))
                .toList();
    }
}
