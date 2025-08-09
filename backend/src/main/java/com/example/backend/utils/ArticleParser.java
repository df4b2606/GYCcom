package com.example.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import net.sourceforge.pinyin4j.PinyinHelper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author grtsinry43
 * @date 2024/11/10 21:55
 * @description Love can withstand the long years
 */
public class ArticleParser {
    private static final Pattern IMAGE_PATTERN = Pattern.compile("!\\[.*?\\]\\((.*?)\\)");

    public static String generateToc(String content) throws JsonProcessingException {
        List<HeadingNode> toc = new ArrayList<>();
        Pattern pattern = Pattern.compile(
                "(?<!```\\R)(?m)^(#{1,6})\\s*(.+)$",
                Pattern.MULTILINE
        );

        Matcher matcher = pattern.matcher(content);
        Map<Integer, List<HeadingNode>> levelMap = new HashMap<>();
        int anchorIndex = 1;
        int minLevel = Integer.MAX_VALUE;

        // Find the minimum heading level
        while (matcher.find()) {
            int level = matcher.group(1).length();
            minLevel = Math.min(minLevel, level);
        }
        matcher.reset();  // Reset matcher to start parsing again

        // Build TOC based on minimum heading level, this prevents issues with missing level 1 headings
        while (matcher.find()) {
            int level = matcher.group(1).length();
            String text = matcher.group(2);
            String anchor = "article-md-title-" + anchorIndex++;
            HeadingNode node = new HeadingNode(text, anchor);


            if (level == minLevel) {
                toc.add(node);
            } else {
                List<HeadingNode> parentList = levelMap.get(level - 1);
                if (parentList != null && !parentList.isEmpty()) {
                    HeadingNode parent = parentList.get(parentList.size() - 1);
                    parent.getChildren().add(node);
                }
            }

            levelMap.computeIfAbsent(level, k -> new ArrayList<>()).add(node);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(toc);
    }

    @Data
    public static class HeadingNode {
        private final String name;
        private final String anchor;
        private final List<HeadingNode> children = new ArrayList<>();

        public HeadingNode(String name, String anchor) {
            this.name = name;
            this.anchor = anchor;
        }
    }

    public static String generateShortUrl(String title) {
        // Remove non-English characters from title, replace spaces with -, replace Chinese characters with pinyin, all letters lowercase
        StringBuilder pinyinTitle = new StringBuilder();
        int wordCount = 0;
        for (char c : title.toCharArray()) {
            if (Character.toString(c).matches("[\\u4e00-\\u9fa5]")) {
                String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(c);
                if (pinyinArray != null) {
                    // Remove tones
                    String pinyin = pinyinArray[0].replaceAll("[1-4]", "");
                    if (wordCount > 0) {
                        pinyinTitle.append("-");
                    }
                    pinyinTitle.append(pinyin);
                    wordCount++;
                }
            } else {
                if (Character.isWhitespace(c)) {
                    if (wordCount > 0) {
                        pinyinTitle.append("-");
                    }
                    wordCount++;
                } else {
                    pinyinTitle.append(c);
                }
            }
            if (wordCount >= 10) {
                break;
            }
        }

        return pinyinTitle.toString().replaceAll("[^a-zA-Z0-9-]", "").toLowerCase();
    }

    public static String[] extractImages(String markdown) {
        List<String> images = new ArrayList<>();
        Matcher matcher = IMAGE_PATTERN.matcher(markdown);
        while (matcher.find()) {
            images.add(matcher.group(1));
        }
        return images.toArray(new String[0]);
    }
}
