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

//    @GetMapping
//    // @Cacheable(cacheNames = "articles:list", key = "#page+':'+#size+':'+(#q?:'')+':'+(#keyCategory?:'')+':'+(#keyDepartment?:'')")
//    public PageVM<ArticleVM> list(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "20") int size,
//            @RequestParam(required = false) String q,
//            @RequestParam(required = false) String keyCategory,
//            @RequestParam(required = false) String keyDepartment
//    ) {
//        // sanitize
//        if (page < 0) page = 0;
//        if (size < 1) size = 1;
//        if (size > 100) size = 100;
//
//        MultiValueMap<String, String> p = new LinkedMultiValueMap<>();
//        // Strapi là 1-based
//        p.add("pagination[page]", String.valueOf(page + 1));
//        p.add("pagination[pageSize]", String.valueOf(size));
//
////        p.add("populate[category][populate]", "department");
//
//        p.add("sort[0]", "external_publish_date:desc");
//        p.add("sort[1]", "publishedAt:desc");
//
//        if (q != null && !q.isBlank()) {
//            p.add("filters[$or][0][title][$containsi]", q);
//            p.add("filters[$or][1][content][$containsi]", q);
//        }
//
//        if (keyCategory != null && !keyCategory.isBlank()) {
//            p.add("filters[category][key_category][$eq]", keyCategory);
//        }
//
//        try {
//            StrapiPageFlat<ArticleFlat> raw = client.get(
//                    "/articles",
//                    new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
//                    p, null
//            );
//
//            var data = (raw != null && raw.data() != null) ? raw.data() : List.<ArticleFlat>of();
//            var items = data.stream()
//                    .map(StrapiMapper::toVM)        // overload mapper cho ArticleFlat
//                    .filter(Objects::nonNull)
//                    .toList();
//
//            var meta = (raw != null) ? raw.meta() : null;
//            var pagination = (meta != null) ? meta.pagination() : null;
//            long total = (pagination != null) ? pagination.total() : items.size();
//            int totalPages = (pagination != null) ? pagination.pageCount() : 1;
//
//            return new PageVM<>(items, page, size, total, totalPages);
//        } catch (ResponseStatusException ex) {
//            throw ex;
//        } catch (Exception ex) {
//            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Upstream failure", ex);
//        }
//    }
    @GetMapping
    public List<ArticleVM> list() {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "category");

        p.add("sort[0]", "external_publish_date:desc");
        p.add("sort[1]", "createdAt:desc");

        var raw = client.get(
                "/articles",
                new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
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
    public ArticleVM one(@PathVariable String id) {
        var p = new LinkedMultiValueMap<String, String>();
        p.add("populate", "category");
        var resp = client.get(
                "/articles/" + id,
                new ParameterizedTypeReference<StrapiSingle<ArticleFlat>>() {
                },
                p,
                null
        );


        StrapiMapper strapiMapper = new StrapiMapper();
        return strapiMapper.toVM(resp.data());
    }
}
