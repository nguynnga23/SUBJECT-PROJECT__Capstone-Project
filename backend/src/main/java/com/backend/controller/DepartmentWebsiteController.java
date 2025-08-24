package com.backend.controller;

import com.backend.dto.DepartmentWebsiteDto;
import com.backend.entity.DepartmentWebsite;
import com.backend.mapper.DepartmentWebsiteMapper;
import com.backend.service.DepartmentWebsiteService;
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
@RequestMapping("/api/department-websites")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class DepartmentWebsiteController {
    
    private final DepartmentWebsiteService departmentWebsiteService;
    private final DepartmentWebsiteMapper departmentWebsiteMapper;
    
    @PostMapping
    public ResponseEntity<DepartmentWebsiteDto> createDepartmentWebsite(@RequestBody DepartmentWebsiteDto departmentWebsiteDto) {
        log.info("Creating new department website: {}", departmentWebsiteDto.getDepartmentWebsiteUrl());
        try {
            DepartmentWebsite departmentWebsite = departmentWebsiteMapper.toEntity(departmentWebsiteDto);
            DepartmentWebsite savedWebsite = departmentWebsiteService.save(departmentWebsite);
            return ResponseEntity.status(HttpStatus.CREATED).body(departmentWebsiteMapper.toDto(savedWebsite));
        } catch (Exception e) {
            log.error("Error creating department website: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentWebsiteDto> getDepartmentWebsiteById(@PathVariable UUID id) {
        log.info("Getting department website by id: {}", id);
        Optional<DepartmentWebsite> website = departmentWebsiteService.findById(id);
        return website.map(value -> ResponseEntity.ok().body(departmentWebsiteMapper.toDto(value)))
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<DepartmentWebsiteDto>> getAllDepartmentWebsites() {
        log.info("Getting all department websites");
        List<DepartmentWebsite> websites = departmentWebsiteService.findAll();
        List<DepartmentWebsiteDto> websiteDtos = websites.stream()
                .map(departmentWebsiteMapper::toDto)
                .toList();
        return ResponseEntity.ok(websiteDtos);
    }
    
    @GetMapping("/page")
    public ResponseEntity<Page<DepartmentWebsiteDto>> getAllDepartmentWebsitesPageable(Pageable pageable) {
        log.info("Getting all department websites with pagination: {}", pageable);
        Page<DepartmentWebsite> websites = departmentWebsiteService.findAll(pageable);
        Page<DepartmentWebsiteDto> websiteDtos = websites.map(departmentWebsiteMapper::toDto);
        return ResponseEntity.ok(websiteDtos);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentWebsiteDto> updateDepartmentWebsite(@PathVariable UUID id, @RequestBody DepartmentWebsiteDto departmentWebsiteDto) {
        log.info("Updating department website with id: {}", id);
        try {
            if (!departmentWebsiteService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            DepartmentWebsite departmentWebsite = departmentWebsiteMapper.toEntity(departmentWebsiteDto);
            departmentWebsite.setId(id);
            DepartmentWebsite updatedWebsite = departmentWebsiteService.update(departmentWebsite);
            return ResponseEntity.ok(departmentWebsiteMapper.toDto(updatedWebsite));
        } catch (Exception e) {
            log.error("Error updating department website: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartmentWebsite(@PathVariable UUID id) {
        log.info("Deleting department website with id: {}", id);
        try {
            if (!departmentWebsiteService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            departmentWebsiteService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting department website: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<DepartmentWebsiteDto>> getDepartmentWebsitesByDepartmentId(@PathVariable UUID departmentId) {
        log.info("Getting department websites by department id: {}", departmentId);
        List<DepartmentWebsite> websites = departmentWebsiteService.findByDepartmentId(departmentId);
        List<DepartmentWebsiteDto> websiteDtos = websites.stream()
                .map(departmentWebsiteMapper::toDto)
                .toList();
        return ResponseEntity.ok(websiteDtos);
    }
    
    @GetMapping("/search/url")
    public ResponseEntity<DepartmentWebsiteDto> getDepartmentWebsiteByUrl(@RequestParam String url) {
        log.info("Getting department website by url: {}", url);
        Optional<DepartmentWebsite> website = departmentWebsiteService.findByUrl(url);
        return website.map(value -> ResponseEntity.ok().body(departmentWebsiteMapper.toDto(value)))
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search/url-containing")
    public ResponseEntity<List<DepartmentWebsiteDto>> getDepartmentWebsitesByUrlContaining(@RequestParam String keyword) {
        log.info("Getting department websites by url containing: {}", keyword);
        List<DepartmentWebsite> websites = departmentWebsiteService.findByUrlContaining(keyword);
        List<DepartmentWebsiteDto> websiteDtos = websites.stream()
                .map(departmentWebsiteMapper::toDto)
                .toList();
        return ResponseEntity.ok(websiteDtos);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getDepartmentWebsiteCount() {
        log.info("Getting total department website count");
        long count = departmentWebsiteService.count();
        return ResponseEntity.ok(count);
    }
}
