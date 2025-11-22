package com.backend.exception;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ✅ Strapi trả về lỗi 4xx/5xx
    @ExceptionHandler(RestClientResponseException.class)
    public ResponseEntity<?> handleStrapiError(RestClientResponseException ex) {
        log.error("❌ Strapi error {}: {}", ex.getRawStatusCode(), ex.getResponseBodyAsString());

        String message = extractStrapiMessage(ex.getResponseBodyAsString());
        int status = ex.getRawStatusCode();

        return ResponseEntity
                .status(status)
                .body(Map.of(
                        "ok", false,
                        "code", "STRAPI_" + status,
                        "message", message
                ));
    }

    // ✅ Lỗi network hoặc Strapi không phản hồi
    @ExceptionHandler(RestClientException.class)
    public ResponseEntity<?> handleRestClientException(RestClientException ex) {
        log.error("🌐 Strapi connection failed", ex);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("ok", false, "message", "Strapi unreachable or network error"));
    }

    // ✅ Lỗi JSON mapping / parse
    @ExceptionHandler(org.springframework.http.converter.HttpMessageConversionException.class)
    public ResponseEntity<?> handleJsonError(Exception ex) {
        log.error("⚠️ JSON mapping error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("ok", false, "message", "JSON mapping or conversion error"));
    }

    // ✅ Lỗi hệ thống khác
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericException(Exception ex) {
        log.error("🔥 Unexpected internal error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("ok", false, "message", "Internal Server Error"));
    }

    // 🧩 Helper – parse message từ Strapi error JSON
    private String extractStrapiMessage(String body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(body);
            if (root.has("error")) {
                return root.path("error").path("message").asText("Upstream error");
            }
            return root.path("message").asText("Upstream error");
        } catch (Exception ignore) {
            return "Upstream error";
        }
    }
}
