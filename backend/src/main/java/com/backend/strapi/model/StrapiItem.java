package com.backend.strapi.model;
@com.fasterxml.jackson.annotation.JsonIgnoreProperties(ignoreUnknown = true)

public record StrapiItem<T>(StrapiData<T> data) {}

