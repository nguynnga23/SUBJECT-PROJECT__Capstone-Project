package com.backend.strapi.mapper;

import com.backend.strapi.model.*;
import com.backend.strapi.vm.*;

import java.time.ZoneOffset;

public class StrapiMapper {

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
        vm.setCategory(toVM(a.categoryFlat()));
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
        vm.setDepartmentSourceVM(toVM(c.departmentSourceFlat()));
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
        vm.setDepartment(toVM(u.departmentFlat()));
        vm.setFullName(u.fullName());
        return vm;
    }

    public static BookmarkVM toVM(BookmarkFlat b){
        if (b == null) return null;
        BookmarkVM vm = new BookmarkVM();
        vm.setDocumentId(b.documentId());
        vm.setUserId(b.userFlat().documentId());
        vm.setArticle(toVM(b.articleFlat()));
        return vm;
    }

    public static DepartmentVM toVM(DepartmentFlat d) {
        if (d == null) return null;
        DepartmentVM vm = new DepartmentVM();
        vm.setDocumentId(d.documentId());
        vm.setDepartmentName(d.department_name());
        vm.setKeyDepartment(d.key_department());
        return vm;
    }

    public static DepartmentSourceVM toVM(DepartmentSourceFlat ds) {
        if (ds == null) return null;
        DepartmentSourceVM vm = new DepartmentSourceVM();
        vm.setDocumentId(ds.documentId());
        vm.setUrl(ds.url());
        vm.setLabel(ds.label());
        vm.setDepartment(toVM(ds.departmentFlat()));
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
        vm.setDepartmentSource(toVM(c.departmentSourceFlat()));
        return vm;
    }


}
