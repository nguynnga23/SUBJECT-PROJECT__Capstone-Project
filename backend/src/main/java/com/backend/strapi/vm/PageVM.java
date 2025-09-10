package com.backend.strapi.vm;

import java.util.List;

/**
 * Generic wrapper cho list + meta phân trang
 */
public record PageVM<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {}
