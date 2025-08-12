package com.example.backend.controller;

import com.example.backend.dto.TagDTO;
import com.example.backend.entity.Tag;
import com.example.backend.service.TagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@CrossOrigin(origins = "*")
public class TagController {
    private static final Logger logger = LoggerFactory.getLogger(TagController.class);
    
    @Autowired
    private TagService tagService;
    
    /**
     * Create a new tag
     */
    @PostMapping
    public ResponseEntity<Tag> createTag(@RequestBody TagDTO tagDTO) {
        logger.info("🚀 Creating tag: {}", tagDTO.getName());
        Tag createdTag = tagService.createTag(tagDTO);
        return ResponseEntity.ok(createdTag);
    }
    
    /**
     * Get all active tags
     */
    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags() {
        logger.debug("📋 Getting all active tags");
        List<Tag> tags = tagService.getAllActiveTags();
        return ResponseEntity.ok(tags);
    }
    
    /**
     * Get tag by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        logger.debug("🔍 Getting tag by ID: {}", id);
        return tagService.getTagById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Get tag by name
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<Tag> getTagByName(@PathVariable String name) {
        logger.debug("🔍 Getting tag by name: {}", name);
        return tagService.getTagByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Find or create tag by name
     */
    @PostMapping("/find-or-create")
    public ResponseEntity<Tag> findOrCreateTag(@RequestBody TagNameRequest request) {
        logger.debug("🔍 Finding or creating tag: {}", request.getName());
        Tag tag = tagService.findOrCreateTag(request.getName());
        return ResponseEntity.ok(tag);
    }
    
    // Inner class for request body
    public static class TagNameRequest {
        private String name;
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
    }
} 