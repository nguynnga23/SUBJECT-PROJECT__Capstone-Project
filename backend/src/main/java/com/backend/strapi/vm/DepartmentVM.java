package com.backend.strapi.vm;

import lombok.Data;

@Data
public class DepartmentVM {
    private Long id;
    private String documentId;
    private String departmentName;
    private String keyDepartment;
}
