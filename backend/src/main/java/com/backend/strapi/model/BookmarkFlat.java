package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record BookmarkFlat(String documentId,   @JsonProperty("article") ArticleFlat articleFlat,
                           @JsonProperty("user")    UserFlat userFlat) {
}
