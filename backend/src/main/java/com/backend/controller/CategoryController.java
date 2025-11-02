package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.CategoryReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.ArticleFlat;
import com.backend.strapi.model.CategoryFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.ArticleVM;
import com.backend.strapi.vm.CategoryVM;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;

import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/v1/categories")
@Slf4j
@CrossOrigin(origins = "*")
public class CategoryController {
    private final StrapiClient strapiClient;

    public CategoryController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @GetMapping
    public List<CategoryVM> list() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department_source");
        var raw = strapiClient.get(
                "/categories",
                new ParameterizedTypeReference<StrapiPageFlat<CategoryFlat>>() {
                },
                p,
                null);

        var data = (raw != null && raw.data() != null) ? raw.data() : List.<CategoryFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();

    }

    @GetMapping("/{documentId}")
    public CategoryVM one(@PathVariable("documentId") String documentId) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department_source");
        var resp = strapiClient.get(
                "/categories/" + documentId,
                new ParameterizedTypeReference<StrapiSingle<CategoryFlat>>() {
                },
                p,
                null);

        StrapiMapper strapiMapper = new StrapiMapper();
        return strapiMapper.toVM(resp.data());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CategoryReq req) {
        try {
            var data = new java.util.HashMap<String, Object>();
            if (req.category_name() != null) data.put("category_name", req.category_name());
            if (req.category_url() != null) data.put("category_url", req.category_url());
            if (req.key_category() != null) data.put("key_category", req.key_category());
            if (req.last_external_publish_date() != null) {
                var date = req.last_external_publish_date().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                , date);
            }

            if (req.department_source_id() != null && !req.department_source_id().isBlank()) {
                data.put("department_source", java.util.Map.of("connect", java.util.List.of(req.department_source_id())));
            }

            var body = java.util.Map.of("data", data);

            var created = strapiClient.postJson(
                    "/categories",
                    body,
                    new org.springframework.core.ParameterizedTypeReference<com.backend.strapi.model.StrapiSingle<com.backend.strapi.model.CategoryFlat>>() {},
                    null
            );

            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(created);

        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Create category failed", ex);
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to create category"));
        }
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(@PathVariable("documentId") String documentId, @RequestBody CategoryReq req) {
        try {
            var data = new java.util.HashMap<String, Object>();
            if (req.category_name() != null) data.put("category_name", req.category_name());
            if (req.category_url() != null) data.put("category_url", req.category_url());
            if (req.key_category() != null) data.put("key_category", req.key_category());
            if (req.last_external_publish_date() != null) {
                var date = req.last_external_publish_date().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                data.put("last_external_publish_date", date);
            }

            if (req.department_source_id() != null && !req.department_source_id().isBlank()) {
                data.put("department_source", java.util.Map.of("connect", java.util.List.of(req.department_source_id())));
            }

            var body = java.util.Map.of("data", data);

            var updated = strapiClient.putJson(
                    "/categories/" + documentId,
                    body,
                    new org.springframework.core.ParameterizedTypeReference<com.backend.strapi.model.StrapiSingle<com.backend.strapi.model.CategoryFlat>>() {},
                    null
            );

            return org.springframework.http.ResponseEntity.ok(updated);

        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Update category failed", ex);
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to update category"));
        }
    }

    // ========================== DELETE ==========================
    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable("documentId") String documentId) {
        try {
            strapiClient.delete("/categories/" + documentId, null);
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of("ok", true));
        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Delete category failed", ex);
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to delete category"));
        }
    }


}
