package com.example.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ArticleParserTest {

    @Test
    @DisplayName("generateShortUrl should convert Chinese to pinyin and normalize")
    void testGenerateShortUrlWithChineseAndEnglish() {
        String input = "你好 世界 Hello-World!";
        String result = ArticleParser.generateShortUrl(input);
        assertNotNull(result);
        assertTrue(result.contains("nihao") || result.contains("ni-hao"), "Should contain pinyin of 你好");
        assertTrue(result.contains("hello-world"), "Should keep english words and hyphens");
        assertEquals(result, result.toLowerCase(), "Should be lowercase");
        assertFalse(result.contains("!"), "Should remove punctuation");
    }

    @Test
    @DisplayName("generateShortUrl should limit word count to 10")
    void testGenerateShortUrlWordLimit() {
        String input = "a b c d e f g h i j k l m";
        String result = ArticleParser.generateShortUrl(input);
        // max 10 separators means at most 10 words considered
        assertTrue(result.split("-").length <= 10);
    }

    @Test
    @DisplayName("extractImages should return all markdown image URLs")
    void testExtractImages() {
        String md = "before ![alt](https://a.com/1.png) mid ![x](http://b/2.jpg) after";
        String[] urls = ArticleParser.extractImages(md);
        assertArrayEquals(new String[]{"https://a.com/1.png", "http://b/2.jpg"}, urls);
    }

    @Test
    @DisplayName("generateToc should build hierarchical toc and return JSON")
    void testGenerateToc() throws JsonProcessingException {
        String md = "# Title\n\n## Section 1\n### Sub 1.1\n## Section 2\n" +
                "```\n# Not A Heading Inside Code\n```\n";
        String json = ArticleParser.generateToc(md);
        assertNotNull(json);
        assertTrue(json.startsWith("["));
        assertTrue(json.contains("\"name\":"));
        assertTrue(json.contains("\"children\":"));
        // Anchors should follow article-md-title- pattern
        assertTrue(json.contains("article-md-title-"));
    }
}


