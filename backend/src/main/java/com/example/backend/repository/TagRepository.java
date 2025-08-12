package com.example.backend.repository;

import com.example.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    
    /**
     * Find tag by name
     */
    Optional<Tag> findByName(String name);
    
    /**
     * Find tag by name (case insensitive)
     */
    Optional<Tag> findByNameIgnoreCase(String name);
    
    /**
     * Find all active tags
     */
    List<Tag> findByIsActiveTrue();
    
    /**
     * Find all active tags ordered by sort order
     */
    List<Tag> findByIsActiveTrueOrderBySortOrderAsc();
    
    /**
     * Find tags by names
     */
    List<Tag> findByNameIn(List<String> names);
    
    /**
     * Check if tag exists by name
     */
    boolean existsByName(String name);
    
    /**
     * Find tags by usage count greater than threshold
     */
    @Query("SELECT t FROM Tag t WHERE t.usageCount > :threshold ORDER BY t.usageCount DESC")
    List<Tag> findPopularTags(@Param("threshold") int threshold);
} 