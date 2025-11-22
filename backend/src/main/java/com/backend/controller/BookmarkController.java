package com.backend.controller;

import com.backend.dto.request.BookmarkReq;
import com.backend.service.BookmarkService;
import com.backend.strapi.vm.BookmarkVM;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/bookmarks")
@Slf4j
@CrossOrigin(origins = "*")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    public List<BookmarkVM> list() {
        return bookmarkService.listAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookmarkReq req) {
        if (req == null || req.userId() == null || req.articleId() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("ok", false, "message", "userId/articleId is required"));
        }

        log.info("Create bookmark req: userId={}, articleId={}", req.userId(), req.articleId());

        Object created = bookmarkService.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<BookmarkVM>> getBookmarksByUser(@PathVariable("userId") String userId) {
        List<BookmarkVM> vms = bookmarkService.getByUser(userId);
        return ResponseEntity.ok(vms);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        bookmarkService.delete(id);
        return ResponseEntity.ok(Map.of(
                "ok", true,
                "message", "Bookmark deleted successfully"
        ));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkBookmark(
            @RequestParam("userId") String userId,
            @RequestParam("articleId") String articleId
    ) {
        BookmarkService.BookmarkCheckResult result =
                bookmarkService.checkBookmark(userId, articleId);

        return ResponseEntity.ok(Map.of(
                "ok", true,
                "isBookmarked", result.exists(),
                "bookmarkId", result.bookmarkId()
        ));
    }
}
