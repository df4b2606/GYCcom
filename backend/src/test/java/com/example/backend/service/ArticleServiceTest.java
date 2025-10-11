package com.example.backend.service;

import com.example.backend.common.ErrorCode;
import com.example.backend.dto.ArticleDTO;
import com.example.backend.entity.Article;
import com.example.backend.entity.Category;
import com.example.backend.entity.Tag;
import com.example.backend.exception.BusinessException;
import com.example.backend.metrics.TaskTimer;
import com.example.backend.repository.ArticleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;
    @Mock
    private TagService tagService;
    @Mock
    private CategoryService categoryService;
    @Mock
    private CacheManager cacheManager;
    @Mock
    private TaskTimer taskTimer;

    @Mock
    private Cache tagsCache;
    @Mock
    private Cache articlesCache;

    @InjectMocks
    private ArticleService articleService;

    @Captor
    private ArgumentCaptor<Article> articleCaptor;

    @BeforeEach
    void setup() throws Exception {
        // Use lenient stubbing to avoid UnnecessaryStubbing when a test doesn't touch caches
        lenient().when(cacheManager.getCache("tags")).thenReturn(tagsCache);
        lenient().when(cacheManager.getCache("articles")).thenReturn(articlesCache);
        lenient().when(taskTimer.time(anyString(), Mockito.<java.util.concurrent.Callable<Object>>any()))
                .thenAnswer(invocation -> {
                    @SuppressWarnings("unchecked")
                    java.util.concurrent.Callable<Object> callable = (java.util.concurrent.Callable<Object>) invocation.getArgument(1);
                    return callable.call();
                });
    }

    @Test
    @DisplayName("createArticle should persist, set excerpt/shortUrl, handle tags and category")
    void testCreateArticleSuccess() throws Exception {
        ArticleDTO dto = new ArticleDTO();
        dto.setTitle("你好 Java World");
        dto.setContent("Some content with code ```ignored``` and more text.");
        dto.setAuthor("me");
        dto.setBackgroundImageUrl("bg.jpg");
        dto.setTags(Arrays.asList("java", "spring"));
        dto.setCategory("backend");

        Tag tag1 = new Tag(); tag1.setId(1L); tag1.setName("java");
        Tag tag2 = new Tag(); tag2.setId(2L); tag2.setName("spring");
        when(tagService.findOrCreateTags(dto.getTags())).thenReturn(List.of(tag1, tag2));

        Category category = new Category();
        category.setId(10);
        category.setName("backend");
        when(categoryService.findOrCreateByName("backend")).thenReturn(category);

        when(articleRepository.save(any(Article.class))).thenAnswer(inv -> {
            Article saved = inv.getArgument(0);
            saved.setId(100);
            return saved;
        });

        Article saved = articleService.createArticle(dto);

        assertNotNull(saved.getId());
        assertNotNull(saved.getShortUrl());
        assertNotNull(saved.getExcerpt());
        assertEquals(2, saved.getTags().size());
        assertEquals(10L, saved.getCategory().getId());

        verify(tagService, times(1)).findOrCreateTags(dto.getTags());
        verify(tagService, times(1)).incrementUsageCount(1L);
        verify(tagService, times(1)).incrementUsageCount(2L);
        verify(tagsCache, times(1)).evict("'allactive'");
        verify(articlesCache, times(1)).evict("category_" + category.getId());
    }

    @Test
    @DisplayName("createArticle should wrap repository error into BusinessException")
    void testCreateArticleFailure() throws Exception {
        ArticleDTO dto = new ArticleDTO();
        dto.setTitle("Test");

        when(articleRepository.save(any(Article.class))).thenThrow(new RuntimeException("db fail"));

        BusinessException ex = assertThrows(BusinessException.class, () -> articleService.createArticle(dto));
        assertEquals(ErrorCode.OPERATION_ERROR, ex.getCode());
    }

    @Test
    @DisplayName("getAllArticles delegates to repository and returns list")
    void testGetAllArticles() throws Exception {
        when(articleRepository.findAllWithCategoryAndTags()).thenReturn(List.of(new Article(), new Article()));
        lenient().when(taskTimer.time(eq("get_all_articles"), Mockito.<java.util.concurrent.Callable<Object>>any()))
                .thenAnswer(inv -> {
                    @SuppressWarnings("unchecked")
                    java.util.concurrent.Callable<Object> callable = (java.util.concurrent.Callable<Object>) inv.getArgument(1);
                    return callable.call();
                });

        var list = articleService.getAllArticles();
        assertEquals(2, list.size());
    }

    @Test
    @DisplayName("getRequiredById should throw BusinessException when not found")
    void testGetRequiredByIdNotFound() {
        when(articleRepository.findById(999L)).thenReturn(Optional.empty());
        BusinessException ex = assertThrows(BusinessException.class, () -> articleService.getRequiredById(999L));
        assertEquals(ErrorCode.NOT_FOUND, ex.getCode());
    }

    @Test
    @DisplayName("getRequiredByShortUrl should rethrow as BusinessException on repo error")
    void testGetRequiredByShortUrlRepoError() {
        when(articleRepository.findByShortUrl("slug")).thenThrow(new RuntimeException("db"));
        BusinessException ex = assertThrows(BusinessException.class, () -> articleService.getRequiredByShortUrl("slug"));
        assertEquals(ErrorCode.SERVER_ERROR, ex.getCode());
    }

    @Test
    @DisplayName("getArticlesByAnyTagNames validates input and queries repo")
    void testGetArticlesByAnyTagNames() {
        assertThrows(BusinessException.class, () -> articleService.getArticlesByAnyTagNames(List.of()));

        when(articleRepository.findByAnyTagNames(List.of("a","b"))).thenReturn(List.of(new Article()));
        var res = articleService.getArticlesByAnyTagNames(List.of("a","b"));
        assertEquals(1, res.size());
    }

    @Test
    @DisplayName("getArticlesByCategoryId should return list from repo")
    void testGetArticlesByCategoryId() {
        when(articleRepository.findByCategoryIdWithCategoryAndTags(1L)).thenReturn(List.of(new Article(), new Article(), new Article()));
        var res = articleService.getArticlesByCategoryId(1L);
        assertEquals(3, res.size());
    }
}


