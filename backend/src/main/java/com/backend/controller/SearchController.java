package com.backend.controller;

import com.backend.entity.DocumentChunk;
import com.backend.service.SearchService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.vm.ArticleVM;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/v1/search")
public class SearchController {

    private final SearchService searchService;
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public List<ArticleVM> searchFullText(String q) {
        return searchService.searchFullText(q).stream()
                .map(StrapiMapper::fromDocumentChunk)
                .toList();
    }
}
