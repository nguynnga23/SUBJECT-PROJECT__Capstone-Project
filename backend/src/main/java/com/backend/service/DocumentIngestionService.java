package com.backend.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Collections;
import java.util.List;

@Service
public class DocumentIngestionService {

    private static final Logger logger = LoggerFactory.getLogger(DocumentIngestionService.class);

    private final VectorStore vectorStore;
    private final TokenTextSplitter splitter = new TokenTextSplitter();

    public DocumentIngestionService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    /**
     * Tải nội dung, chia nhỏ, nhúng (Ollama) và lưu vector (Elasticsearch).
     * @param contentSource Nội dung thô HOẶC đường dẫn URL (Strapi) HOẶC đường dẫn tuyệt đối/tương đối đến tệp PDF cục bộ.
     * @return Số lượng chunks đã được nạp thành công.
     */
    public int ingest(String contentSource) {
        List<Document> rawDocuments = loadContent(contentSource);

        if (rawDocuments.isEmpty()) {
            return 0; // Lỗi đã được log trong loadContent
        }

        List<Document> chunks = splitter.transform(rawDocuments);

        // ⚠️ LOGIC SỬA ĐỔI: Thêm khối try-catch để bắt lỗi VectorStore/Embedding
        try {
            // 2. Embedding & Storing (Elasticsearch)
            vectorStore.add(chunks);

            logger.info("Hoàn tất nạp dữ liệu từ nguồn: {}. Đã nạp thành công {} chunks.", contentSource, chunks.size());
            return chunks.size();
        } catch (Exception e) {
            // Bắt lỗi khi nhúng (Ollama) hoặc lưu trữ (Elasticsearch)
            logger.error("LỖI QUAN TRỌNG: Quá trình nhúng và lưu trữ vector thất bại cho nguồn: {}", contentSource, e);
            // Vẫn trả về 0 để thông báo cho Controller rằng quá trình thất bại
            return 0;
        }
    }

    /**
     * Logic đọc nội dung từ nhiều nguồn (PDF từ File System/URL hoặc Raw Text)
     */
    private List<Document> loadContent(String source) {
        // ... (Giữ nguyên logic của loadContent, vì nó đã được sửa lỗi) ...
        if (source == null || source.trim().isEmpty()) {
            logger.warn("Nguồn nội dung (source) rỗng. Không có gì để nạp.");
            return Collections.emptyList();
        }

        // 1. KIỂM TRA NẾU LÀ URL (Từ Strapi hoặc bất kỳ dịch vụ web nào)
        if (source.toLowerCase().startsWith("http://") || source.toLowerCase().startsWith("https://")) {
            logger.info("Đang cố gắng đọc tệp PDF từ URL: {}", source);
            try {
                UrlResource urlResource = new UrlResource(source);
                return new PagePdfDocumentReader(urlResource).get();
            } catch (MalformedURLException e) {
                logger.error("LỖI ĐỌC NGUỒN: URL nguồn không hợp lệ: {}. Chi tiết lỗi: {}", source, e.getMessage());
                return Collections.emptyList();
            } catch (IOException e) {
                logger.error("LỖI ĐỌC NGUỒN: Lỗi khi tải xuống hoặc đọc tệp PDF từ URL {}: {}", source, e.getMessage());
                return Collections.emptyList();
            }
        }

        // 2. KIỂM TRA NẾU LÀ ĐƯỜNG DẪN TỆP CỤC BỘ VÀ KẾT THÚC BẰNG .PDF
        if (source.toLowerCase().endsWith(".pdf")) {
            File file = new File(source);

            if (!file.exists()) {
                logger.error("LỖI ĐỌC NGUỒN: Không tìm thấy tệp PDF tại đường dẫn cục bộ: {}", source);
                return Collections.emptyList();
            }

            try {
                String pdfUri = file.toURI().toString();
                return new PagePdfDocumentReader(pdfUri).get();

            } catch (Exception e) {
                logger.error("LỖI ĐỌC NGUỒN: Lỗi khi đọc tệp PDF cục bộ từ {}: {}", source, e.getMessage());
                logger.error("Chi tiết lỗi:", e);
                return Collections.emptyList();
            }
        }

        // 3. XỬ LÝ NỘI DUNG DẠNG VĂN BẢN THÔ (Fallback)
        logger.info("Đang xử lý nội dung dạng văn bản thô.");
        return List.of(new Document(source));
    }
}