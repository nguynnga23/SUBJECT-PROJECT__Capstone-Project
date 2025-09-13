package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.CategoryFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.vm.CategoryVM;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;



@RestController
@RequestMapping("/v1/categories")
@Slf4j
@CrossOrigin(origins = "*")
public class CategoryController {
    private final StrapiClient strapiClient;
    public CategoryController(StrapiClient client, StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @GetMapping
    public List<CategoryVM> list(){
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "department_source");
        var raw = strapiClient.get(
                "/categories",
                new ParameterizedTypeReference<StrapiPageFlat<CategoryFlat>>(){},
                p,
                null
        );

        var data = (raw != null && raw.data() != null) ? raw.data() : List.<CategoryFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();

    }
}
