package com.backend.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiConfig {
    private final VertexAiGeminiChatModel geminiChatModel;

    public AiConfig(VertexAiGeminiChatModel geminiChatModel) {
        this.geminiChatModel = geminiChatModel;
    }

    @Bean
    public ChatClient chatClient() {
        return ChatClient.builder(geminiChatModel).build();
    }
}