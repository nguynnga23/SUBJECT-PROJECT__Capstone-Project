package com.backend.strapi.mapper;

import com.backend.strapi.model.*;
import com.backend.strapi.vm.ArticleVM;

import java.time.ZoneOffset;

public class StrapiMapper {

    public static ArticleVM toVM(ArticleFlat a) {
        if (a == null)
            return null;

        String catName = null, keyCat = null, depName = null, keyDep = null;
        if (a.category() != null) {
            catName = a.category().category_name();
            keyCat = a.category().key_category();
            if (a.category().department() != null) {
                depName = a.category().department().department_name();
                keyDep = a.category().department().key_department();
            }
        }

        var published = a.external_publish_date() != null
                ? a.external_publish_date().atStartOfDay().atOffset(ZoneOffset.UTC)
                : a.publishedAt();

        return new ArticleVM(
                a.id(),
                a.title(),
                a.content(),
                a.summary(),
                a.thumbnail(),
                a.external_url(),
                a.external_slug(),
                published,
                catName, keyCat, depName, keyDep);
    }
}
