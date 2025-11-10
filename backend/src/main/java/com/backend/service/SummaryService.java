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
           Tóm tắt toàn bộ nội dung BÊN DƯỚI.
           
           HƯỚNG DẪN ĐẦU RA:
           1. Độ dài: Tối đa **5 câu** hoàn chỉnh.
           2. Cấu trúc: Phải là **MỘT ĐOẠN VĂN DUY NHẤT** (không xuống dòng, không chia đoạn).
           3. Định dạng: Tuyệt đối không sử dụng dấu liệt kê, tiêu đề, hoặc ký tự đặc biệt như *, #, -, v.v.
           4. Nội dung: Phải truyền tải **đầy đủ và chính xác** các sự kiện cốt lõi.
           5. Giọng văn: Sử dụng ngôn ngữ trôi chảy và chuyên nghiệp.
        
           Nội dung gốc cần tóm tắt:
           ---
           %s
           ---
           Đoạn tóm tắt:
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