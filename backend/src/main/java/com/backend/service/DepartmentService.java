package com.backend.service;

import com.backend.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DepartmentService {
    Department save(Department department);
    
    Optional<Department> findById(UUID id);
    
    List<Department> findAll();
    
    Page<Department> findAll(Pageable pageable);
    
    Department update(Department department);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
    
    long count();
    
    Optional<Department> findByName(String name);
    
    List<Department> findByNameContaining(String keyword);
    
    Optional<Department> findByKeyDepartment(String keyDepartment);
}
