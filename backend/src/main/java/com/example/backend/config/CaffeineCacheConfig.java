package com.example.backend.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CaffeineCacheConfig {

    @Bean("caffeineCacheManager")
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .initialCapacity(100)           // Initial capacity 100
                .maximumSize(500)               // Maximum capacity 500
                .expireAfterWrite(24, TimeUnit.HOURS)    // Expire after 24 hours
                .expireAfterAccess(12, TimeUnit.HOURS)   // Expire after 12 hours of no access
                .recordStats());                // Record statistics
        return cacheManager;
    }
}
