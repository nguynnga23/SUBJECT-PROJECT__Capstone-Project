package com.backend.service;

import com.backend.repository.DocumentChunkRepository;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WebhookService {

    private final VectorStore vectorStore;
    private final DocumentIngestionService documentIngestionService;
    public WebhookService(VectorStore vectorStore,
                          DocumentIngestionService documentIngestionService, DocumentChunkRepository chunkRepository) {
        this.vectorStore = vectorStore;
        this.documentIngestionService = documentIngestionService;
    }

    @SuppressWarnings("unchecked")
    public void processArticleWebhook(Map<String, Object> payload) {
        Map<String, Object> entry = (Map<String, Object>) payload.get("entry");
        System.out.println("entry: " + entry);
        if (entry == null) {
            throw new IllegalArgumentException("Missing 'entry' field in webhook payload");
        }

        String documentId = String.valueOf(entry.get("documentId"));
        String title      = String.valueOf(entry.getOrDefault("title", ""));
        String contentRaw = (String) entry.getOrDefault("content", "");
        String summary    = (String) entry.getOrDefault("summary", "");

        String externalUrl  = entry.get("external_url")        != null ? String.valueOf(entry.get("external_url"))        : null;
        String externalSlug = entry.get("external_slug")       != null ? String.valueOf(entry.get("external_slug"))       : null;
        String thumbnail    = entry.get("thumbnail")           != null ? String.valueOf(entry.get("thumbnail"))           : null;
        String publishDate  = entry.get("external_publish_date") != null ? String.valueOf(entry.get("external_publish_date")) : null;

        String createdAt    = entry.get("createdAt")  != null ? String.valueOf(entry.get("createdAt"))  : null;
        String updatedAt    = entry.get("updatedAt")  != null ? String.valueOf(entry.get("updatedAt"))  : null;
        String publishedAt  = entry.get("publishedAt")!= null ? String.valueOf(entry.get("publishedAt")): null;

        Object category = entry.get("category");


        String fileUrl = (String) entry.getOrDefault("fileUrl", null);
        if (fileUrl != null && fileUrl.toLowerCase(Locale.ROOT).endsWith(".pdf")) {
            int chunkCount = documentIngestionService.ingest(fileUrl);
            System.out.printf("PDF indexed (%s) with %d chunks.%n", documentId, chunkCount);
            return;
        }

        String text = (summary != null && !summary.isBlank()) ? summary : contentRaw;
        if (text == null || text.isBlank()) {
            System.out.printf("Skipped empty article: %s%n", documentId);
            return;
        }

        Map<String, Object> metadata = new HashMap<>();
        metadata.putAll(entry);
        metadata.put("title", title);
        metadata.put("documentId", documentId);

        if (externalUrl  != null) metadata.put("external_url", externalUrl);
        if (externalSlug != null) metadata.put("external_slug", externalSlug);
        if (thumbnail    != null) metadata.put("thumbnail", thumbnail);
        if (publishDate  != null) metadata.put("external_publish_date", publishDate);
        if (createdAt    != null) metadata.put("createdAt", createdAt);
        if (updatedAt    != null) metadata.put("updatedAt", updatedAt);
        if (publishedAt  != null) metadata.put("publishedAt", publishedAt);
        if (category     != null) metadata.put("category", category);

        Document doc = new Document(text, metadata);

        vectorStore.add(List.of(doc));

        System.out.printf("Indexed  entry '%s' (docId=%s).%n", title, documentId);
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
