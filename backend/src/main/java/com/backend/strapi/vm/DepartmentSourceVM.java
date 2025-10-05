package com.backend.strapi.vm;

import com.backend.strapi.model.CrawlerConfigFlat;
import lombok.Data;

@Data
public class DepartmentSourceVM {
    private String documentId;
    private String url;
    private String label;
    private String keyDepartmentSource;
    private CrawlerConfigVM crawlerConfig;
    private DepartmentVM department;
}
