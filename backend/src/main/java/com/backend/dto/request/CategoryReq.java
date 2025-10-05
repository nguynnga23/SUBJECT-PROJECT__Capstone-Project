package com.backend.dto.request;

public record CategoryReq(String category_name,
                          String category_url,
                          String key_category,
                          String department_source_id) {
}
