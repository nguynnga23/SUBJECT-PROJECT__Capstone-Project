package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.*;
import com.backend.strapi.vm.ArticleVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/v1/articles")
@Validated
public class ArticleController {

    private final StrapiClient client;

    public ArticleController(StrapiClient client) {
        this.client = client;
    }

    @GetMapping
    public List<ArticleVM> list() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "category");

        p.add("sort[0]", "external_publish_date:desc");
        p.add("sort[1]", "createdAt:desc");

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {
                },
                p,
                null // public thì để null; nếu cần quyền, truyền bearer
        );

        var data = (raw != null && raw.data() != null) ? raw.data() : List.<ArticleFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @GetMapping("/{id}")
    public ArticleVM one(@PathVariable("id") String id) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "category");
        var resp = client.get(
                "/articles/" + id,
                new ParameterizedTypeReference<StrapiSingle<ArticleFlat>>() {
                },
                p,
                null);

        StrapiMapper strapiMapper = new StrapiMapper();
        return strapiMapper.toVM(resp.data());
    }
}
