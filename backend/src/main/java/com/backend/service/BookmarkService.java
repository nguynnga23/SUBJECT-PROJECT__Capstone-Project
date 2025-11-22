package com.backend.service;

import com.backend.dto.request.BookmarkReq;
import com.backend.strapi.vm.BookmarkVM;

import java.util.List;

public interface BookmarkService {

    List<BookmarkVM> listAll();

    List<BookmarkVM> getByUser(String userId);

    Object create(BookmarkReq req);

    void delete(String id);

    BookmarkCheckResult checkBookmark(String userId, String articleId);

    record BookmarkCheckResult(boolean exists, String bookmarkId) {}
}
