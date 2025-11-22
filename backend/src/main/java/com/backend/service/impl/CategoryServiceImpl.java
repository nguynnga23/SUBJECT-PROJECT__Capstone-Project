package com.backend.service.impl;

import com.backend.client.StrapiClient;
import com.backend.dto.request.CategoryReq;
import com.backend.service.CategoryService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.CategoryFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.CategoryVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final StrapiClient strapiClient;

    public CategoryServiceImpl(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @Override
    public List<CategoryVM> list() {
        LinkedMultiValueMap<String, String> p = new LinkedMultiValueMap<>();
        p.add("populate", "department_source");

        StrapiPageFlat<CategoryFlat> raw = strapiClient.get(
                "/categories",
                new ParameterizedTypeReference<StrapiPageFlat<CategoryFlat>>() {},
                p,
                null
        );

        List<CategoryFlat> data = (raw != null && raw.data() != null) ? raw.data() : List.of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public CategoryVM one(String documentId) {
        LinkedMultiValueMap<String, String> p = new LinkedMultiValueMap<>();
        p.add("populate", "department_source");

        StrapiSingle<CategoryFlat> resp = strapiClient.get(
                "/categories/" + documentId,
                new ParameterizedTypeReference<StrapiSingle<CategoryFlat>>() {},
                p,
                null
        );

        return StrapiMapper.toVM(resp.data());
    }

    @Override
    public Object create(CategoryReq req) {
        Map<String, Object> data = buildCategoryData(req);
        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<CategoryFlat> created = strapiClient.postJson(
                "/categories",
                body,
                new ParameterizedTypeReference<StrapiSingle<CategoryFlat>>() {},
                null
        );

        return created;
    }

    @Override
    public Object update(String documentId, CategoryReq req) {
        Map<String, Object> data = buildCategoryData(req);
        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<CategoryFlat> updated = strapiClient.putJson(
                "/categories/" + documentId,
                body,
                new ParameterizedTypeReference<StrapiSingle<CategoryFlat>>() {},
                null
        );

        return updated;
    }

    @Override
    public void delete(String documentId) {
        strapiClient.delete("/categories/" + documentId, null);
    }

    private Map<String, Object> buildCategoryData(CategoryReq req) {
        Map<String, Object> data = new HashMap<>();

        if (req.category_name() != null) {
            data.put("category_name", req.category_name());
        }
        if (req.category_url() != null) {
            data.put("category_url", req.category_url());
        }
        if (req.key_category() != null) {
            data.put("key_category", req.key_category());
        }
        if (req.last_external_publish_date() != null) {
            String date = req.last_external_publish_date()
                    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            data.put("last_external_publish_date", date);
        }
        if (req.department_source_id() != null && !req.department_source_id().isBlank()) {
            data.put("department_source",
                    Map.of("connect", List.of(req.department_source_id())));
        }

        return data;
    }
}
