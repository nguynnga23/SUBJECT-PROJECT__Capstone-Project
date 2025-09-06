package com.backend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Component
public class StrapiClient {

    @Value("${strapi.base}") String base;   // vd: http://localhost:1337
    @Value("${strapi.token}") String token;

    private final RestClient rc = RestClient.create();

    // StrapiClient.java
    public <T> T get(String path,
                     org.springframework.core.ParameterizedTypeReference<T> typeRef,
                     MultiValueMap<String,String> params) {

        String url = UriComponentsBuilder.fromHttpUrl(base)
                .path(path)
                .queryParams(params)
                .encode()
                .build()
                .toUriString();

        return rc.get()
                .uri(URI.create(url))
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(token))
                .retrieve()
                .body(typeRef);
    }

    public String getRaw(String path, MultiValueMap<String,String> params){
        String url = UriComponentsBuilder.fromHttpUrl(base).path(path).queryParams(params).encode().build().toUriString();
        return rc.get().uri(URI.create(url))
                .headers(h -> h.setBearerAuth(token)).retrieve().body(String.class);
    }


}
