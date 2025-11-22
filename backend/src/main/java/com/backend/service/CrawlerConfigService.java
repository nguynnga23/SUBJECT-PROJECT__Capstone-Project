package com.backend.service;

import com.backend.dto.request.CrawlerConfigReq;
import com.backend.strapi.vm.CrawlerConfigVM;

import java.util.List;

public interface CrawlerConfigService {

    List<CrawlerConfigVM> list();

    CrawlerConfigVM one(String id);

    Object create(CrawlerConfigReq req);

    Object update(String documentId, CrawlerConfigReq req);

    void delete(String documentId);
}
