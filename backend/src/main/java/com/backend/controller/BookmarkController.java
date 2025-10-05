package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.request.BookmarkReq;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.BookmarkFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.BookmarkVM;
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
    public ResponseEntity<?> create(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody BookmarkReq req
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");

            Map<String, Object> data = new HashMap<>();
            data.put("user", Map.of("connect", List.of(req.userId())));
            data.put("article", Map.of("connect", List.of(req.articleId())));
            Map<String, Object> body = Map.of("data", data);

            var created = strapiClient.postJson(
                    "/bookmarks",
                    body,
                    new ParameterizedTypeReference<StrapiSingle<BookmarkFlat>>() {},
                    token
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(created);

        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", safeExtractStrapiMessage(e.getResponseBodyAsString())));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to create bookmark"));
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable String id
    ) {
        try {

            // Gọi Strapi API xoá
            strapiClient.delete(
                    "/bookmarks/" + id,
                    null
            );

            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "message", "Bookmark deleted successfully"
            ));

        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getRawStatusCode())
                    .body(Map.of("ok", false, "message", safeExtractStrapiMessage(e.getResponseBodyAsString())));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "message", "Failed to delete bookmark"));
        }
    }

}
