package com.backend.controller;

import com.backend.client.StrapiClient;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.ArticleFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.vm.ArticleVM;
import com.backend.strapi.vm.PageVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
        var p = new org.springframework.util.LinkedMultiValueMap<String, String>();
        // populate quan hệ (nếu ArticleVM cần category/department)
        p.add("populate", "category");

        // sort an toàn (nếu Article bật Draft & Publish thì dùng publishedAt, không thì dùng createdAt)
        p.add("sort[0]", "external_publish_date:desc");
        p.add("sort[1]", "createdAt:desc");

        var raw = client.get(
                "/articles",
                new org.springframework.core.ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
                p,
                null // public thì để null; nếu cần quyền, truyền bearer
        );

        var data = (raw != null && raw.data() != null) ? raw.data() : java.util.List.<ArticleFlat>of();
        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(java.util.Objects::nonNull)
                .toList();
    }

    @GetMapping("/{id}")
    // @Cacheable(cacheNames = "articles:one", key = "#id")
    public ArticleVM one(@PathVariable long id) {
        MultiValueMap<String, String> p = new LinkedMultiValueMap<>();

        p.add("pagination[page]", "1");
        p.add("pagination[pageSize]", "1");

//        p.add("populate[category][populate]", "department");

        p.add("filters[id][$eq]", String.valueOf(id));

        try {
            StrapiPageFlat<ArticleFlat> raw = client.get(
                    "/articles",
                    new ParameterizedTypeReference<StrapiPageFlat<ArticleFlat>>() {},
                    p, null
            );

            var data = (raw != null && raw.data() != null) ? raw.data() : List.<ArticleFlat>of();
            if (data.isEmpty()) {
                throw new ResponseStatusException(NOT_FOUND, "Article not found: id=" + id);
            }

            var vm = StrapiMapper.toVM(data.get(0));
            if (vm == null) {
                throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Failed to map article: id=" + id);
            }
            return vm;
        } catch (ResponseStatusException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Upstream failure", ex);
        }
    }
}
