package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record BookMark(ArticleFlat articleFlat, UserFlat userFlat) {
}
