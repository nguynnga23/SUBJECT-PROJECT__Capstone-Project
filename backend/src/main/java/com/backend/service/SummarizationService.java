package com.backend.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SummarizationService {

    private final ChatModel chatModel;
    // Sử dụng TokenTextSplitter để đảm bảo nội dung phù hợp với Context Window
    private final TokenTextSplitter splitter = new TokenTextSplitter();

    public SummarizationService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    /**
     * Thực hiện tóm tắt tức thì (On-the-fly) cho văn bản thô mới.
     */
    public String summarizeImmediate(String rawContent, String topic) {
        if (rawContent == null || rawContent.trim().isEmpty()) {
            return "Nội dung cần tóm tắt không được để trống.";
        }

        // 1. Chunking: Chia nhỏ nội dung thô (để fit Context Window)
        List<Document> documents = List.of(new Document(rawContent));
        List<Document> chunks = splitter.transform(documents);

        // Nối tất cả chunks lại thành ngữ cảnh
        String contextText = chunks.stream()
                .map(Document::getFormattedContent)
                .collect(Collectors.joining("\n---\n"));

        // 2. Generation: Prompt Tóm tắt
        String promptContent = String.format("""
            Bạn là chuyên gia tóm tắt. Hãy tóm tắt nội dung sau một cách GỌN GÀNG, SÚC TÍCH, và CHỈ tập trung vào chủ đề: **%s**.

            NGỮ CẢNH ĐỂ TÓM TẮT:
            ---
            %s
            ---
        """, topic, contextText);

        // Tạo Prompt và gọi ChatModel
        Prompt prompt = new Prompt(new UserMessage(promptContent));
        return chatModel.call(prompt).getResult().getOutput().getText();
    }
}