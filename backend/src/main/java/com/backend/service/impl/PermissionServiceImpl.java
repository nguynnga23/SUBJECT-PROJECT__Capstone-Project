package com.backend.service.impl;

import com.backend.entity.Permission;
import com.backend.repository.PermissionRepository;
import com.backend.service.PermissionService;
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
public class PermissionServiceImpl implements PermissionService {
    
    private final PermissionRepository permissionRepository;
    
    @Override
    public Permission save(Permission permission) {
        log.debug("Saving permission: {} - {}", permission.getAction(), permission.getSubject());
        return permissionRepository.save(permission);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Permission> findById(UUID id) {
        log.debug("Finding permission by id: {}", id);
        return permissionRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Permission> findAll() {
        log.debug("Finding all permissions");
        return permissionRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Permission> findAll(Pageable pageable) {
        log.debug("Finding all permissions with pagination: {}", pageable);
        return permissionRepository.findAll(pageable);
    }
    
    @Override
    public Permission update(Permission permission) {
        log.debug("Updating permission: {}", permission.getId());
        if (!permissionRepository.existsById(permission.getId())) {
            throw new RuntimeException("Permission not found with id: " + permission.getId());
        }
        return permissionRepository.save(permission);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting permission by id: {}", id);
        if (!permissionRepository.existsById(id)) {
            throw new RuntimeException("Permission not found with id: " + id);
        }
        permissionRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return permissionRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return permissionRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Permission> findByAction(String action) {
        log.debug("Finding permissions by action: {}", action);
        return permissionRepository.findAll().stream()
                .filter(permission -> permission.getAction() != null && 
                       permission.getAction().equals(action))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Permission> findBySubject(String subject) {
        log.debug("Finding permissions by subject: {}", subject);
        return permissionRepository.findAll().stream()
                .filter(permission -> permission.getSubject() != null && 
                       permission.getSubject().equals(subject))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Permission> findByActionAndSubject(String action, String subject) {
        log.debug("Finding permissions by action: {} and subject: {}", action, subject);
        return permissionRepository.findAll().stream()
                .filter(permission -> permission.getAction() != null && 
                       permission.getAction().equals(action) &&
                       permission.getSubject() != null && 
                       permission.getSubject().equals(subject))
                .toList();
    }
}
