package com.example.backend.service;

import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class CategoryService {
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
}

