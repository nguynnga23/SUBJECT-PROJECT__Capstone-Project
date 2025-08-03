package com.backend.controller;

import com.backend.entity.User;
import com.backend.service.UserService;
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
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class UserController {
    
    private final UserService userService;
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        log.info("Creating new user: {}", user.getUsername());
        try {
            // Check if username or email already exists
            if (userService.existsByUsername(user.getUsername())) {
                log.warn("Username already exists: {}", user.getUsername());
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            if (user.getEmail() != null && userService.existsByEmail(user.getEmail())) {
                log.warn("Email already exists: {}", user.getEmail());
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            
            User savedUser = userService.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        log.info("Getting user by id: {}", id);
        Optional<User> user = userService.findById(id);
        return user.map(value -> ResponseEntity.ok().body(value))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        log.info("Getting all users");
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<User>> getAllUsersPageable(Pageable pageable) {
        log.info("Getting all users with pagination: {}", pageable);
        Page<User> users = userService.findAll(pageable);
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable UUID id, @RequestBody User user) {
        log.info("Updating user with id: {}", id);
        try {
            if (!userService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            
            // Get existing user to check for conflicts
            Optional<User> existingUserOpt = userService.findById(id);
            if (existingUserOpt.isPresent()) {
                User existingUser = existingUserOpt.get();
                
                // Check username conflict (if changed)
                if (!existingUser.getUsername().equals(user.getUsername()) && 
                    userService.existsByUsername(user.getUsername())) {
                    log.warn("Username already exists: {}", user.getUsername());
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
                
                // Check email conflict (if changed)
                if (user.getEmail() != null && 
                    !user.getEmail().equals(existingUser.getEmail()) && 
                    userService.existsByEmail(user.getEmail())) {
                    log.warn("Email already exists: {}", user.getEmail());
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
            }
            
            user.setId(id);
            User updatedUser = userService.update(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            log.error("Error updating user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        log.info("Deleting user with id: {}", id);
        try {
            if (!userService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/search/username")
    public ResponseEntity<User> getUserByUsername(@RequestParam String username) {
        log.info("Getting user by username: {}", username);
        Optional<User> user = userService.findByUsername(username);
        return user.map(value -> ResponseEntity.ok().body(value))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        log.info("Getting user by email: {}", email);
        Optional<User> user = userService.findByEmail(email);
        return user.map(value -> ResponseEntity.ok().body(value))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/username-containing")
    public ResponseEntity<List<User>> getUsersByUsernameContaining(@RequestParam String keyword) {
        log.info("Getting users by username containing: {}", keyword);
        List<User> users = userService.findByUsernameContaining(keyword);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<User>> getUsersByDepartmentId(@PathVariable UUID departmentId) {
        log.info("Getting users by department id: {}", departmentId);
        List<User> users = userService.findByDepartmentId(departmentId);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/check/username")
    public ResponseEntity<Boolean> checkUsernameExists(@RequestParam String username) {
        log.info("Checking if username exists: {}", username);
        boolean exists = userService.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/check/email")
    public ResponseEntity<Boolean> checkEmailExists(@RequestParam String email) {
        log.info("Checking if email exists: {}", email);
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        log.info("Getting total user count");
        long count = userService.count();
        return ResponseEntity.ok(count);
    }
}
