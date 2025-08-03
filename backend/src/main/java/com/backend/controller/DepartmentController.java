package com.backend.controller;

import com.backend.entity.Department;
import com.backend.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class DepartmentController {
    
    private final DepartmentService departmentService;
    
    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        log.info("Creating new department: {}", department.getDepartmentName());
        try {
            Department savedDepartment = departmentService.save(department);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDepartment);
        } catch (Exception e) {
            log.error("Error creating department: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable UUID id) {
        log.info("Getting department by id: {}", id);
        Optional<Department> department = departmentService.findById(id);
        return department.map(value -> ResponseEntity.ok().body(value))
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        log.info("Getting all departments");
        List<Department> departments = departmentService.findAll();
        return ResponseEntity.ok(departments);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<Department>> getAllDepartmentsPageable(Pageable pageable) {
        log.info("Getting all departments with pagination: {}", pageable);
        Page<Department> departments = departmentService.findAll(pageable);
        return ResponseEntity.ok(departments);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable UUID id, @RequestBody Department department) {
        log.info("Updating department with id: {}", id);
        try {
            if (!departmentService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            department.setId(id);
            Department updatedDepartment = departmentService.update(department);
            return ResponseEntity.ok(updatedDepartment);
        } catch (Exception e) {
            log.error("Error updating department: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable UUID id) {
        log.info("Deleting department with id: {}", id);
        try {
            if (!departmentService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            departmentService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting department: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/search/name")
    public ResponseEntity<Department> getDepartmentByName(@RequestParam String name) {
        log.info("Getting department by name: {}", name);
        Optional<Department> department = departmentService.findByName(name);
        return department.map(value -> ResponseEntity.ok().body(value))
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/name-containing")
    public ResponseEntity<List<Department>> getDepartmentsByNameContaining(@RequestParam String keyword) {
        log.info("Getting departments by name containing: {}", keyword);
        List<Department> departments = departmentService.findByNameContaining(keyword);
        return ResponseEntity.ok(departments);
    }
    
    @GetMapping("/search/key")
    public ResponseEntity<Department> getDepartmentByKeyDepartment(@RequestParam String keyDepartment) {
        log.info("Getting department by key: {}", keyDepartment);
        Optional<Department> department = departmentService.findByKeyDepartment(keyDepartment);
        return department.map(value -> ResponseEntity.ok().body(value))
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getDepartmentCount() {
        log.info("Getting total department count");
        long count = departmentService.count();
        return ResponseEntity.ok(count);
    }
}
