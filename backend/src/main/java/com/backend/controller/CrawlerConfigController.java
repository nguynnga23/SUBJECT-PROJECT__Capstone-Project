package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.CrawlerConfigReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.*;
import com.backend.strapi.vm.CrawlerConfigVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/crawler-configs")
@Slf4j
@CrossOrigin(origins = "*")
public class CrawlerConfigController {
    private final StrapiClient strapiClient;

    public CrawlerConfigController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @GetMapping
    public List<CrawlerConfigVM> list() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department_source");
        var raw = strapiClient.get(
                "/crawler-configs",
                new ParameterizedTypeReference<StrapiPageFlat<CrawlerConfigFlat>>() {
                },
                p,
                null
        );
        var data = (raw != null && raw.data() != null) ? raw.data() : List.<CrawlerConfigFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @GetMapping("/{id}")
    public CrawlerConfigVM one(@PathVariable("id") String id) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department_source");
        var resp = strapiClient.get(
                "/crawler-configs/" + id,
                new ParameterizedTypeReference<StrapiSingle<CrawlerConfigFlat>>() {
                },
                p,
                null);

        StrapiMapper strapiMapper = new StrapiMapper();
        return strapiMapper.toVM(resp.data());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody com.backend.dto.request.CrawlerConfigReq req) {
        try {
            var data = new java.util.HashMap<String, Object>();
            if (req.url() != null) data.put("url", req.url());
            if (req.relative_url_list() != null) data.put("relative_url_list", req.relative_url_list());
            if (req.relative_url() != null) data.put("relative_url", req.relative_url());
            if (req.thumbnail() != null) data.put("thumbnail", req.thumbnail());
            if (req.next_pages() != null) data.put("next_pages", req.next_pages());
            if (req.title() != null) data.put("title", req.title());
            if (req.content() != null) data.put("content", req.content());
            if (req.external_publish_date() != null) data.put("external_publish_date", req.external_publish_date());

            if (req.department_source_id() != null && !req.department_source_id().isBlank()) {
                data.put("department_source", java.util.Map.of("connect", java.util.List.of(req.department_source_id())));
            }

            var body = java.util.Map.of("data", data);

            var created = strapiClient.postJson(
                    "/crawler-configs",
                    body,
                    new org.springframework.core.ParameterizedTypeReference<com.backend.strapi.model.StrapiSingle<com.backend.strapi.model.CrawlerConfigFlat>>() {},
                    null // giữ nguyên như code cũ
            );
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(created);
        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Create crawler-config failed", ex);
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to create crawler-config"));
        }
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(@PathVariable("documentId") String documentId,
                                    @RequestBody CrawlerConfigReq req) {
        try {
            var data = new java.util.HashMap<String, Object>();
            if (req.url() != null) data.put("url", req.url());
            if (req.relative_url_list() != null) data.put("relative_url_list", req.relative_url_list());
            if (req.relative_url() != null) data.put("relative_url", req.relative_url());
            if (req.thumbnail() != null) data.put("thumbnail", req.thumbnail());
            if (req.next_pages() != null) data.put("next_pages", req.next_pages());
            if (req.title() != null) data.put("title", req.title());
            if (req.content() != null) data.put("content", req.content());
            if (req.external_publish_date() != null) data.put("external_publish_date", req.external_publish_date());

            if (req.department_source_id() != null && !req.department_source_id().isBlank()) {
                data.put("department_source", java.util.Map.of("connect", java.util.List.of(req.department_source_id())));
            }

            var body = java.util.Map.of("data", data);

            var updated = strapiClient.putJson(
                    "/crawler-configs/" + documentId,
                    body,
                    new org.springframework.core.ParameterizedTypeReference<com.backend.strapi.model.StrapiSingle<com.backend.strapi.model.CrawlerConfigFlat>>() {},
                    null
            );
            return org.springframework.http.ResponseEntity.ok(updated);
        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Update crawler-config failed", ex);
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to update crawler-config"));
        }
    }

    // ========================== DELETE ==========================
    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable("documentId") String documentId) {
        try {
            strapiClient.delete("/crawler-configs/" + documentId, null);
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of("ok", true));
        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            log.error("Delete crawler-config failed", ex);
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to delete crawler-config"));
        }
    }

}
