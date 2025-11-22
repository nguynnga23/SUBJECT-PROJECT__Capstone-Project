package com.backend.service;

import com.backend.dto.request.DepartmentSourceReq;
import com.backend.strapi.vm.DepartmentSourceVM;

import java.util.List;

public interface DepartmentSourceService {

    int countItems();

    List<DepartmentSourceVM> list(int page, int pageSize);

    DepartmentSourceVM one(String documentId);

    Object create(DepartmentSourceReq req);

    Object update(String documentId, DepartmentSourceReq req);

    void delete(String documentId);
}
