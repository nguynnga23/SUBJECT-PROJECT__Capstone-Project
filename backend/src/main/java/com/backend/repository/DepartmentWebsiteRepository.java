package com.backend.repository;

import com.backend.entity.DepartmentWebsite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DepartmentWebsiteRepository extends JpaRepository<DepartmentWebsite, UUID> {
}
