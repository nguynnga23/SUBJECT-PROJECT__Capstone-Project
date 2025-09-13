package com.backend.dto.request;

public record RegisterReq(
        String email,
        String password,
        String username  // optional: null thì dùng email
//        String fullName,   // optional: nếu bạn đã override user ở Strapi
//        String studentId,  // optional
//        Long   department  // optional (id)
) {}
