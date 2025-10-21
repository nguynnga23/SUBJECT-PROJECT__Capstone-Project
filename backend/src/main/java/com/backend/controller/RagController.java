package com.backend.controller;

import com.backend.dto.request.RagRequest;
import com.backend.service.DocumentIngestionService;
import com.backend.service.RagService;
import com.backend.service.SummarizationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/rag")
public class RagController {

    private final DocumentIngestionService ingestionService;
    private final RagService ragService;
    private final SummarizationService summarizationService;

    // Autowire các Service
    public RagController(
            DocumentIngestionService ingestionService,
            RagService ragService,
            SummarizationService summarizationService) {

        this.ingestionService = ingestionService;
        this.ragService = ragService;
        this.summarizationService = summarizationService;
    }

    // --- API 1: NẠP DỮ LIỆU (INGESTION) ---
    // Endpoint: POST /api/rag/ingest
    @PostMapping("/ingest")
    public ResponseEntity<String> ingestDocument(@RequestBody RagRequest request) {
        String source = request.getContentSource();
        if (source == null || source.trim().isEmpty()) {
            return new ResponseEntity<>("Lỗi: 'contentSource' không được để trống (cần text hoặc đường dẫn PDF).", HttpStatus.BAD_REQUEST);
        }

        try {
            int chunkCount = ingestionService.ingest(source);
            if (chunkCount == 0) {
                return new ResponseEntity<>("Nạp dữ liệu không thành công. Vui lòng kiểm tra log backend.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(
                    String.format("Thành công! Đã xử lý và nạp %d chunks vào Elasticsearch (Index: news).", chunkCount),
                    HttpStatus.OK);
        } catch (Exception e) {
            // Xử lý các lỗi ngoại lệ không lường trước (ví dụ: lỗi kết nối Ollama/Elasticsearch)
            return new ResponseEntity<>("Lỗi trong quá trình nạp dữ liệu: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // --- API 2: TÌM KIẾM / HỎI-ĐÁP (QUERY/RAG) ---
    // Endpoint: POST /api/rag/query
    @PostMapping("/query")
    public ResponseEntity<String> answerQuestion(@RequestBody RagRequest request) {
        String query = request.getQuery();
        if (query == null || query.trim().isEmpty()) {
            return new ResponseEntity<>("Lỗi: 'query' không được để trống.", HttpStatus.BAD_REQUEST);
        }

        try {
            String answer = ragService.answerQuestion(query);
            return new ResponseEntity<>(answer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi trong quá trình truy vấn RAG: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // --- API 3: TÓM TẮT TỨC THÌ (ON-THE-FLY SUMMARIZATION) ---
    // Endpoint: POST /api/rag/summarize
    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeArticle(@RequestBody RagRequest request) {
        String content = request.getContentSource();
        if (content == null || content.trim().isEmpty()) {
            return new ResponseEntity<>("Lỗi: 'contentSource' không được để trống (cần nội dung thô để tóm tắt).", HttpStatus.BAD_REQUEST);
        }

        // Nếu topic không được cung cấp, sử dụng giá trị mặc định
        String topic = request.getTopic();
        if (topic == null || topic.trim().isEmpty()) {
            topic = "Tóm tắt toàn bộ nội dung";
        }

        try {
            String summary = summarizationService.summarizeImmediate(content, topic);
            return new ResponseEntity<>(summary, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi trong quá trình tóm tắt tức thì: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}