package com.backend.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RagService {

    private final VectorStore vectorStore;
    private final ChatModel chatModel;

    // Hướng dẫn hệ thống dành riêng cho Gemini
    private static final String SYSTEM_INSTRUCTION =
            "Bạn là trợ lý RAG. Hãy trả lời câu hỏi của người dùng một cách chính xác VÀ CHỈ DỰA TRÊN ngữ cảnh được cung cấp. Nếu ngữ cảnh không đủ để trả lời, hãy nói rằng bạn không có thông tin.";

    public RagService(VectorStore vectorStore, ChatModel chatModel) {
        this.vectorStore = vectorStore;
        this.chatModel = chatModel;
    }

    /**
     * Thực hiện truy hồi (RAG) để trả lời câu hỏi dựa trên ngữ cảnh từ VectorStore.
     */
    public String answerQuestion(String question) {
        if (question == null || question.trim().isEmpty()) {
            return "Vui lòng cung cấp câu hỏi.";
        }

        // 1. Retrieval: Tìm kiếm 5 chunks liên quan nhất từ Elasticsearch
        List<Document> context = vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query(question)
                        .topK(5) // Số lượng chunks đã được tối ưu hóa
                        .build()
        );

        if (context.isEmpty()) {
            return "Xin lỗi, tôi không tìm thấy thông tin liên quan trong cơ sở dữ liệu để trả lời câu hỏi này.";
        }

        // Tạo chuỗi ngữ cảnh, bao gồm cả Metadata (để dễ debug)
        String contextText = context.stream()
                .map(doc -> String.format("--- Nguồn (Trang %s, File: %s)\n%s",
                        doc.getMetadata().getOrDefault("page_number", "N/A"),
                        doc.getMetadata().getOrDefault("file_name", "N/A"),
                        doc.getFormattedContent()))
                .collect(Collectors.joining("\n\n")); // Phân tách rõ ràng

        // 2. Generation: Xây dựng Prompt RAG sử dụng SystemMessage
        List<org.springframework.ai.chat.messages.Message> messages = new ArrayList<>();

        // a) SystemMessage: Định nghĩa vai trò cho Gemini
        messages.add(new SystemMessage(SYSTEM_INSTRUCTION));

        // b) UserMessage: Truyền ngữ cảnh và câu hỏi
        String userPrompt = String.format("""
            NGỮ CẢNH ĐỂ TRẢ LỜI:
            %s
            
            CÂU HỎI: %s
        """, contextText, question);

        messages.add(new UserMessage(userPrompt));

        // 3. Gọi ChatModel
        Prompt prompt = new Prompt(messages);
        return chatModel.call(prompt).getResult().getOutput().getText();
    }
}