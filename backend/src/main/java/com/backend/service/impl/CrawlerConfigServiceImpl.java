package com.backend.service.impl;

import com.backend.client.StrapiClient;
import com.backend.dto.request.CrawlerConfigReq;
import com.backend.service.CrawlerConfigService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.CrawlerConfigFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.CrawlerConfigVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class CrawlerConfigServiceImpl implements CrawlerConfigService {

    private final StrapiClient strapiClient;

    public CrawlerConfigServiceImpl(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @Override
    public List<CrawlerConfigVM> list() {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("populate", "department_source");

        StrapiPageFlat<CrawlerConfigFlat> raw = strapiClient.get(
                "/crawler-configs",
                new ParameterizedTypeReference<StrapiPageFlat<CrawlerConfigFlat>>() {},
                params,
                null
        );

        List<CrawlerConfigFlat> data =
                (raw != null && raw.data() != null) ? raw.data() : List.of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public CrawlerConfigVM one(String id) {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("populate", "department_source");

        StrapiSingle<CrawlerConfigFlat> resp = strapiClient.get(
                "/crawler-configs/" + id,
                new ParameterizedTypeReference<StrapiSingle<CrawlerConfigFlat>>() {},
                params,
                null
        );

        return StrapiMapper.toVM(resp.data());
    }

    @Override
    public Object create(CrawlerConfigReq req) {
        Map<String, Object> data = buildData(req);
        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<CrawlerConfigFlat> created = strapiClient.postJson(
                "/crawler-configs",
                body,
                new ParameterizedTypeReference<StrapiSingle<CrawlerConfigFlat>>() {},
                null
        );

        return created;
    }

    @Override
    public Object update(String documentId, CrawlerConfigReq req) {
        Map<String, Object> data = buildData(req);
        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<CrawlerConfigFlat> updated = strapiClient.putJson(
                "/crawler-configs/" + documentId,
                body,
                new ParameterizedTypeReference<StrapiSingle<CrawlerConfigFlat>>() {},
                null
        );

        return updated;
    }

    @Override
    public void delete(String documentId) {
        strapiClient.delete("/crawler-configs/" + documentId, null);
    }

    private Map<String, Object> buildData(CrawlerConfigReq req) {
        Map<String, Object> data = new HashMap<>();

        if (req.url() != null) {
            data.put("url", req.url());
        }
        if (req.relative_url_list() != null) {
            data.put("relative_url_list", req.relative_url_list());
        }
        if (req.relative_url() != null) {
            data.put("relative_url", req.relative_url());
        }
        if (req.thumbnail() != null) {
            data.put("thumbnail", req.thumbnail());
        }
        if (req.next_pages() != null) {
            data.put("next_pages", req.next_pages());
        }
        if (req.title() != null) {
            data.put("title", req.title());
        }
        if (req.content() != null) {
            data.put("content", req.content());
        }
        if (req.external_publish_date() != null) {
            data.put("external_publish_date", req.external_publish_date());
        }

        if (req.department_source_id() != null && !req.department_source_id().isBlank()) {
            data.put(
                    "department_source",
                    Map.of("connect", List.of(req.department_source_id()))
            );
        }

        return data;
    }
}
