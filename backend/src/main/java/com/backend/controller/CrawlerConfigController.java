package com.backend.controller;

import com.backend.dto.request.CrawlerConfigReq;
import com.backend.service.CrawlerConfigService;
import com.backend.strapi.vm.CrawlerConfigVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/crawler-configs")
@Slf4j
@CrossOrigin(origins = "*")
public class CrawlerConfigController {

    private final CrawlerConfigService crawlerConfigService;

    public CrawlerConfigController(CrawlerConfigService crawlerConfigService) {
        this.crawlerConfigService = crawlerConfigService;
    }

    @GetMapping
    public List<CrawlerConfigVM> list() {
        return crawlerConfigService.list();
    }

    @GetMapping("/{id}")
    public CrawlerConfigVM one(@PathVariable("id") String id) {
        return crawlerConfigService.one(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CrawlerConfigReq req) {
        Object created = crawlerConfigService.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<?> update(@PathVariable("documentId") String documentId,
                                    @RequestBody CrawlerConfigReq req) {
        Object updated = crawlerConfigService.update(documentId, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> delete(@PathVariable("documentId") String documentId) {
        crawlerConfigService.delete(documentId);
        return ResponseEntity.ok(java.util.Map.of("ok", true));
    }
}
