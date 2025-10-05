package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.DepartmentReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.DepartmentFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.DepartmentVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientResponseException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/v1/departments")
@Slf4j
@CrossOrigin(origins = "*")
public class DepartmentController {
    private final StrapiClient strapiClient;
    public DepartmentController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }


    @GetMapping
    public List<DepartmentVM> list() {
        MultiValueMap<String, String> p = new LinkedMultiValueMap<>();
        var raw = strapiClient.get(
                "/departments",
                new ParameterizedTypeReference<StrapiPageFlat<DepartmentFlat>>() {},
                p,
                null
        );
        var data = (raw != null && raw.data() != null) ? raw.data() : List.<DepartmentFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<?> one(
            @PathVariable("documentId") String documentId
    ) {
        try {
            MultiValueMap<String, String> p = new LinkedMultiValueMap<>();

            var resp = strapiClient.get(
                    "/departments/" + documentId,
                    new ParameterizedTypeReference<StrapiSingle<DepartmentFlat>>() {},
                    p,
                    null
            );
            return ResponseEntity.ok(StrapiMapper.toVM(resp.data()));
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Get department failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to get department"));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody DepartmentReq req
            // @RequestHeader("Authorization") String authHeader // nếu cần token người dùng
    ) {
        try {
            Map<String, Object> data = new HashMap<>();
            if (req.department_name() != null) data.put("department_name", req.department_name());

            Map<String, Object> body = Map.of("data", data);

            var created = strapiClient.postJson(
                    "/departments",
                    body,
                    new ParameterizedTypeReference<StrapiSingle<DepartmentFlat>>() {},
                    null
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Create department failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to create department"));
        }
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(
            @PathVariable("documentId") String documentId,
            @RequestBody DepartmentReq req
            // @RequestHeader("Authorization") String authHeader
    ) {
        try {
            Map<String, Object> data = new HashMap<>();
            if (req.department_name() != null) data.put("department_name", req.department_name());

            Map<String, Object> body = Map.of("data", data);

            var updated = strapiClient.putJson(
                    "/departments/" + documentId,
                    body,
                    new ParameterizedTypeReference<StrapiSingle<DepartmentFlat>>() {},
                    null
            );

            return ResponseEntity.ok(updated);
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Update department failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to update department"));
        }
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(
            @PathVariable("documentId") String documentId
            // @RequestHeader("Authorization") String authHeader
    ) {
        try {
            strapiClient.delete(
                    "/departments/" + documentId,
                    null
            );
            return ResponseEntity.ok(Map.of("ok", true));
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Delete department failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to delete department"));
        }
    }
}
