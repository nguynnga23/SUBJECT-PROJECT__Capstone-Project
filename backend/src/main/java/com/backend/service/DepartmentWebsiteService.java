package com.backend.service;

import com.backend.entity.DepartmentWebsite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DepartmentWebsiteService {
    DepartmentWebsite save(DepartmentWebsite departmentWebsite);
    
    Optional<DepartmentWebsite> findById(UUID id);
    
    List<DepartmentWebsite> findAll();
    
    Page<DepartmentWebsite> findAll(Pageable pageable);
    
    DepartmentWebsite update(DepartmentWebsite departmentWebsite);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    List<DepartmentWebsite> findByDepartmentId(UUID departmentId);
    
    Optional<DepartmentWebsite> findByUrl(String url);
    
    List<DepartmentWebsite> findByUrlContaining(String keyword);
}
