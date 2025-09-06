package com.backend.strapi.vm;

import java.util.List;

/**
 * Generic wrapper cho list + meta phân trang
 */
public record PageVM<T>(
        List<T> content,     // danh sách item
        int page,            // trang hiện tại (0-based, FE friendly)
        int size,            // số phần tử mỗi trang
        long totalElements,  // tổng số phần tử
        int totalPages       // tổng số trang
) {}
