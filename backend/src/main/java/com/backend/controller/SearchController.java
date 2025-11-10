package com.backend.controller;

import com.backend.dto.request.SearchRequest;
import com.backend.dto.response.SearchResponse;
import com.backend.service.RagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/v1/search")
public class SearchController {

    private final RagService ragService;

    // Giả sử ArticleController là service để gọi Strapi/CMS (Mock)
    private final ArticleController articleController;

    @Autowired
    public SearchController(RagService ragService, ArticleController articleController) {
        this.ragService = ragService;
        this.articleController = articleController;
    }


    @PostMapping("/query")
    public ResponseEntity<SearchResponse> search(@RequestBody SearchRequest request) {
        if (request == null || request.getQuery() == null || request.getQuery().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            SearchResponse response = ragService.answerQuery(request.getQuery());
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            System.err.println("Error during Elasticsearch search: " + e.getMessage());
            return ResponseEntity.status(500).build();
        } catch (Exception e) {
            System.err.println("Unexpected error in search query: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/articles/{articleId}")
    public ResponseEntity<?> getArticle(@PathVariable String articleId) {
        return ResponseEntity.ok(articleController.one(articleId));
    }
}