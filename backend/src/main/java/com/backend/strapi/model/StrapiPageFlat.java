package com.backend.strapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record StrapiPageFlat<T>(List<T> data, StrapiMeta meta) {}
