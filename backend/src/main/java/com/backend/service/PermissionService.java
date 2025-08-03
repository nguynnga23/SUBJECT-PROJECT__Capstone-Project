package com.backend.service;

import com.backend.entity.Permission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PermissionService {
    Permission save(Permission permission);
    
    Optional<Permission> findById(UUID id);
    
    List<Permission> findAll();
    
    Page<Permission> findAll(Pageable pageable);
    
    Permission update(Permission permission);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    List<Permission> findByAction(String action);
    
    List<Permission> findBySubject(String subject);
    
    List<Permission> findByActionAndSubject(String action, String subject);
}
