package com.backend.strapi.vm;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CategoryVM {
    private Long id;
    private String documentId;
    private String categoryName;
    private String categoryUrl;
    private String keyCategory;
    private LocalDate lastExternalPublishDate;
    private Long departmentSourceId;
    private String departmentSourceName;
}
