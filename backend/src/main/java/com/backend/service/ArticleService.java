package com.backend.service;

import com.backend.dto.request.ArticleReq;
import com.backend.strapi.vm.ArticleVM;

import java.util.List;

public interface ArticleService {

    int countItems();

    List<ArticleVM> list(int page, int pageSize);

    List<ArticleVM> listByCategory(String categoryId, int page, int pageSize);

    int countItemsByCategory(String categoryId);

    ArticleVM one(String id);

    Object create(ArticleReq req);

    Object update(String documentId, ArticleReq req);

    void delete(String documentId);
}
