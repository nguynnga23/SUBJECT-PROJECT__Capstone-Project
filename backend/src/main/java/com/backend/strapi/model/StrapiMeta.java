package com.backend.strapi.model;
@com.fasterxml.jackson.annotation.JsonIgnoreProperties(ignoreUnknown = true)

public record StrapiMeta(StrapiPagination pagination) {}
