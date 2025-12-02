package com.backend.strapi.vm;

import com.backend.strapi.model.CrawlerConfigFlat;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class DepartmentSourceVM {
    private String documentId;
    private String url;
    private String label;
    private String keyDepartmentSource;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private OffsetDateTime publishedAt;
    private CrawlerConfigVM crawlerConfig;
    private DepartmentVM department;
    private List<CategoryVM> categories;
}
