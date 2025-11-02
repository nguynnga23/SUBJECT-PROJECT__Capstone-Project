package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.DepartmentSourceReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.CategoryFlat;
import com.backend.strapi.model.DepartmentSourceFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.DepartmentSourceVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientResponseException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/department-sources")
@Slf4j
@CrossOrigin(origins = "*")
public class DepartmentSourceController {
    private final StrapiClient client;

    public DepartmentSourceController(StrapiClient client) {
        this.client = client;
    }

    @GetMapping
    public List<DepartmentSourceVM> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize){
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department");
        p.add("populate", "crawler_config");
        p.add("populate", "categories");

        p.add("pagination[page]", String.valueOf(page));
        p.add("pagination[pageSize]", String.valueOf(pageSize));

        var raw = client.get("/department-sources", new ParameterizedTypeReference<StrapiPageFlat<DepartmentSourceFlat>>() {
        },
        p,
null);
        var data = (raw != null && raw.data() != null) ? raw.data() : List.<DepartmentSourceFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @GetMapping("/{documentId}")
    public DepartmentSourceVM get(@PathVariable("documentId") String documentId){
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department");
        p.add("populate", "crawler_config");
        p.add("populate", "categories");
        var resp = client.get(
                "/department-sources/" + documentId,
                new ParameterizedTypeReference<StrapiSingle<DepartmentSourceFlat>>() {
                },
                p,
                null);
        StrapiMapper strapiMapper = new StrapiMapper();
        return strapiMapper.toVM(resp.data());
    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody DepartmentSourceReq req
    ) {
        try {
//            String token = authHeader.replace("Bearer ", "");

            Map<String, Object> data = new HashMap<>();
            data.put("url", req.url());
            data.put("label", req.label());
            data.put("key_departmentSource", req.key_departmentSource());
            data.put("department", Map.of("connect", List.of(req.department_id())));

            Map<String, Object> body = Map.of("data", data);

            var created = client.postJson(
                    "/department-sources",
                    body,
                    new ParameterizedTypeReference<StrapiSingle<DepartmentSourceFlat>>() {},
                    null
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(created);

        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", e.getResponseBodyAsString()));
        } catch (Exception ex) {
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
            Map<String, Object> data = new HashMap<>();
            data.put("url", req.url());
            data.put("label", req.label());
            data.put("key_departmentSource", req.key_departmentSource());

            if (req.department_id() != null && !req.department_id().isBlank()) {
                data.put("department", Map.of("connect", List.of(req.department_id())));
            }

            Map<String, Object> body = Map.of("data", data);

            var updated = client.putJson(
                    "/department-sources/" + documentId,
                    body,
                    new ParameterizedTypeReference<StrapiSingle<DepartmentSourceFlat>>() {},
                    null
            );

            return ResponseEntity.ok(updated);

        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", e.getResponseBodyAsString()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to update department-source"));
        }
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(
            @PathVariable String documentId ){
        try {
            client.delete(
                    "/department-sources/" + documentId,
                    null
            );
            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "message", "Department Source deleted successfully"
            ));
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", e.getResponseBodyAsString()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to delete bookmark"));
        }
    }
}

