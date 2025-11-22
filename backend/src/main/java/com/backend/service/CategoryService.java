package com.backend.service;

import com.backend.dto.request.CategoryReq;
import com.backend.strapi.vm.CategoryVM;

import java.util.List;

public interface CategoryService {

    List<CategoryVM> list();

    CategoryVM one(String documentId);

    Object create(CategoryReq req);

    Object update(String documentId, CategoryReq req);

    void delete(String documentId);
}
