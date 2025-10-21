package com.backend.dto.request;

/**
 * Data Transfer Object (DTO) chung cho các yêu cầu RAG và Tóm tắt qua API.
 */
public class RagRequest {

    // Dùng cho API Ingest và Summarize: chứa nội dung thô HOẶC đường dẫn PDF/URL
    private String contentSource;

    // Dùng cho API Query: chứa câu hỏi tìm kiếm
    private String query;

    // Dùng cho API Summarize: chủ đề tóm tắt (ví dụ: "Chính sách học bổng")
    private String topic;

    // --- Constructors, Getters and Setters ---

    public RagRequest() {
    }

    // Constructor đầy đủ (nếu cần)
    public RagRequest(String contentSource, String query, String topic) {
        this.contentSource = contentSource;
        this.query = query;
        this.topic = topic;
    }

    public String getContentSource() {
        return contentSource;
    }

    public void setContentSource(String contentSource) {
        this.contentSource = contentSource;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}