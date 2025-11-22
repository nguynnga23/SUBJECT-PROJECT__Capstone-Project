package com.backend.service;

import com.backend.strapi.vm.ArticleVM;
import com.backend.dto.response.SearchResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.stereotype.Service;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.JsonData;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class RagService {

    private static final String EMBEDDING_INDEX = "article_embeddings";
    private static final int TOP_K = 3;

    private final ElasticsearchClient elasticsearchClient;
    private final EmbeddingModel embeddingModel;
    private final ChatClient chatClient;
    private final ArticleService articleService;   // <-- dùng service, không dùng controller

    public RagService(ElasticsearchClient elasticsearchClient,
                      EmbeddingModel embeddingModel,
                      ChatClient chatClient,
                      ArticleService articleService) {
        this.elasticsearchClient = elasticsearchClient;
        this.embeddingModel = embeddingModel;
        this.chatClient = chatClient;
        this.articleService = articleService;
    }

    public SearchResponse answerQuery(String query) throws IOException {
        float[] embeddingArray =
                this.embeddingModel.embed(Collections.singletonList(query)).get(0);

        List<Float> queryEmbedding = IntStream.range(0, embeddingArray.length)
                .mapToObj(i -> embeddingArray[i])
                .collect(Collectors.toList());

        Query knnQuery = Query.of(q -> q
                .knn(k -> k
                        .field("embedding")
                        .queryVector(queryEmbedding)
                        .numCandidates(100)
                )
        );

        SearchRequest searchRequest = SearchRequest.of(s -> s
                .index(EMBEDDING_INDEX)
                .query(knnQuery)
                .size(TOP_K)
                .source(sc -> sc.filter(f -> f.excludes("embedding")))
        );

        co.elastic.clients.elasticsearch.core.SearchResponse<JsonData> searchResponse =
                elasticsearchClient.search(searchRequest, JsonData.class);

        List<ArticleVM> sources = searchResponse.hits().hits().stream()
                .map(Hit::source)
                .map(source -> source.toJson().asJsonObject().getString("article_id"))
                .map(articleService::one)      // <-- gọi qua ArticleService
                .collect(Collectors.toList());

        String context = sources.stream()
                .map(s -> String.format("Nguồn [%s]: %s%n",
                        s.getDocumentId(), s.getContent()))
                .collect(Collectors.joining("\n---\n"));

        String prompt = String.format("""
            Bạn là một Trợ lý Thông minh, đáng tin cậy, chuyên cung cấp thông tin về Đại học Công nghiệp TP. HCM.
            
            NGUYÊN TẮC VÀ HƯỚNG DẪN:
            1. Tính Chính xác: Bắt buộc chỉ sử dụng thông tin có trong phần [Context] BÊN DƯỚI.
            2. Giọng văn: Sử dụng giọng văn chuyên nghiệp, lịch sự, và tiếng Việt chuẩn.
            3. Xử lý thiếu Context: Nếu câu trả lời không thể được xác định từ [Context], hãy trả lời: "Tôi không tìm thấy thông tin cụ thể trong các tài liệu hiện có."
            
            [Context]:
            %s
            
            [Câu hỏi của người dùng]: %s
            """, context, query);

        String aiResponse = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        return new SearchResponse(aiResponse, sources);
    }
}
