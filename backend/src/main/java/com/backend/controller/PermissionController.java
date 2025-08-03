package com.backend.controller;

import com.backend.dto.PermissionDto;
import com.backend.entity.Permission;
import com.backend.mapper.PermissionMapper;
import com.backend.service.PermissionService;
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
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PermissionController {
    
    private final PermissionService permissionService;
    private final PermissionMapper permissionMapper;
    
    @PostMapping
    public ResponseEntity<PermissionDto> createPermission(@RequestBody PermissionDto permissionDto) {
        log.info("Creating new permission: {} - {}", permissionDto.getAction(), permissionDto.getSubject());
        try {
            Permission permission = permissionMapper.toEntity(permissionDto);
            Permission savedPermission = permissionService.save(permission);
            return ResponseEntity.status(HttpStatus.CREATED).body(permissionMapper.toDto(savedPermission));
        } catch (Exception e) {
            log.error("Error creating permission: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Permission> getPermissionById(@PathVariable UUID id) {
        log.info("Getting permission by id: {}", id);
        Optional<Permission> permission = permissionService.findById(id);
        return permission.map(value -> ResponseEntity.ok().body(value))
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Permission>> getAllPermissions() {
        log.info("Getting all permissions");
        List<Permission> permissions = permissionService.findAll();
        return ResponseEntity.ok(permissions);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<Permission>> getAllPermissionsPageable(Pageable pageable) {
        log.info("Getting all permissions with pagination: {}", pageable);
        Page<Permission> permissions = permissionService.findAll(pageable);
        return ResponseEntity.ok(permissions);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Permission> updatePermission(@PathVariable UUID id, @RequestBody Permission permission) {
        log.info("Updating permission with id: {}", id);
        try {
            if (!permissionService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            permission.setId(id);
            Permission updatedPermission = permissionService.update(permission);
            return ResponseEntity.ok(updatedPermission);
        } catch (Exception e) {
            log.error("Error updating permission: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePermission(@PathVariable UUID id) {
        log.info("Deleting permission with id: {}", id);
        try {
            if (!permissionService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            permissionService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting permission: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/search/action")
    public ResponseEntity<List<Permission>> getPermissionsByAction(@RequestParam String action) {
        log.info("Getting permissions by action: {}", action);
        List<Permission> permissions = permissionService.findByAction(action);
        return ResponseEntity.ok(permissions);
    }
    
    @GetMapping("/search/subject")
    public ResponseEntity<List<Permission>> getPermissionsBySubject(@RequestParam String subject) {
        log.info("Getting permissions by subject: {}", subject);
        List<Permission> permissions = permissionService.findBySubject(subject);
        return ResponseEntity.ok(permissions);
    }
    
    @GetMapping("/search/action-and-subject")
    public ResponseEntity<List<Permission>> getPermissionsByActionAndSubject(
            @RequestParam String action, 
            @RequestParam String subject) {
        log.info("Getting permissions by action: {} and subject: {}", action, subject);
        List<Permission> permissions = permissionService.findByActionAndSubject(action, subject);
        return ResponseEntity.ok(permissions);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getPermissionCount() {
        log.info("Getting total permission count");
        long count = permissionService.count();
        return ResponseEntity.ok(count);
    }
}
