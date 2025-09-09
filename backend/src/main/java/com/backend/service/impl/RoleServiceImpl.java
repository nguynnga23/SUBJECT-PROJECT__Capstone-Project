package com.backend.service.impl;

import com.backend.entity.Role;
import com.backend.repository.RoleRepository;
import com.backend.service.RoleService;
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
public class RoleServiceImpl implements RoleService {
    
    private final RoleRepository roleRepository;
    
    @Override
    public Role save(Role role) {
        log.debug("Saving role: {}", role.getName());
        return roleRepository.save(role);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Role> findById(UUID id) {
        log.debug("Finding role by id: {}", id);
        return roleRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Role> findAll() {
        log.debug("Finding all roles");
        return roleRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Role> findAll(Pageable pageable) {
        log.debug("Finding all roles with pagination: {}", pageable);
        return roleRepository.findAll(pageable);
    }
    
    @Override
    public Role update(Role role) {
        log.debug("Updating role: {}", role.getId());
        if (!roleRepository.existsById(role.getId())) {
            throw new RuntimeException("Role not found with id: " + role.getId());
        }
        return roleRepository.save(role);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting role by id: {}", id);
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Role not found with id: " + id);
        }
        roleRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return roleRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return roleRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Role> findByName(String name) {
        log.debug("Finding role by name: {}", name);
        return roleRepository.findAll().stream()
                .filter(role -> role.getName().equals(name))
                .findFirst();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Role> findByNameContaining(String keyword) {
        log.debug("Finding roles by name containing: {}", keyword);
        return roleRepository.findAll().stream()
                .filter(role -> role.getName().toLowerCase()
                       .contains(keyword.toLowerCase()))
                .toList();
    }
}
