package com.backend.controller;

import com.backend.dto.request.DepartmentSourceReq;
import com.backend.service.DepartmentSourceService;
import com.backend.strapi.vm.DepartmentSourceVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/department-sources")
@Slf4j
@CrossOrigin(origins = "*")
public class DepartmentSourceController {

    private final DepartmentSourceService departmentSourceService;

    public DepartmentSourceController(DepartmentSourceService departmentSourceService) {
        this.departmentSourceService = departmentSourceService;
    }

    @GetMapping("/count")
    public int countItems() {
        return departmentSourceService.countItems();
    }

    @GetMapping
    public List<DepartmentSourceVM> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return departmentSourceService.list(page, pageSize);
    }

    @GetMapping("/{documentId}")
    public DepartmentSourceVM get(@PathVariable("documentId") String documentId) {
        return departmentSourceService.one(documentId);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody DepartmentSourceReq req) {
        try {
            Object created = departmentSourceService.create(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", e.getResponseBodyAsString()));
        } catch (Exception ex) {
            log.error("Failed to create department-source", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to create department-source"));
        }
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(
            @PathVariable String documentId,
            @RequestBody DepartmentSourceReq req
    ) {
        try {
            Object updated = departmentSourceService.update(documentId, req);
            return ResponseEntity.ok(updated);
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", e.getResponseBodyAsString()));
        } catch (Exception ex) {
            log.error("Failed to update department-source", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to update department-source"));
        }
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable String documentId) {
        try {
            departmentSourceService.delete(documentId);
            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "message", "Department Source deleted successfully"
            ));
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", e.getResponseBodyAsString()));
        } catch (Exception ex) {
            log.error("Failed to delete department-source", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to delete department-source"));
        }
    }
}
