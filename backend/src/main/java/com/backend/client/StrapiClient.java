package com.backend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriBuilder;

import java.time.Duration;

@Component
public class StrapiClient {

    private final RestClient rc;
    private final String serviceToken;

    public StrapiClient(@Value("${strapi.base}") String base,
            @Value("${strapi.token:}") String serviceToken) {

        String apiBase = base.endsWith("/") ? base + "api" : base + "/api";

        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout((int) Duration.ofSeconds(5).toMillis());
        factory.setReadTimeout((int) Duration.ofSeconds(15).toMillis());

        this.rc = RestClient.builder()
                .baseUrl(apiBase)
                .requestFactory(factory)
                .build();
        this.serviceToken = (serviceToken == null ? "" : serviceToken);
    }

    /* ===== Low-level helpers ===== */

    private RestClient.RequestHeadersSpec<?> withAuth(RestClient.RequestHeadersSpec<?> spec,
            @Nullable String bearerOverride) {
        String bearer = (bearerOverride != null && !bearerOverride.isBlank())
                ? bearerOverride
                : (serviceToken.isBlank() ? null : serviceToken);
        if (bearer != null) {
            spec = spec.headers(h -> h.setBearerAuth(bearer));
        }
        return spec;
    }

    /* ===== Generic GET/POST ===== */

    public <T> T get(String path,
            ParameterizedTypeReference<T> typeRef,
            @Nullable MultiValueMap<String, String> params,
            @Nullable String bearerOverride) {
        try {
            return withAuth(
                    rc.get().uri(b -> {
                        b.path(path);
                        if (params != null)
                            b.queryParams(params);
                        return b.build();
                    }).accept(MediaType.APPLICATION_JSON),
                    bearerOverride).retrieve().body(typeRef);
        } catch (org.springframework.web.client.RestClientResponseException e) {
            String body = e.getResponseBodyAsString();
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.valueOf(e.getRawStatusCode()),
                    "Strapi 4xx: " + body, e);
        }
    }

    public <T> T delete(String path, @Nullable String bearerOverride) {
        return withAuth(rc.delete().uri(path), bearerOverride)
                .retrieve().body(new ParameterizedTypeReference<T>() {
                });
    }

    public <B, T> T putJson(String path, B body,
            ParameterizedTypeReference<T> typeRef,
            @Nullable String bearerOverride) {
        return withAuth(rc.put().uri(path).contentType(MediaType.APPLICATION_JSON).body(body), bearerOverride)
                .retrieve().body(typeRef);
    }

    public <B, T> T patchJson(String path, B body,
            ParameterizedTypeReference<T> typeRef,
            @Nullable String bearerOverride) {
        return withAuth(rc.patch().uri(path).contentType(MediaType.APPLICATION_JSON).body(body), bearerOverride)
                .retrieve().body(typeRef);
    }

    public String getRaw(String path,
            @Nullable MultiValueMap<String, String> params,
            @Nullable String bearerOverride) {
        return withAuth(
                rc.get().uri(b -> {
                    b.path(path);
                    if (params != null)
                        b.queryParams(params);
                    return b.build();
                }),
                bearerOverride).retrieve().body(String.class);
    }

    public <B, T> T postJson(String path, B body,
            ParameterizedTypeReference<T> typeRef,
            @Nullable String bearerOverride) {
        return withAuth(
                rc.post().uri(path).contentType(MediaType.APPLICATION_JSON).body(body),
                bearerOverride).retrieve().body(typeRef);
    }

    /* ===== Auth endpoints (KHÔNG gắn Bearer) ===== */

    // POST /auth/local/register { username, email, password, ... }
    public <B, T> T register(B body, ParameterizedTypeReference<T> typeRef) {
        return rc.post().uri("/auth/local/register")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve().body(typeRef);
    }

    // POST /auth/local { identifier, password }
    public <B, T> T login(B body, ParameterizedTypeReference<T> typeRef) {
        return rc.post().uri("/auth/local")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve().body(typeRef);
    }
}
