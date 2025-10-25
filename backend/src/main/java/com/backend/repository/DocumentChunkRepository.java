package com.backend.repository;

import com.backend.entity.DocumentChunk;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentChunkRepository extends ElasticsearchRepository<DocumentChunk, String> {
    @Query("""
        {
          "multi_match": {
            "query": "?0",
            "fields": ["metadata.title^3", "content"]
          }
        }
        """)
    List<DocumentChunk> searchByContent(String keyword);
}