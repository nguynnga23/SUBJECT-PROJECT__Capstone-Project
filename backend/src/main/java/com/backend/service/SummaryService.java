package com.backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class SummaryService {
    private final ChatClient chatClient;

    public SummaryService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String summarizeArticle(String articleContent) {
        String cleanedContent = cleanAndNormalizeContent(articleContent);

        String promptTemplate = """
           Tóm tắt toàn bộ nội dung sau thành MỘT (1) đoạn văn duy nhất, HOÀN CHỈNH, không sử dụng dấu liệt kê, tiêu đề hay các ký tự đặc biệt như *. 
           Đoạn văn này không được dài quá 5 câu.
           Nội dung gốc:
           ---
           %s
           ---
            """;

        String finalPrompt = String.format(promptTemplate, cleanedContent);
        System.out.println(finalPrompt);

        String summary = chatClient.prompt()
                .user(finalPrompt)
                .call()
                .content();

        return summary;
    }

    private String cleanAndNormalizeContent(String rawContent) {
        if (rawContent == null || rawContent.isBlank()) {
            return "";
        }

        String cleaned = rawContent;
        cleaned = cleaned.replaceAll("[\\*\\_]", "");
        cleaned = cleaned.replaceAll("\\[([^\\[\\]]*)\\]\\(.*?\\)", "$1");
        cleaned = cleaned.replaceAll("(?m)^\\s*[-•]\\s*", ". ");
        cleaned = cleaned.replaceAll("[\\n\\r]", " ");
        cleaned = cleaned.replaceAll("#\\w+", "");
        cleaned = cleaned.replaceAll("\\s{2,}", " ");
        return cleaned.trim();
    }
}