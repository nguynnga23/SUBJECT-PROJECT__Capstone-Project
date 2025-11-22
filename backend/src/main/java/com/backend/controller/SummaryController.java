package com.backend.controller;

import com.backend.service.SummaryService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/summary")
public class SummaryController {
    private final SummaryService summaryService;

    public SummaryController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    private record ArticleRequest(String articleContent) {}

    private record SummaryResponse(String summary) {}


    @PostMapping(value="/article", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SummaryResponse> summarize(@RequestBody ArticleRequest request) {

        if (request.articleContent() == null || request.articleContent().isBlank()) {
            return ResponseEntity.badRequest().body(new SummaryResponse("Content cannot be empty."));
        }

        try {
            String summary = summaryService.summarizeArticle(request.articleContent());

            return ResponseEntity.ok(new SummaryResponse(summary));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new SummaryResponse("Failed to summarize article: " + e.getMessage()));
        }
    }
}