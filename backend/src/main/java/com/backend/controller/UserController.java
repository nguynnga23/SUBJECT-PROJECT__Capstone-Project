package com.backend.controller;

import com.backend.dto.UserDto;
import com.backend.entity.User;
import com.backend.mapper.UserMapper;
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
    private final UserMapper userMapper;
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        log.info("Creating new user: {}", userDto.getUsername());
        try {
            // Check if username or email already exists
            if (userService.existsByUsername(userDto.getUsername())) {
                log.warn("Username already exists: {}", userDto.getUsername());
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            if (userDto.getEmail() != null && userService.existsByEmail(userDto.getEmail())) {
                log.warn("Email already exists: {}", userDto.getEmail());
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            
            User user = userMapper.toEntity(userDto);
            User savedUser = userService.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.toDto(savedUser));
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID id) {
        log.info("Getting user by id: {}", id);
        Optional<User> user = userService.findById(id);
        return user.map(value -> ResponseEntity.ok().body(userMapper.toDto(value)))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        log.info("Getting all users");
        List<User> users = userService.findAll();
        List<UserDto> userDtos = users.stream()
                .map(userMapper::toDto)
                .toList();
        return ResponseEntity.ok(userDtos);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<UserDto>> getAllUsersPageable(Pageable pageable) {
        log.info("Getting all users with pagination: {}", pageable);
        Page<User> users = userService.findAll(pageable);
        Page<UserDto> userDtos = users.map(userMapper::toDto);
        return ResponseEntity.ok(userDtos);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID id, @RequestBody UserDto userDto) {
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
                if (!existingUser.getUsername().equals(userDto.getUsername()) && 
                    userService.existsByUsername(userDto.getUsername())) {
                    log.warn("Username already exists: {}", userDto.getUsername());
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
                
                // Check email conflict (if changed)
                if (userDto.getEmail() != null && 
                    !userDto.getEmail().equals(existingUser.getEmail()) && 
                    userService.existsByEmail(userDto.getEmail())) {
                    log.warn("Email already exists: {}", userDto.getEmail());
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
            }
            
            User user = userMapper.toEntity(userDto);
            user.setId(id);
            User updatedUser = userService.update(user);
            return ResponseEntity.ok(userMapper.toDto(updatedUser));
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
    public ResponseEntity<UserDto> getUserByUsername(@RequestParam String username) {
        log.info("Getting user by username: {}", username);
        Optional<User> user = userService.findByUsername(username);
        return user.map(value -> ResponseEntity.ok().body(userMapper.toDto(value)))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/email")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam String email) {
        log.info("Getting user by email: {}", email);
        Optional<User> user = userService.findByEmail(email);
        return user.map(value -> ResponseEntity.ok().body(userMapper.toDto(value)))
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/username-containing")
    public ResponseEntity<List<UserDto>> getUsersByUsernameContaining(@RequestParam String keyword) {
        log.info("Getting users by username containing: {}", keyword);
        List<User> users = userService.findByUsernameContaining(keyword);
        List<UserDto> userDtos = users.stream()
                .map(userMapper::toDto)
                .toList();
        return ResponseEntity.ok(userDtos);
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<UserDto>> getUsersByDepartmentId(@PathVariable UUID departmentId) {
        log.info("Getting users by department id: {}", departmentId);
        List<User> users = userService.findByDepartmentId(departmentId);
        List<UserDto> userDtos = users.stream()
                .map(userMapper::toDto)
                .toList();
        return ResponseEntity.ok(userDtos);
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
