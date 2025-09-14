package com.backend.strapi.vm;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CrawlerConfigVM {
    private String documentId;
    private String url;
    private String relativeUrlList;
    private String relativeUrl;
    private String thumbnail;
    private String nextPages;
    private String title;
    private String content;
    private String externalPublishDate;
    private String departmentSourceId;
    private String departmentSourceName;
}
