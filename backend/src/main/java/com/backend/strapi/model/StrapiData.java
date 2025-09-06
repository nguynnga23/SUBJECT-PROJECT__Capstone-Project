package com.backend.strapi.model;
@com.fasterxml.jackson.annotation.JsonIgnoreProperties(ignoreUnknown = true)

public record StrapiData<T>(Long id, T attributes) {}

