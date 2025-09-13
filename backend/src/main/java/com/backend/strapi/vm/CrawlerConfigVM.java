package com.backend.strapi.vm;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CrawlerConfigVM {
    private String url;
    private String relativeUrlList;
    private String relativeUrl;
    private String thumbnail;
    private String nextPages;
    private String title;
    private String content;
    private LocalDate externalPublishDate;
    private Long departmentSourceId;
    private String departmentSourceName;
}
