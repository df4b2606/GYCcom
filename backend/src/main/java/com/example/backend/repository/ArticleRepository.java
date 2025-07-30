package com.example.backend.repository;

import com.example.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // Check if shortUrl exists
    Optional<Article> findByShortUrl(String shortUrl);
    
    // Check if shortUrl exists (boolean version)
    boolean existsByShortUrl(String shortUrl);
}