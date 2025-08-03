package com.backend.service;

import com.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    User save(User user);
    
    Optional<User> findById(UUID id);
    
    List<User> findAll();
    
    Page<User> findAll(Pageable pageable);
    
    User update(User user);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    List<User> findByUsernameContaining(String keyword);
    
    List<User> findByDepartmentId(UUID departmentId);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
}
