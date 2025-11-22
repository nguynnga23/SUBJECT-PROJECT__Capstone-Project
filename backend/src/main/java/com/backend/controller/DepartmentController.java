package com.backend.controller;

import com.backend.dto.request.DepartmentReq;
import com.backend.service.DepartmentService;
import com.backend.strapi.vm.DepartmentVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/departments")
@Slf4j
@CrossOrigin(origins = "*")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<DepartmentVM> list() {
        return departmentService.list();
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<DepartmentVM> one(@PathVariable("documentId") String documentId) {
        DepartmentVM vm = departmentService.one(documentId);
        return ResponseEntity.ok(vm);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody DepartmentReq req) {
        Object created = departmentService.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(@PathVariable("documentId") String documentId,
                                    @RequestBody DepartmentReq req) {
        Object updated = departmentService.update(documentId, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable("documentId") String documentId) {
        departmentService.delete(documentId);
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
