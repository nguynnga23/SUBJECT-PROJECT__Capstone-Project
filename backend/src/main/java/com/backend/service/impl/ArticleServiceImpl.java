package com.backend.service.impl;

import com.backend.client.StrapiClient;
import com.backend.dto.request.ArticleReq;
import com.backend.service.ArticleService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.ArticleFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.ArticleVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final StrapiClient client;

    public ArticleServiceImpl(StrapiClient client) {
        this.client = client;
    }

    @Override
    public int countItems() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("pagination[page]", "1");
        p.add("pagination[pageSize]", "1");

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
                p,
                null
        );

        if (raw != null && raw.meta() != null && raw.meta().pagination() != null) {
            return (int) raw.meta().pagination().total();
        }

        return 0;
    }

    @Override
    public int countItemsByCategory(String categoryId) {
        var params = new LinkedMultiValueMap<String, String>();
        params.add("filters[category][documentId][$eq]", categoryId);
        params.add("pagination[page]", "1");
        params.add("pagination[pageSize]", "1");

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
                params,
                null
        );

        if (raw != null && raw.meta() != null && raw.meta().pagination() != null) {
            return (int) raw.meta().pagination().total();
        }

        return 0;
    }


    @Override
    public List<ArticleVM> list(int page, int pageSize) {
        var p = new LinkedMultiValueMap<String, String>();

        p.add("populate[category][populate]", "department_source");
        p.add("sort[0]", "external_publish_date:desc");
        p.add("sort[1]", "createdAt:desc");
        p.add("pagination[page]", String.valueOf(page));
        p.add("pagination[pageSize]", String.valueOf(pageSize));

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
                p,
                null
        );

        var data = (raw != null && raw.data() != null) ? raw.data() : List.<ArticleFlat>of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @Override
    public List<ArticleVM> listByCategory(String cat_id, int page, int pageSize) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("filters[category][documentId][$eq]", cat_id);
        p.add("populate[category][populate]", "department_source");

        p.add("sort[0]", "external_publish_date:desc");
        p.add("sort[1]", "createdAt:desc");

        p.add("pagination[page]", String.valueOf(page));
        p.add("pagination[pageSize]", String.valueOf(pageSize));

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
                p,
                null
        );

        var data = (raw != null && raw.data() != null) ? raw.data() : List.<ArticleFlat>of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }


    @Override
    public ArticleVM one(String id) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate[category][populate]", "department_source");

        var resp = client.get(
                "/articles/" + id,
                new ParameterizedTypeReference<StrapiSingle<ArticleFlat>>() {},
                p,
                null
        );

        return StrapiMapper.toVM(resp.data());
    }

    @Override
    public Object create(ArticleReq req) {
        var data = new HashMap<String, Object>();

        if (req.title() != null) data.put("title", req.title());
        if (req.content() != null) data.put("content", req.content());
        if (req.external_url() != null) data.put("external_url", req.external_url());
        if (req.summary() != null) data.put("summary", req.summary());
        if (req.thumbnail() != null) data.put("thumbnail", req.thumbnail());
        if (req.external_slug() != null) data.put("external_slug", req.external_slug());

        var body = Map.of("data", data);

        var created = client.postJson(
                "/articles",
                body,
                new ParameterizedTypeReference<StrapiSingle<ArticleFlat>>() {},
                null
        );

        return created;
    }

    @Override
    public Object update(String documentId, ArticleReq req) {
        var data = new HashMap<String, Object>();

        if (req.title() != null) data.put("title", req.title());
        if (req.content() != null) data.put("content", req.content());
        if (req.external_url() != null) data.put("external_url", req.external_url());
        if (req.summary() != null) data.put("summary", req.summary());
        if (req.thumbnail() != null) data.put("thumbnail", req.thumbnail());
        if (req.external_slug() != null) data.put("external_slug", req.external_slug());

        var body = Map.of("data", data);

        var updated = client.putJson(
                "/articles/" + documentId,
                body,
                new ParameterizedTypeReference<StrapiSingle<ArticleFlat>>() {},
                null
        );

        return updated;
    }

    @Override
    public void delete(String documentId) {
        client.delete("/articles/" + documentId, null);
    }
}
