package com.example.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.sql.Connection;
import java.sql.DriverManager;

@Component
public class DBConnectionTest {
    private static final Logger logger = LoggerFactory.getLogger(DBConnectionTest.class);
    
    @Value("${spring.datasource.url}")
    private String url;
    
    @Value("${spring.datasource.username}")
    private String username;
    
    @Value("${spring.datasource.password}")
    private String password;

    @PostConstruct
    public void testConnection() {
        try {
            Connection conn = DriverManager.getConnection(url, username, password);
            logger.info("✅ Database connection successful! Current URL: {}", conn.getMetaData().getURL());
            conn.close();
        } catch (Exception e) {
            logger.error("❌ Database connection failed: {}", e.getMessage(), e);
        }
    }
}
