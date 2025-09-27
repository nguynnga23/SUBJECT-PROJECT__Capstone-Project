package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.CrawlerConfigDto;
import com.backend.entity.CrawlerConfig;
import com.backend.mapper.CrawlerConfigMapper;
import com.backend.service.CrawlerConfigService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.*;
import com.backend.strapi.vm.CategoryVM;
import com.backend.strapi.vm.CrawlerConfigVM;
import com.backend.strapi.vm.DepartmentVM;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/v1/crawler-configs")
@Slf4j
@CrossOrigin(origins = "*")
public class CrawlerConfigController {
    private final StrapiClient strapiClient;

    public CrawlerConfigController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @GetMapping
    public List<CrawlerConfigVM> list() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department_source");
        var raw = strapiClient.get(
                "/crawler-configs",
                new ParameterizedTypeReference<StrapiPageFlat<CrawlerConfigFlat>>() {
                },
                p,
                null // public thì để null; nếu cần quyền, truyền bearer
        );
        var data = (raw != null && raw.data() != null) ? raw.data() : List.<CrawlerConfigFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @GetMapping("/{id}")
    public CrawlerConfigVM one(@PathVariable("id") String id) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department_source");
        var resp = strapiClient.get(
                "/crawler-configs/" + id,
                new ParameterizedTypeReference<StrapiSingle<CrawlerConfigFlat>>() {
                },
                p,
                null);

        StrapiMapper strapiMapper = new StrapiMapper();
        return strapiMapper.toVM(resp.data());
    }
}
