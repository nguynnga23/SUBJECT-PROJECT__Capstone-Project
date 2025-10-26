package com.backend.dto.request;

import java.time.LocalDate;

public record CategoryReq(String category_name,
                          String category_url,
                          String key_category,
                          LocalDate last_external_publish_date,
                          String department_source_id
                          ) {
}
