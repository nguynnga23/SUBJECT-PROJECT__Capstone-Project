package com.backend.strapi.model;
@com.fasterxml.jackson.annotation.JsonIgnoreProperties(ignoreUnknown = true)

public record StrapiPagination(int page, int pageSize, int pageCount, long total) {}

