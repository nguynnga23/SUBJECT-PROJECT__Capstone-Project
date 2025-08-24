package com.backend.controller;

import com.backend.dto.DepartmentDto;
import com.backend.entity.Department;
import com.backend.mapper.DepartmentMapper;
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
    private final DepartmentMapper departmentMapper;
    
    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto) {
        log.info("Creating new department: {}", departmentDto.getDepartmentName());
        try {
            Department department = departmentMapper.toEntity(departmentDto);
            Department savedDepartment = departmentService.save(department);
            return ResponseEntity.status(HttpStatus.CREATED).body(departmentMapper.toDto(savedDepartment));
        } catch (Exception e) {
            log.error("Error creating department: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable UUID id) {
        log.info("Getting department by id: {}", id);
        Optional<Department> department = departmentService.findById(id);
        return department.map(value -> ResponseEntity.ok().body(departmentMapper.toDto(value)))
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
        log.info("Getting all departments");
        List<Department> departments = departmentService.findAll();
        List<DepartmentDto> departmentDtos = departments.stream()
                .map(departmentMapper::toDto)
                .toList();
        return ResponseEntity.ok(departmentDtos);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<DepartmentDto>> getAllDepartmentsPageable(Pageable pageable) {
        log.info("Getting all departments with pagination: {}", pageable);
        Page<Department> departments = departmentService.findAll(pageable);
        Page<DepartmentDto> departmentDtos = departments.map(departmentMapper::toDto);
        return ResponseEntity.ok(departmentDtos);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable UUID id, @RequestBody DepartmentDto departmentDto) {
        log.info("Updating department with id: {}", id);
        try {
            if (!departmentService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            Department department = departmentMapper.toEntity(departmentDto);
            department.setId(id);
            Department updatedDepartment = departmentService.update(department);
            return ResponseEntity.ok(departmentMapper.toDto(updatedDepartment));
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
    public ResponseEntity<DepartmentDto> getDepartmentByName(@RequestParam String name) {
        log.info("Getting department by name: {}", name);
        Optional<Department> department = departmentService.findByName(name);
        return department.map(value -> ResponseEntity.ok().body(departmentMapper.toDto(value)))
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/name-containing")
    public ResponseEntity<List<DepartmentDto>> getDepartmentsByNameContaining(@RequestParam String keyword) {
        log.info("Getting departments by name containing: {}", keyword);
        List<Department> departments = departmentService.findByNameContaining(keyword);
        List<DepartmentDto> departmentDtos = departments.stream()
                .map(departmentMapper::toDto)
                .toList();
        return ResponseEntity.ok(departmentDtos);
    }
    
    @GetMapping("/search/key")
    public ResponseEntity<DepartmentDto> getDepartmentByKeyDepartment(@RequestParam String keyDepartment) {
        log.info("Getting department by key: {}", keyDepartment);
        Optional<Department> department = departmentService.findByKeyDepartment(keyDepartment);
        return department.map(value -> ResponseEntity.ok().body(departmentMapper.toDto(value)))
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getDepartmentCount() {
        log.info("Getting total department count");
        long count = departmentService.count();
        return ResponseEntity.ok(count);
    }
}
