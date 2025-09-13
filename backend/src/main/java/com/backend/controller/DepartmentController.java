package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.dto.DepartmentDto;
import com.backend.entity.Department;
import com.backend.mapper.DepartmentMapper;
import com.backend.service.DepartmentService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.ArticleFlat;
import com.backend.strapi.model.DepartmentFlat;
import com.backend.strapi.model.StrapiPageFlat;
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
@RequestMapping("/v1/departments")
@Slf4j
@CrossOrigin(origins = "*")
public class DepartmentController {
    private final StrapiClient strapiClient;

    public DepartmentController(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @GetMapping
    public List<DepartmentVM> list(){
        var p = new LinkedMultiValueMap<String, String>();
        var raw = strapiClient.get(
                "/departments",
                new ParameterizedTypeReference<StrapiPageFlat<DepartmentFlat>>() {},
                p,
                null // public thì để null; nếu cần quyền, truyền bearer
        );
        var data = (raw != null && raw.data() != null) ? raw.data() : List.<DepartmentFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }
}
