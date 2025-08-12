package com.example.backend.service;

import com.example.backend.common.ErrorCode;
import com.example.backend.dto.TagDTO;
import com.example.backend.entity.Tag;
import com.example.backend.exception.BusinessException;
import com.example.backend.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {
    private static final Logger logger = LoggerFactory.getLogger(TagService.class);
    
    @Autowired
    private TagRepository tagRepository;
    
    /**
     * Create a new tag
     */
    @Transactional
    public Tag createTag(TagDTO tagDTO) {
        logger.info("🚀 Creating tag: {}", tagDTO.getName());
        
        // Check if tag already exists
        if (tagRepository.existsByName(tagDTO.getName())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Tag name already exists: " + tagDTO.getName());
        }
        
        Tag tag = new Tag();
        tag.setName(tagDTO.getName());
        tag.setDescription(tagDTO.getDescription());
        tag.setColor(tagDTO.getColor());
        tag.setIsActive(tagDTO.getIsActive());
        tag.setSortOrder(tagDTO.getSortOrder());
        
        try {
            Tag savedTag = tagRepository.save(tag);
            logger.info("✅ Tag created successfully! ID: {}, Name: {}", savedTag.getId(), savedTag.getName());
            return savedTag;
        } catch (Exception e) {
            logger.error("❌ Failed to create tag: {}", e.getMessage(), e);
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "Failed to create tag");
        }
    }
    
    /**
     * Find or create tag by name
     */
    @Transactional
    public Tag findOrCreateTag(String tagName) {
        logger.debug("🔍 Finding or creating tag: {}", tagName);
        
        // Try to find existing tag
        Optional<Tag> existingTag = tagRepository.findByNameIgnoreCase(tagName);
        if (existingTag.isPresent()) {
            logger.debug("✅ Found existing tag: {}", tagName);
            return existingTag.get();
        }
        
        // Create new tag if not exists
        logger.debug("🆕 Creating new tag: {}", tagName);
        TagDTO tagDTO = new TagDTO();
        tagDTO.setName(tagName);
        tagDTO.setDescription("Auto-generated tag for: " + tagName);
        
        return createTag(tagDTO);
    }
    
    /**
     * Find or create multiple tags by names
     */
    @Transactional
    public List<Tag> findOrCreateTags(List<String> tagNames) {
        logger.debug("🔍 Finding or creating tags: {}", tagNames);
        
        return tagNames.stream()
                .map(this::findOrCreateTag)
                .collect(Collectors.toList());
    }
    
    /**
     * Get tag by ID
     */
    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }
    
    /**
     * Get tag by name
     */
    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);
    }
    
    /**
     * Get all active tags
     */
    public List<Tag> getAllActiveTags() {
        return tagRepository.findByIsActiveTrueOrderBySortOrderAsc();
    }
    
    /**
     * Update tag usage count
     */
    @Transactional
    public void incrementUsageCount(Long tagId) {
        Optional<Tag> tagOpt = tagRepository.findById(tagId);
        if (tagOpt.isPresent()) {
            Tag tag = tagOpt.get();
            tag.setUsageCount(tag.getUsageCount() + 1);
            tagRepository.save(tag);
            logger.debug("📈 Incremented usage count for tag: {}", tag.getName());
        }
    }
    
    /**
     * Decrease tag usage count
     */
    @Transactional
    public void decrementUsageCount(Long tagId) {
        Optional<Tag> tagOpt = tagRepository.findById(tagId);
        if (tagOpt.isPresent()) {
            Tag tag = tagOpt.get();
            if (tag.getUsageCount() > 0) {
                tag.setUsageCount(tag.getUsageCount() - 1);
                tagRepository.save(tag);
                logger.debug("📉 Decremented usage count for tag: {}", tag.getName());
            }
        }
    }
} 