package com.backend.dto.response;

import com.backend.strapi.vm.ArticleVM;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {
    private String aiAnswer;
    private List<ArticleVM> sources;
}