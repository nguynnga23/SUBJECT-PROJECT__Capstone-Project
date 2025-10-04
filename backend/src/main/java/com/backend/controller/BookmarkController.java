package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.BookmarkReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.BookmarkFlat;
import com.backend.strapi.model.CategoryFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.BookmarkVM;
import jakarta.validation.Valid;
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
import java.util.Objects;

@RestController
@RequestMapping("/v1/bookmarks")
@Slf4j
@CrossOrigin(origins = "*")
public class BookmarkController {
    private final StrapiClient strapiClient;
    public BookmarkController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @GetMapping
    public List<BookmarkVM> list() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "user");
        p.add("populate", "article");
        var raw = strapiClient.get(
                "/bookmarks", new ParameterizedTypeReference<StrapiPageFlat<BookmarkFlat>>() {
                },
                p,
                null);
        var data = (raw != null && raw.data() != null) ? raw.data() : List.<BookmarkFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody BookmarkReq req) {
        // Validate đầu vào
        if (req.userId() == null || req.userId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "message", "userDocumentId is required"));
        }
        if (req.articleId() == null || req.articleId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("ok", false, "message", "articleDocumentId is required"));
        }

        try {
            // 1) Body đúng cú pháp Strapi v5 (connect bằng documentId)
            Map<String, Object> data = new HashMap<>();
            data.put("user", Map.of("connect", java.util.List.of(req.userId())));
            data.put("article", Map.of("connect", java.util.List.of(req.articleId())));
            Map<String, Object> body = Map.of("data", data);

            // 2) POST tạo (không kỳ vọng populate trong response)
            var created = strapiClient.postJson(
                    "/bookmarks",
                    body,
                    new ParameterizedTypeReference<StrapiSingle<BookmarkFlat>>() {},
                    null
            );
            var createdFlat = created != null ? created.data() : null;
            if (createdFlat == null || createdFlat.documentId() == null) {
                return ResponseEntity.status(502).body(Map.of("ok", false, "message", "Create bookmark: empty response"));
            }

            // 3) GET lại với populate để tránh NPE khi map
            var params = new org.springframework.util.LinkedMultiValueMap<String, String>();
            params.add("populate[user]", "true");
            params.add("populate[article]", "true");

            var full = strapiClient.get(
                    "/bookmarks/" + createdFlat.documentId(),
                    new ParameterizedTypeReference<StrapiSingle<BookmarkFlat>>() {},
                    params,
                    null
            );
            var flat = full != null ? full.data() : null;

            // 4) Mapper null-safe
            var vm = StrapiMapper.toVM(flat);
            return ResponseEntity.status(HttpStatus.CREATED).body(vm);

        } catch (RestClientResponseException e) {
            String msg = safeExtractStrapiMessage(e.getResponseBodyAsString());
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", msg != null ? msg : "Failed to create bookmark"));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("ok", false, "message", "Failed to create bookmark"));
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<?> getBookmarksByUser(
            @PathVariable("userId") String userId
    ) {
        try {
            var p = new LinkedMultiValueMap<String, String>();
            p.add("populate", "user");
            p.add("populate", "article");

            var type = new ParameterizedTypeReference<StrapiPageFlat<BookmarkFlat>>() {};
            var raw = strapiClient.get("/bookmarks", type, p, null);

            var data = (raw != null && raw.data() != null)
                    ? raw.data()
                    : List.<BookmarkFlat>of();

            var vms = data.stream()
                    .map(StrapiMapper::toVM)
                    .filter(Objects::nonNull)
                    .toList();

            return ResponseEntity.ok(vms);

        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false,
                            "message", safeExtractStrapiMessage(e.getResponseBodyAsString())));
        } catch (Exception ex) {
            return ResponseEntity.status(500)
                    .body(Map.of("ok", false, "message", "Failed to fetch bookmarks"));
        }
    }

    private String safeExtractStrapiMessage(String json) {
        try {
            return json;
        } catch (Exception ignore) {
            return null;
        }
    }
}
