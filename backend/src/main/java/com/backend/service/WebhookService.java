package com.backend.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class WebhookService {

    private final VectorStore vectorStore;
    private final DocumentIngestionService documentIngestionService;

    public WebhookService(VectorStore vectorStore,
                          DocumentIngestionService documentIngestionService) {
        this.vectorStore = vectorStore;
        this.documentIngestionService = documentIngestionService;
    }

    @SuppressWarnings("unchecked")
    public void processArticleWebhook(Map<String, Object> payload) {
        Map<String, Object> entry = (Map<String, Object>) payload.get("entry");
        if (entry == null) {
            throw new IllegalArgumentException("Missing 'entry' field in webhook payload");
        }

        String documentId = (String) entry.get("documentId");
        String title = (String) entry.get("title");
        String summary = (String) entry.getOrDefault("summary", "");
        String content = (String) entry.getOrDefault("content", "");
        String fileUrl = (String) entry.get("fileUrl");

        // 1) Nếu có PDF: nạp PDF -> tách trang/chunk -> vectorStore.add(...) bên trong service
        if (fileUrl != null && fileUrl.toLowerCase(Locale.ROOT).endsWith(".pdf")) {
            int chunkCount = documentIngestionService.ingest(fileUrl);
            System.out.printf("PDF indexed (%s) with %d chunks.%n", documentId, chunkCount);
            return;
        }

        // 2) Nếu là bài viết text: để VectorStore tự embed khi add()
        String text = (summary != null && !summary.isBlank()) ? summary : content;
        if (text == null || text.isBlank()) {
            System.out.printf("Skipped empty article: %s%n", documentId);
            return;
        }

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("documentId", documentId);
        metadata.put("title", title);
        if (entry.get("category") != null) metadata.put("category", entry.get("category"));
        if (entry.get("department") != null) metadata.put("department", entry.get("department"));
        if (entry.get("externalPublishDate") != null) metadata.put("externalPublishDate", entry.get("externalPublishDate"));
        if (entry.get("externalUrl") != null) metadata.put("source", entry.get("externalUrl"));

        Document doc = new Document(text, metadata);

        vectorStore.add(List.of(doc));

        System.out.printf("Article indexed successfully: %s%n", title);
    }
}
