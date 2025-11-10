package com.backend.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.TokenCountBatchingStrategy;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;


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

//    @Bean
//    public RestClient elasticsearchClient()  {
//        RestClient restClient = RestClient.builder(
//                HttpHost.create("http://localhost:9200")
//        ).build();
//        return restClient;
//    }
//    @Bean
//    public VectorStore vectorStore(RestClient esClient, EmbeddingModel embeddingModel) {
//        ElasticsearchVectorStoreOptions options = new ElasticsearchVectorStoreOptions();
//        options.setIndexName("spring-ai-document-index");
//        options.setSimilarity(cosine);
//        options.setDimensions(768);
//
//        ElasticsearchVectorStore vectorStore = ElasticsearchVectorStore.builder(esClient, embeddingModel)
//                .options(options)
//                .initializeSchema(true)
//                .batchingStrategy(new TokenCountBatchingStrategy())
//                .build();
//        return vectorStore;
//    }
}