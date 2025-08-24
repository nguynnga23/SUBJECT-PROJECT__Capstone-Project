package com.backend.service.impl;

import com.backend.entity.Department;
import com.backend.repository.DepartmentRepository;
import com.backend.service.DepartmentService;
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
public class DepartmentServiceImpl implements DepartmentService {
    
    private final DepartmentRepository departmentRepository;
    
    @Override
    public Department save(Department department) {
        log.debug("Saving department: {}", department.getDepartmentName());
        return departmentRepository.save(department);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Department> findById(UUID id) {
        log.debug("Finding department by id: {}", id);
        return departmentRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Department> findAll() {
        log.debug("Finding all departments");
        return departmentRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Department> findAll(Pageable pageable) {
        log.debug("Finding all departments with pagination: {}", pageable);
        return departmentRepository.findAll(pageable);
    }
    
    @Override
    public Department update(Department department) {
        log.debug("Updating department: {}", department.getId());
        if (!departmentRepository.existsById(department.getId())) {
            throw new RuntimeException("Department not found with id: " + department.getId());
        }
        return departmentRepository.save(department);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting department by id: {}", id);
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return departmentRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return departmentRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Department> findByName(String name) {
        log.debug("Finding department by name: {}", name);
        return departmentRepository.findAll().stream()
                .filter(dept -> dept.getDepartmentName().equals(name))
                .findFirst();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Department> findByNameContaining(String keyword) {
        log.debug("Finding departments by name containing: {}", keyword);
        return departmentRepository.findAll().stream()
                .filter(dept -> dept.getDepartmentName().toLowerCase()
                       .contains(keyword.toLowerCase()))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Department> findByKeyDepartment(String keyDepartment) {
        log.debug("Finding department by key: {}", keyDepartment);
        return departmentRepository.findAll().stream()
                .filter(dept -> dept.getKeyDepartment() != null && 
                       dept.getKeyDepartment().equals(keyDepartment))
                .findFirst();
    }
}
