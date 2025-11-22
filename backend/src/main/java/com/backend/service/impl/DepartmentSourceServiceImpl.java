package com.backend.service.impl;

import com.backend.client.StrapiClient;
import com.backend.dto.request.DepartmentSourceReq;
import com.backend.service.DepartmentSourceService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.DepartmentSourceFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.DepartmentSourceVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class DepartmentSourceServiceImpl implements DepartmentSourceService {

    private final StrapiClient client;

    public DepartmentSourceServiceImpl(StrapiClient client) {
        this.client = client;
    }

    @Override
    public int countItems() {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("pagination[page]", "1");
        params.add("pagination[pageSize]", "1");

        StrapiPageFlat<DepartmentSourceFlat> raw = client.get(
                "/department-sources",
                new ParameterizedTypeReference<StrapiPageFlat<DepartmentSourceFlat>>() {},
                params,
                null
        );

        if (raw != null && raw.meta() != null && raw.meta().pagination() != null) {
            return (int) raw.meta().pagination().total();
        }
        return 0;
    }

    @Override
    public List<DepartmentSourceVM> list(int page, int pageSize) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("populate", "department");
        params.add("populate", "crawler_config");
        params.add("populate", "categories");

        params.add("pagination[page]", String.valueOf(page));
        params.add("pagination[pageSize]", String.valueOf(pageSize));

        StrapiPageFlat<DepartmentSourceFlat> raw = client.get(
                "/department-sources",
                new ParameterizedTypeReference<StrapiPageFlat<DepartmentSourceFlat>>() {},
                params,
                null
        );

        List<DepartmentSourceFlat> data =
                (raw != null && raw.data() != null) ? raw.data() : List.of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public DepartmentSourceVM one(String documentId) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("populate", "department");
        params.add("populate", "crawler_config");
        params.add("populate", "categories");

        StrapiSingle<DepartmentSourceFlat> resp = client.get(
                "/department-sources/" + documentId,
                new ParameterizedTypeReference<StrapiSingle<DepartmentSourceFlat>>() {},
                params,
                null
        );

        return StrapiMapper.toVM(resp.data());
    }

    @Override
    public Object create(DepartmentSourceReq req) {
        Map<String, Object> data = new HashMap<>();
        data.put("url", req.url());
        data.put("label", req.label());
        data.put("key_departmentSource", req.key_departmentSource());
        data.put("department", Map.of("connect", List.of(req.department_id())));

        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<DepartmentSourceFlat> created = client.postJson(
                "/department-sources",
                body,
                new ParameterizedTypeReference<StrapiSingle<DepartmentSourceFlat>>() {},
                null
        );

        return created;
    }

    @Override
    public Object update(String documentId, DepartmentSourceReq req) {
        Map<String, Object> data = new HashMap<>();
        data.put("url", req.url());
        data.put("label", req.label());
        data.put("key_departmentSource", req.key_departmentSource());

        if (req.department_id() != null && !req.department_id().isBlank()) {
            data.put("department", Map.of("connect", List.of(req.department_id())));
        }

        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<DepartmentSourceFlat> updated = client.putJson(
                "/department-sources/" + documentId,
                body,
                new ParameterizedTypeReference<StrapiSingle<DepartmentSourceFlat>>() {},
                null
        );

        return updated;
    }

    @Override
    public void delete(String documentId) {
        client.delete("/department-sources/" + documentId, null);
    }
}
