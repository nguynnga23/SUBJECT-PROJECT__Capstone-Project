package com.backend.service.impl;

import com.backend.client.StrapiClient;
import com.backend.dto.request.DepartmentReq;
import com.backend.service.DepartmentService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.DepartmentFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.DepartmentVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final StrapiClient strapiClient;

    public DepartmentServiceImpl(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @Override
    public List<DepartmentVM> list() {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        StrapiPageFlat<DepartmentFlat> raw = strapiClient.get(
                "/departments",
                new ParameterizedTypeReference<StrapiPageFlat<DepartmentFlat>>() {},
                params,
                null
        );

        List<DepartmentFlat> data =
                (raw != null && raw.data() != null) ? raw.data() : List.of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public DepartmentVM one(String documentId) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        StrapiSingle<DepartmentFlat> resp = strapiClient.get(
                "/departments/" + documentId,
                new ParameterizedTypeReference<StrapiSingle<DepartmentFlat>>() {},
                params,
                null
        );

        return StrapiMapper.toVM(resp.data());
    }

    @Override
    public Object create(DepartmentReq req) {
        Map<String, Object> data = new HashMap<>();
        if (req.department_name() != null) {
            data.put("department_name", req.department_name());
        }

        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<DepartmentFlat> created = strapiClient.postJson(
                "/departments",
                body,
                new ParameterizedTypeReference<StrapiSingle<DepartmentFlat>>() {},
                null
        );

        return created;
    }

    @Override
    public Object update(String documentId, DepartmentReq req) {
        Map<String, Object> data = new HashMap<>();
        if (req.department_name() != null) {
            data.put("department_name", req.department_name());
        }

        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<DepartmentFlat> updated = strapiClient.putJson(
                "/departments/" + documentId,
                body,
                new ParameterizedTypeReference<StrapiSingle<DepartmentFlat>>() {},
                null
        );

        return updated;
    }

    @Override
    public void delete(String documentId) {
        strapiClient.delete("/departments/" + documentId, null);
    }
}
