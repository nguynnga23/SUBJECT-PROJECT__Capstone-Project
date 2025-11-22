package com.backend.service;

import com.backend.dto.request.DepartmentReq;
import com.backend.strapi.vm.DepartmentVM;

import java.util.List;

public interface DepartmentService {

    List<DepartmentVM> list();

    DepartmentVM one(String documentId);

    Object create(DepartmentReq req);

    Object update(String documentId, DepartmentReq req);

    void delete(String documentId);
}
