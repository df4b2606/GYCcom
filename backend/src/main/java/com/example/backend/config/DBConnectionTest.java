package com.example.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class DBConnectionTest {

    private final DataSource dataSource;

    public DBConnectionTest(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostConstruct
    public void testConnection() throws SQLException {
        try (Connection conn = dataSource.getConnection()) {
            System.out.println("✅ 数据库连接成功！当前URL: " + conn.getMetaData().getURL());
        }
    }
}
