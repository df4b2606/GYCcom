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

    // 预定义的颜色数组 - 柔和的色调
    private static final String[] COLORS = {
        "from-slate-400 to-slate-500",
        "from-gray-400 to-gray-500", 
        "from-zinc-400 to-zinc-500",
        "from-neutral-400 to-neutral-500",
        "from-stone-400 to-stone-500",
        "from-slate-500 to-gray-500",
        "from-zinc-500 to-neutral-500",
        "from-stone-500 to-slate-500",
        "from-rose-400 to-pink-500",
        "from-blue-400 to-indigo-500",
        "from-emerald-400 to-teal-500",
        "from-amber-400 to-orange-500"
    };

    private final Random random = new Random();

    private String getRandomColor() {
        return COLORS[random.nextInt(COLORS.length)];
    }

    public Category findOrCreateByName(String name) {
        if (name == null || name.isBlank()) {
            return null;
        }
        Optional<Category> existing = categoryRepository.findByName(name);
        return existing.orElseGet(() -> {
            Category c = new Category();
            c.setName(name);
            c.setColor(getRandomColor()); // 随机分配颜色
            return categoryRepository.save(c);
        });
    }
}

