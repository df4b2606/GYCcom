package com.example.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

/**
 * Configuration class to load environment variables from .env file
 * This allows Spring Boot to read .env files for local development
 */
@Configuration
public class DotenvConfig {

    @PostConstruct
    public void loadDotenv() {
        try {
            // Load .env file from the project root
            Dotenv dotenv = Dotenv.configure()
                    .directory("./") // Look for .env in project root
                    .ignoreIfMalformed()
                    .ignoreIfMissing() // Don't fail if .env doesn't exist
                    .load();

            // Set system properties for each environment variable
            dotenv.entries().forEach(entry -> {
                String key = entry.getKey();
                String value = entry.getValue();
                
                // Only set if not already set (allows override via system properties)
                if (System.getProperty(key) == null) {
                    System.setProperty(key, value);
                }
            });
            
            System.out.println("✅ Loaded .env file successfully");
        } catch (Exception e) {
            System.out.println("⚠️  No .env file found or error loading it: " + e.getMessage());
            System.out.println("💡 You can create a .env file in the project root for local development");
        }
    }
}
