package com.backend.service.impl;

import com.backend.entity.User;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;
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
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    
    @Override
    public User save(User user) {
        log.debug("Saving user: {}", user.getUsername());
        return userRepository.save(user);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(UUID id) {
        log.debug("Finding user by id: {}", id);
        return userRepository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        log.debug("Finding all users");
        return userRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        log.debug("Finding all users with pagination: {}", pageable);
        return userRepository.findAll(pageable);
    }
    
    @Override
    public User update(User user) {
        log.debug("Updating user: {}", user.getId());
        if (!userRepository.existsById(user.getId())) {
            throw new RuntimeException("User not found with id: " + user.getId());
        }
        return userRepository.save(user);
    }
    
    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting user by id: {}", id);
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return userRepository.existsById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long count() {
        return userRepository.count();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        log.debug("Finding user by username: {}", username);
        return userRepository.findAll().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        log.debug("Finding user by email: {}", email);
        return userRepository.findAll().stream()
                .filter(user -> user.getEmail() != null && user.getEmail().equals(email))
                .findFirst();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<User> findByUsernameContaining(String keyword) {
        log.debug("Finding users by username containing: {}", keyword);
        return userRepository.findAll().stream()
                .filter(user -> user.getUsername().toLowerCase()
                       .contains(keyword.toLowerCase()))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<User> findByDepartmentId(UUID departmentId) {
        log.debug("Finding users by department id: {}", departmentId);
        return userRepository.findAll().stream()
                .filter(user -> user.getDepartment() != null && 
                       user.getDepartment().getId().equals(departmentId))
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        log.debug("Checking if username exists: {}", username);
        return userRepository.findAll().stream()
                .anyMatch(user -> user.getUsername().equals(username));
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        log.debug("Checking if email exists: {}", email);
        return userRepository.findAll().stream()
                .anyMatch(user -> user.getEmail() != null && user.getEmail().equals(email));
    }
}
