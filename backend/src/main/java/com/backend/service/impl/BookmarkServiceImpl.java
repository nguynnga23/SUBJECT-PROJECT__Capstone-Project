package com.backend.service.impl;

import com.backend.client.StrapiClient;
import com.backend.dto.request.BookmarkReq;
import com.backend.service.BookmarkService;
import com.backend.strapi.mapper.StrapiMapper;
import com.backend.strapi.model.BookmarkFlat;
import com.backend.strapi.model.StrapiPageFlat;
import com.backend.strapi.model.StrapiSingle;
import com.backend.strapi.vm.BookmarkVM;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    private final StrapiClient strapiClient;

    public BookmarkServiceImpl(StrapiClient strapiClient) {
        this.strapiClient = strapiClient;
    }

    @Override
    public List<BookmarkVM> listAll() {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("populate", "user");
        params.add("populate", "article");

        StrapiPageFlat<BookmarkFlat> raw = strapiClient.get(
                "/bookmarks",
                new ParameterizedTypeReference<StrapiPageFlat<BookmarkFlat>>() {},
                params,
                null
        );

        List<BookmarkFlat> data =
                (raw != null && raw.data() != null) ? raw.data() : List.of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public List<BookmarkVM> getByUser(String userId) {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("filters[user][documentId][$eq]", userId);
        params.add("populate", "user");
        params.add("populate", "article");

        ParameterizedTypeReference<StrapiPageFlat<BookmarkFlat>> type =
                new ParameterizedTypeReference<>() {};
        StrapiPageFlat<BookmarkFlat> raw =
                strapiClient.get("/bookmarks", type, params, null);

        List<BookmarkFlat> data =
                (raw != null && raw.data() != null) ? raw.data() : List.of();

        return data.stream()
                .map(StrapiMapper::toVM)
                .filter(Objects::nonNull)
                .toList();
    }

    @Override
    public Object create(BookmarkReq req) {
        Map<String, Object> data = new HashMap<>();
        data.put("user", Map.of("connect", List.of(req.userId())));
        data.put("article", Map.of("connect", List.of(req.articleId())));

        Map<String, Object> body = Map.of("data", data);

        StrapiSingle<BookmarkFlat> created = strapiClient.postJson(
                "/bookmarks",
                body,
                new ParameterizedTypeReference<StrapiSingle<BookmarkFlat>>() {},
                null
        );

        return created;
    }

    @Override
    public void delete(String id) {
        strapiClient.delete(
                "/bookmarks/" + id,
                null
        );
    }

    @Override
    public BookmarkCheckResult checkBookmark(String userId, String articleId) {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("filters[user][documentId][$eq]", userId);
        params.add("filters[article][documentId][$eq]", articleId);
        params.add("fields[0]", "id");
        params.add("pagination[pageSize]", "1");

        ParameterizedTypeReference<StrapiPageFlat<BookmarkFlat>> type =
                new ParameterizedTypeReference<>() {};
        StrapiPageFlat<BookmarkFlat> res =
                strapiClient.get("/bookmarks", type, params, null);

        boolean exists = res != null && res.data() != null && !res.data().isEmpty();
        String bookmarkId = exists
                ? String.valueOf(res.data().get(0).documentId())
                : "";

        return new BookmarkCheckResult(exists, bookmarkId);
    }
}
