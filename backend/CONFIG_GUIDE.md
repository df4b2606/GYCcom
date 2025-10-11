# Configuration Guide

## Overview

The application configuration is split into three files for better environment management:

- `application.yml` - Common configuration for all environments
- `application-dev.yml` - Development environment specific configuration
- `application-prod.yml` - Production environment specific configuration

## Environment Profiles

### Development (dev)

- **Database**: Local PostgreSQL
- **Logging**: Debug level with SQL logging
- **Swagger UI**: Enabled
- **Knife4j**: Enabled

### Production (prod)

- **Database**: Supabase PostgreSQL
- **Logging**: Warn level, file-based logging
- **Swagger UI**: Disabled for security
- **Knife4j**: Disabled
- **DDL Auto**: Set to `validate` for safety

## Environment Variables

Create a `.env` file based on `env.example` and set the following variables:

### Required for All Environments

```bash
SPRING_PROFILES_ACTIVE=dev  # or prod
SERVER_PORT=8080
```

### Required for Production

```bash
SUPABASE_DB_URL=jdbc:postgresql://db.your-supabase-project.supabase.co:5432/postgres
SUPABASE_DB_USERNAME=postgres
SUPABASE_DB_PASSWORD=your-password
```

## Usage

### Running in Development

```bash
# Method 1: Using environment variable
export SPRING_PROFILES_ACTIVE=dev
mvn spring-boot:run

# Method 2: Using Maven profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Method 3: Using application properties
java -jar target/app.jar --spring.profiles.active=dev
```

### Running in Production

```bash
# Method 1: Using environment variable
export SPRING_PROFILES_ACTIVE=prod
export SUPABASE_DB_URL=your-supabase-url
export SUPABASE_DB_USERNAME=your-username
export SUPABASE_DB_PASSWORD=your-password
java -jar target/app.jar

# Method 2: Using application properties
java -jar target/app.jar --spring.profiles.active=prod \
  --spring.datasource.url=your-supabase-url \
  --spring.datasource.username=your-username \
  --spring.datasource.password=your-password
```

## Supabase Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Go to Settings → Database
3. Choose the appropriate connection method:

### Connection Options

#### Transaction Pooler (Recommended for Production)

- **Port**: 6543
- **URL Format**: `jdbc:postgresql://db.your-project.supabase.co:6543/postgres`
- **Benefits**: Better concurrency, can handle more simultaneous connections
- **Requirements**: Prepared statement caching MUST be disabled

#### Direct Connection

- **Port**: 5432
- **URL Format**: `jdbc:postgresql://db.your-project.supabase.co:5432/postgres`
- **Benefits**: Full PostgreSQL feature support
- **Limitations**: Lower connection limit

### Configuration

Update environment variables:

- `SUPABASE_DB_URL`: Use Transaction Pooler URL (port 6543) for production
- `SUPABASE_DB_USERNAME`: Usually `postgres`
- `SUPABASE_DB_PASSWORD`: Your database password

### Important: Transaction Pooler Configuration

When using Transaction Pooler (port 6543), the following are automatically configured:

- Prepared statement caching is disabled
- Simple query mode is used
- Hibernate statement cache is disabled
- Connection pooling is optimized for pooler compatibility

## Security Notes

- Never commit sensitive information like passwords to version control
- Use environment variables for all sensitive configuration
- In production, disable Swagger UI and detailed error messages
- Use `validate` DDL mode in production to prevent accidental schema changes

## Logging

### Development

- Console output with formatted SQL
- Debug level logging for application packages
- SQL parameter binding traces

### Production

- File-based logging with rotation
- Warn level logging to reduce noise
- No SQL logging for performance
- Log files stored in `logs/` directory
