package com.backend.service;

import com.backend.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleService {
    Role save(Role role);
    
    Optional<Role> findById(UUID id);
    
    List<Role> findAll();
    
    Page<Role> findAll(Pageable pageable);
    
    Role update(Role role);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    Optional<Role> findByName(String name);
    
    List<Role> findByNameContaining(String keyword);
}
