package com.backend.strapi.vm;

import lombok.Data;

@Data
public class UserVM {
    private String documentId;
    private String username;
    private String email;
    private String provider;
    private Boolean confirm;
    private Boolean blocked;
    private DepartmentVM department;
    private String fullName;
}
