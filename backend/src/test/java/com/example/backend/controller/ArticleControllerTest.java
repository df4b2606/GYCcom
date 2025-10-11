package com.example.backend.controller;

import com.example.backend.dto.ArticleDTO;
import com.example.backend.entity.Article;
import com.example.backend.service.ArticleService;
import com.example.backend.service.CategoryService;
import com.example.backend.config.SecurityConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ArticleController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
public class ArticleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArticleService articleService;

    @MockBean
    private CategoryService categoryService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @DisplayName("POST /article should publish and return article")
    void testPublish() throws Exception {
        ArticleDTO dto = new ArticleDTO();
        dto.setTitle("Title");
        dto.setContent("Content with enough length");

        Article saved = new Article();
        saved.setId(1);
        saved.setTitle("Title");

        when(articleService.createArticle(any(ArticleDTO.class))).thenReturn(saved);

        mockMvc.perform(post("/article")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("Title")));
    }

    @Test
    @DisplayName("GET /article returns list")
    void testGetAllArticles() throws Exception {
        Article a1 = new Article(); a1.setId(1);
        Article a2 = new Article(); a2.setId(2);
        when(articleService.getAllArticles()).thenReturn(List.of(a1, a2));

        mockMvc.perform(get("/article"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
    }

    @Test
    @DisplayName("GET /article/{id} returns single article")
    void testGetById() throws Exception {
        Article a1 = new Article(); a1.setId(5);
        when(articleService.getRequiredById(5L)).thenReturn(a1);

        mockMvc.perform(get("/article/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(5)));
    }

    @Test
    @DisplayName("GET /article/slug/{shortUrl} returns article by slug")
    void testGetByShortUrl() throws Exception {
        Article a1 = new Article(); a1.setId(9); a1.setShortUrl("slug");
        when(articleService.getRequiredByShortUrl("slug")).thenReturn(a1);

        mockMvc.perform(get("/article/slug/slug"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(9)))
                .andExpect(jsonPath("$.shortUrl", is("slug")));
    }

    @Test
    @DisplayName("GET /article/tags supports repeated and CSV params")
    void testGetByAnyTagsCsv() throws Exception {
        Article a1 = new Article(); a1.setId(1);
        when(articleService.getArticlesByAnyTagNames(Mockito.anyList())).thenReturn(List.of(a1));

        mockMvc.perform(get("/article/tags").param("tags", "a,b,c"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", is(1)));

        mockMvc.perform(get("/article/tags").param("tags", "a").param("tags", "b"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", is(1)));
    }

    @Test
    @DisplayName("GET /article/category/{id} returns list by category id")
    void testGetByCategory() throws Exception {
        Article a1 = new Article(); a1.setId(1);
        when(articleService.getArticlesByCategoryId(7L)).thenReturn(List.of(a1));

        mockMvc.perform(get("/article/category/7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1)));
    }
}


