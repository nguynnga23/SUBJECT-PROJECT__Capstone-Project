package com.backend.strapi.mapper;

import com.backend.strapi.model.*;
import com.backend.strapi.vm.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;

@Component
public class StrapiMapper {
    // ---------- Category ----------
    private static CategoryVM toCategoryVM(Map<String, Object> c) {
        if (c == null) return null;
        CategoryVM vm = new CategoryVM();
        vm.setDocumentId(str(c, "documentId", null));
        vm.setCategoryName(str(c, "category_name", null));
        vm.setCategoryUrl(str(c, "category_url", null));
        vm.setKeyCategory(str(c, "key_category", null));
        vm.setLastExternalPublishDate(LocalDate.parse(str(c, "last_external_publish_date", null)));
        return vm;
    }

    // ---------- Helpers ----------
    private static String str(Map<String, Object> m, String key, String defVal) {
        if (m == null) return defVal;
        Object v = m.get(key);
        return v == null ? defVal : String.valueOf(v);
    }

    public static ArticleVM toVM(ArticleFlat a) {
        if (a == null) return null;
        ArticleVM vm = new ArticleVM();
        vm.setDocumentId(a.documentId());
        vm.setTitle(a.title());
        vm.setExternalPublishDate(a.external_publish_date());
        vm.setContent(a.content());
        vm.setExternalUrl(a.external_url());
        vm.setSummary(a.summary());
        vm.setThumbnail(a.thumbnail());
        vm.setExternalSlug(a.external_slug());
        vm.setCreatedAt(a.createdAt());
        vm.setUpdatedAt(a.updatedAt());
        vm.setPublishedAt(a.publishedAt());
        vm.setCategory(toVM(a.category()));
        return vm;
    }

    public static CategoryVM toVM(CategoryFlat c) {
        if (c == null) return null;
        CategoryVM vm = new CategoryVM();
        vm.setDocumentId(c.documentId());
        vm.setCategoryName(c.category_name());
        vm.setCategoryUrl(c.category_url());
        vm.setKeyCategory(c.key_category());
        vm.setLastExternalPublishDate(c.last_external_publish_date());
        vm.setDepartmentSource(toVM(c.department_source()));
        return vm;
    }

    public static UserVM toVM(UserFlat u) {
        if (u == null) return null;
        UserVM vm = new UserVM();
        vm.setDocumentId(u.documentId());
        vm.setUsername(u.username());
        vm.setEmail(u.email());
        vm.setProvider(u.provider());
        vm.setConfirm(u.confirm());
        vm.setBlocked(u.blocked());
        vm.setDepartment(toVM(u.department()));
        vm.setFullName(u.fullName());
        return vm;
    }

    public static BookmarkVM toVM(BookmarkFlat b){
        if (b == null) return null;
        BookmarkVM vm = new BookmarkVM();
        vm.setDocumentId(b.documentId());
        vm.setUserId(b.user().documentId());
        vm.setArticle(toVM(b.article()));
        return vm;
    }

    public static DepartmentVM toVM(DepartmentFlat d) {
        if (d == null) return null;
        DepartmentVM vm = new DepartmentVM();
        vm.setDocumentId(d.documentId());
        vm.setDepartmentName(d.department_name());
        return vm;
    }

    public static DepartmentSourceVM toVM(DepartmentSourceFlat ds) {
        if (ds == null) return null;
        DepartmentSourceVM vm = new DepartmentSourceVM();
        vm.setDocumentId(ds.documentId());
        vm.setCrawlerConfig(toVM(ds.crawler_config()));
        vm.setKeyDepartmentSource(ds.key_departmentSource());
        vm.setUrl(ds.url());
        vm.setLabel(ds.label());
        vm.setCreatedAt(ds.createdAt());
        vm.setUpdatedAt(ds.updatedAt());
        vm.setPublishedAt(ds.publishedAt());
        vm.setDepartment(toVM(ds.department()));
        vm.setCategories(
                ds.categories() == null
                        ? Collections.emptyList()
                        : ds.categories().stream()
                        .map(StrapiMapper::toVM)
                        .filter(Objects::nonNull)
                        .toList()
        );
        return vm;
    }

    public static CrawlerConfigVM toVM(CrawlerConfigFlat c) {
        if (c == null) return null;
        CrawlerConfigVM vm = new CrawlerConfigVM();
        vm.setDocumentId(c.documentId());
        vm.setUrl(c.url());
        vm.setRelativeUrlList(c.relative_url_list());
        vm.setRelativeUrl(c.relative_url());
        vm.setThumbnail(c.thumbnail());
        vm.setNextPages(c.next_pages());
        vm.setTitle(c.title());
        vm.setContent(c.content());
        vm.setExternalPublishDate(c.external_publish_date());
        vm.setDepartmentSource(toVM(c.department_source()));
        return vm;
    }
}
