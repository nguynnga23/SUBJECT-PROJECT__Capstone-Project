package com.backend.strapi.vm;

import lombok.Data;

@Data
public class DepartmentSourceVM {
    private String url;
    private String label;
    private Long departmentId;
    private String departmentName;
}
