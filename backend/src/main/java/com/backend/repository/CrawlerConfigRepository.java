package com.backend.repository;

import com.backend.entity.CrawlerConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CrawlerConfigRepository extends JpaRepository<CrawlerConfig, UUID> {
}
