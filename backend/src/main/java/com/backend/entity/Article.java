package com.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "articles")
public class Article {
    @Id
    @ColumnDefault("uuid_generate_v4()")
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false, length = Integer.MAX_VALUE)
    private String title;

    @Column(name = "content", length = Integer.MAX_VALUE)
    private String content;

    @Column(name = "summary", length = Integer.MAX_VALUE)
    private String summary;

    @Column(name = "thumbnail", length = Integer.MAX_VALUE)
    private String thumbnail;

    @Column(name = "external_uri", length = Integer.MAX_VALUE)
    private String externalUri;

    @Column(name = "external_slug", length = Integer.MAX_VALUE)
    private String externalSlug;

    @Column(name = "external_publish_date")
    private LocalDate externalPublishDate;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "category_id")
    private Category category;

}