package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.ArticleReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.*;
import com.backend.strapi.vm.ArticleVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/articles")
public class ArticleController {

    private final StrapiClient client;

    public ArticleController(StrapiClient client) {
        this.client = client;
    }

    @GetMapping("/count")
    public int countItems() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("pagination[page]", "1");
        p.add("pagination[pageSize]", "1");

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {
                },
                p,
                null);

        if (raw != null && raw.meta() != null && raw.meta().pagination() != null) {
            return (int) raw.meta().pagination().total();
        }

        return 0;
    }

    @GetMapping
    public List<ArticleVM> list(@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        var p = new LinkedMultiValueMap<String, String>();

        p.add("populate[category][populate]", "department_source");
        p.add("pagination[page]", String.valueOf(page));
        p.add("pagination[pageSize]", String.valueOf(pageSize));

        p.add("sort[0]", "external_publish_date:desc");
        p.add("sort[1]", "createdAt:desc");
        p.add("pagination[page]", String.valueOf(page));
        p.add("pagination[pageSize]", String.valueOf(pageSize));

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {
                },
                p,
                null);

        var data = (raw != null && raw.data() != null) ? raw.data() : List.<ArticleFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @GetMapping("/{id}")
    public ArticleVM one(@PathVariable("id") String id) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate[category][populate]", "department_source");
        var resp = client.get(
                "/articles/" + id,
                new ParameterizedTypeReference<StrapiSingle<ArticleFlat>>() {
                },
                p,
                null);

        StrapiMapper strapiMapper = new StrapiMapper();
        return strapiMapper.toVM(resp.data());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ArticleReq req) {
        try {
            var data = new java.util.HashMap<String, Object>();
            if (req.title() != null)
                data.put("title", req.title());
            if (req.content() != null)
                data.put("content", req.content());
            if (req.external_url() != null)
                data.put("external_url", req.external_url());
            if (req.summary() != null)
                data.put("summary", req.summary());
            if (req.thumbnail() != null)
                data.put("thumbnail", req.thumbnail());
            if (req.external_slug() != null)
                data.put("external_slug", req.external_slug());

            var body = java.util.Map.of("data", data);

            var created = client.postJson(
                    "/articles",
                    body,
                    new org.springframework.core.ParameterizedTypeReference<com.backend.strapi.model.StrapiSingle<com.backend.strapi.model.ArticleFlat>>() {
                    },
                    null);

            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.CREATED)
                    .body(created);

        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode())
                    .body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            return org.springframework.http.ResponseEntity
                    .status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to create article"));
        }
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(@PathVariable("documentId") String documentId, @RequestBody ArticleReq req) {
        try {
            var data = new java.util.HashMap<String, Object>();
            if (req.title() != null)
                data.put("title", req.title());
            if (req.content() != null)
                data.put("content", req.content());
            if (req.external_url() != null)
                data.put("external_url", req.external_url());
            if (req.summary() != null)
                data.put("summary", req.summary());
            if (req.thumbnail() != null)
                data.put("thumbnail", req.thumbnail());
            if (req.external_slug() != null)
                data.put("external_slug", req.external_slug());

            var body = java.util.Map.of("data", data);

            var updated = client.putJson(
                    "/articles/" + documentId,
                    body,
                    new org.springframework.core.ParameterizedTypeReference<com.backend.strapi.model.StrapiSingle<com.backend.strapi.model.ArticleFlat>>() {
                    },
                    null);

            return org.springframework.http.ResponseEntity.ok(updated);

        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode())
                    .body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            return org.springframework.http.ResponseEntity
                    .status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to update article"));
        }
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable("documentId") String documentId) {
        try {
            client.delete("/articles/" + documentId, null);
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of("ok", true));
        } catch (org.springframework.web.client.RestClientResponseException e) {
            return org.springframework.http.ResponseEntity.status(e.getRawStatusCode())
                    .body(e.getResponseBodyAsString());
        } catch (Exception ex) {
            return org.springframework.http.ResponseEntity
                    .status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("ok", false, "message", "Failed to delete article"));
        }
    }

}
