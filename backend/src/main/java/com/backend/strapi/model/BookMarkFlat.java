package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record BookMarkFlat(String documentId,ArticleFlat articleFlat, UserFlat userFlat) {
}
