package com.backend.service;

import com.backend.entity.DocumentChunk;
import com.backend.repository.DocumentChunkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final DocumentChunkRepository repository;

    public SearchService(DocumentChunkRepository repository) {
        this.repository = repository;
    }

    public List<DocumentChunk> searchFullText(String keyword) {
        return repository.searchByContent(keyword);
    }
}
