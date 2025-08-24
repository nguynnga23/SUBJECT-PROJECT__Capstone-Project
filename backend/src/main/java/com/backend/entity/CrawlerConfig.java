package com.backend.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.*;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "crawler_configs")
public class CrawlerConfig {
    @Id
    @UuidGenerator
    @JdbcTypeCode(SqlTypes.UUID)
    @Column(name = "id", nullable = false, updatable = false, columnDefinition = "uuid")
    private UUID id;

    @Column(name = "relative_url_list", length = Integer.MAX_VALUE)
    private String relativeUrlList;

    @Column(name = "relative_url", length = Integer.MAX_VALUE)
    private String relativeUrl;

    @Column(name = "thumbnail", length = Integer.MAX_VALUE)
    private String thumbnail;

    @Column(name = "next_pages", length = Integer.MAX_VALUE)
    private String nextPages;

    @Column(name = "title", length = Integer.MAX_VALUE)
    private String title;

    @Column(name = "content", length = Integer.MAX_VALUE)
    private String content;

    @Column(name = "external_publish_date", length = Integer.MAX_VALUE)
    private String externalPublishDate;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "department_website_id")
    private DepartmentWebsite departmentWebsite;

}