package com.backend.controller;

import com.backend.config.WebhookSecret;
import com.backend.dto.response.ApiOk;
import com.backend.service.WebhookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhook")
public class StrapiWebhookController {

    private final WebhookService webhookService;
    private final WebhookSecret webhookSecret;

    public StrapiWebhookController(WebhookService webhookService, WebhookSecret webhookSecret) {
        this.webhookService = webhookService;
        this.webhookSecret = webhookSecret;
    }

    private boolean checkSecret(String header) {
        if (!webhookSecret.matches(header)) {
            System.err.println("Invalid or missing webhook secret");
            return false;
        }
        return true;
    }

    @PostMapping("/article")
    public ResponseEntity<ApiOk> handleArticle(@RequestBody Map<String, Object> payload,
                                               @RequestHeader(value = "X-Webhook-Secret", required = false) String secret) {
        if (!checkSecret(secret)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String event = (String) payload.get("event");
        if (!"entry.create".equals(event)) {
            System.out.println("Skipped event: " + event);
            return ResponseEntity.ok(ApiOk.ok("ignored"));
        }
        webhookService.processArticleWebhook(payload);
        return ResponseEntity.ok(ApiOk.ok("received"));
    }
}
