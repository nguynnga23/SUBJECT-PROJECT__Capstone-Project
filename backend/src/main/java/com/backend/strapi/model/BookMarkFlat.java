package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record BookMarkFlat(ArticleFlat articleFlat, UserFlat userFlat) {
}
