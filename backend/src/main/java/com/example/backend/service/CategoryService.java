package com.example.backend.service;

import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.exception.BusinessException;
import com.example.backend.common.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;
import java.util.Random;

@Service
public class CategoryService {
    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);
    
    @Autowired
    private CategoryRepository categoryRepository;

    // Pleasant solid colors (hex). These will be used when a category is created without an explicit color.
    private static final String[] COLORS = {
        "#ef4444", // red-500
        "#f97316", // orange-500
        "#f59e0b", // amber-500
        "#10b981", // emerald-500
        "#22c55e", // green-500
        "#06b6d4", // cyan-500
        "#3b82f6", // blue-500
        "#6366f1", // indigo-500
        "#8b5cf6", // violet-500
        "#a855f7", // purple-500
        "#ec4899", // pink-500
        "#14b8a6", // teal-500
        "#64748b"  // slate-500 (fallback neutral)
    };

    private final Random random = new Random();

    private String getRandomColor() {
        return COLORS[random.nextInt(COLORS.length)];
    }

    /**
     * Find a category by name or create a new one. If a new category is created
     * and no color is provided externally, assign a pleasant random solid color.
     */
    public Category findOrCreateByName(String name) {
        if (name == null || name.isBlank()) {
            return null;
        }
        Optional<Category> existing = categoryRepository.findByName(name);
        return existing.orElseGet(() -> {
            Category c = new Category();
            c.setName(name);
            // Assign a random solid color by default
            c.setColor(getRandomColor());
            return categoryRepository.save(c);
        });
    }

    /**
     * Find category by ID
     * @param id Category ID
     * @return Optional<Category> - Category if found, empty if not found
     */
    public Optional<Category> findById(Long id) {
        if (id == null) {
            logger.warn("⚠️ Category ID is null");
            return Optional.empty();
        }
        
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isPresent()) {
                logger.debug("✅ Found category by ID: {} - {}", id, category.get().getName());
            } else {
                logger.debug("⚠️ Category not found by ID: {}", id);
            }
            return category;
        } catch (Exception e) {
            logger.error("❌ Error finding category by ID: {}", id, e);
            return Optional.empty();
        }
    }

    /**
     * Find category by ID or throw exception if not found
     * @param id Category ID
     * @return Category - Category if found
     * @throws BusinessException if category not found
     */
    public Category findByIdOrThrow(Long id) {
        return findById(id)
            .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "Category not found with ID: " + id));
    }
}

