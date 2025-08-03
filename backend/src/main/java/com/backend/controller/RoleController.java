package com.backend.controller;

import com.backend.dto.RoleDto;
import com.backend.entity.Role;
import com.backend.mapper.RoleMapper;
import com.backend.service.RoleService;
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
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class RoleController {
    
    private final RoleService roleService;
    private final RoleMapper roleMapper;
    
    @PostMapping
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
        log.info("Creating new role: {}", roleDto.getName());
        try {
            Role role = roleMapper.toEntity(roleDto);
            Role savedRole = roleService.save(role);
            return ResponseEntity.status(HttpStatus.CREATED).body(roleMapper.toDto(savedRole));
        } catch (Exception e) {
            log.error("Error creating role: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable UUID id) {
        log.info("Getting role by id: {}", id);
        Optional<Role> role = roleService.findById(id);
        return role.map(value -> ResponseEntity.ok().body(value))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        log.info("Getting all roles");
        List<Role> roles = roleService.findAll();
        return ResponseEntity.ok(roles);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<Role>> getAllRolesPageable(Pageable pageable) {
        log.info("Getting all roles with pagination: {}", pageable);
        Page<Role> roles = roleService.findAll(pageable);
        return ResponseEntity.ok(roles);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable UUID id, @RequestBody Role role) {
        log.info("Updating role with id: {}", id);
        try {
            if (!roleService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            role.setId(id);
            Role updatedRole = roleService.update(role);
            return ResponseEntity.ok(updatedRole);
        } catch (Exception e) {
            log.error("Error updating role: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable UUID id) {
        log.info("Deleting role with id: {}", id);
        try {
            if (!roleService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            roleService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting role: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/search/name")
    public ResponseEntity<Role> getRoleByName(@RequestParam String name) {
        log.info("Getting role by name: {}", name);
        Optional<Role> role = roleService.findByName(name);
        return role.map(value -> ResponseEntity.ok().body(value))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/name-containing")
    public ResponseEntity<List<Role>> getRolesByNameContaining(@RequestParam String keyword) {
        log.info("Getting roles by name containing: {}", keyword);
        List<Role> roles = roleService.findByNameContaining(keyword);
        return ResponseEntity.ok(roles);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getRoleCount() {
        log.info("Getting total role count");
        long count = roleService.count();
        return ResponseEntity.ok(count);
    }
}
