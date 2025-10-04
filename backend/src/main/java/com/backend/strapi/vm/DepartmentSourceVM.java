package com.backend.strapi.vm;

import lombok.Data;

@Data
public class DepartmentSourceVM {
    private String documentId;
    private String url;
    private String label;
    private DepartmentVM department;
}
