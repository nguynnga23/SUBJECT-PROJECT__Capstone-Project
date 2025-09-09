package com.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrawlerConfigDto {
    private UUID id;
    private String relativeUrlList;
    private String relativeUrl;
    private String thumbnail;
    private String nextPages;
    private String title;
    private String content;
    private String externalPublishDate;
    private DepartmentWebsiteDto departmentWebsite;
    private Instant createdAt;
    private Instant updatedAt;
}
