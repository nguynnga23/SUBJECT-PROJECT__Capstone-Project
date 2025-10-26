package com.backend.service;

import com.backend.entity.DocumentChunk;
import com.backend.repository.DocumentChunkRepository;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.DeleteQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;

import java.util.*;

@Service
public class WebhookService {

    private final VectorStore vectorStore;
    private final DocumentIngestionService documentIngestionService;
    private final ElasticsearchOperations operations;
    private final DocumentChunkRepository chunkRepository;
    private final IndexCoordinates index;
    public WebhookService(VectorStore vectorStore,
                          DocumentIngestionService documentIngestionService, ElasticsearchOperations operations, DocumentChunkRepository chunkRepository, @Value("${spring.ai.vectorstore.elasticsearch.index-name:vectorstore}") String indexName) {
        this.vectorStore = vectorStore;
        this.documentIngestionService = documentIngestionService;
        this.operations = operations;
        this.chunkRepository = chunkRepository;
        this.index = IndexCoordinates.of(indexName);
    }

    @SuppressWarnings("unchecked")
    public void processArticleWebhook(Map<String, Object> entry) {
        String documentId = (String) entry.get("documentId");
        String title      = (String) entry.get("title");
        String summary    = (String) entry.getOrDefault("summary", "");
        String content    = (String) entry.getOrDefault("content", "");
        String externalUrl= (String) entry.getOrDefault("external_url", "");
        String thumbnail  = (String) entry.getOrDefault("thumbnail", "");
        String slug       = (String) entry.getOrDefault("external_slug", "");
        Object publishObj = entry.get("external_publish_date");
        String publishDate= publishObj == null ? "" : String.valueOf(publishObj);

        String text = (summary != null && !summary.isBlank()) ? summary : content;
        if (documentId == null || title == null || text == null || text.isBlank()) {
            System.out.printf("Skipped empty/malformed article. documentId=%s, title=%s%n", documentId, title);
            return;
        }

        // 3) Flatten category
        Map<String, Object> cat = (Map<String, Object>) entry.get("category");
        String categoryName = cat == null ? "" : String.valueOf(cat.getOrDefault("category_name", ""));
        String categoryKey  = cat == null ? "" : String.valueOf(cat.getOrDefault("key_category", ""));

        String pdfUrl = extractPdfFromMarkdown(content); // định nghĩa bên dưới

        // 5) Xây metadata an toàn (tránh null)
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("documentId", documentId);
        metadata.put("title", title);
        if (!categoryName.isBlank()) metadata.put("category", categoryName);
        if (!categoryKey.isBlank())  metadata.put("categoryKey", categoryKey);
        if (!publishDate.isBlank())  metadata.put("externalPublishDate", publishDate);
        if (!externalUrl.isBlank())  metadata.put("source", externalUrl);
        if (!thumbnail.isBlank())    metadata.put("thumbnail", thumbnail);
        if (!slug.isBlank())         metadata.put("slug", slug);
        if (pdfUrl != null)          metadata.put("fileUrl", pdfUrl);

        // 6) Upsert theo documentId để chống trùng
        Document doc = new Document(text, metadata);

        // 7) Thêm vào vector store (để Spring AI tự embed + index ES)
        vectorStore.add(List.of(doc));

        System.out.printf("Article indexed successfully: %s%n", title);
    }

    private String extractPdfFromMarkdown(String md) {
        if (md == null || md.isBlank()) return null;
        // [text](https://.../file.pdf?token=abc)
        var m = java.util.regex.Pattern
                .compile("\\((https?[^)]+\\.pdf[^)]*)\\)", java.util.regex.Pattern.CASE_INSENSITIVE)
                .matcher(md);
        if (m.find()) return m.group(1).trim();
        // fallback plain text: https://...pdf
        m = java.util.regex.Pattern
                .compile("(https?://\\S+?\\.pdf\\S*)", java.util.regex.Pattern.CASE_INSENSITIVE)
                .matcher(md);
        return m.find() ? m.group(1).trim() : null;
    }
}
