package com.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class WebhookSecret {
    private final String expected;

    public WebhookSecret(@Value("${unifeed.webhook.secret}") String expected) {
        this.expected = expected;
    }

    public boolean matches(String header) {
        if (expected == null || expected.isBlank()) return true;
        return header != null && header.equals(expected);
    }
}
