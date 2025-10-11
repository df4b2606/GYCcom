package com.example.backend.repository;

import com.example.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.List;
import com.example.backend.entity.Category;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // Check if shortUrl exists
    Optional<Article> findByShortUrl(String shortUrl);

    // join fetch search to fix the N+1 problem
    @Query("SELECT DISTINCT a FROM Article a " +
           "LEFT JOIN FETCH a.category " +
           "LEFT JOIN FETCH a.tags " +
           "ORDER BY a.createdAt DESC")
    List<Article> findAllWithCategoryAndTags();
    
    // Check if shortUrl exists (boolean version)
    boolean existsByShortUrl(String shortUrl);

    List<Article> findByCategory(Category category);

   

    /**
     * Find articles that have at least one tag whose name is in the provided list (OR logic)
     */
    @Query("SELECT DISTINCT a FROM Article a JOIN a.tags t WHERE t.name IN :tagNames ORDER BY a.createdAt DESC")
    List<Article> findByAnyTagNames(@Param("tagNames") List<String> tagNames);

    @Query("SELECT DISTINCT a FROM Article a " +
       "LEFT JOIN FETCH a.category c " +
       "LEFT JOIN FETCH a.tags t " +
       "WHERE c.id = :categoryId " +
       "ORDER BY a.createdAt DESC")
    List<Article> findByCategoryIdWithCategoryAndTags(@Param("categoryId") Long categoryId);
}