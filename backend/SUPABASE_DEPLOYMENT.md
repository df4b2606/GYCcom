# Supabase Production Deployment Guide

## 🚀 Supabase Transaction Pooler Configuration

This application is optimized for **Supabase Transaction Pooler** to handle high concurrency in production.

## ⚡ Why Transaction Pooler?

### Benefits

- **Higher Concurrency**: Supports more simultaneous connections
- **Better Performance**: Optimized connection management
- **Cost Effective**: Reduces connection overhead
- **Scalability**: Handles traffic spikes better

### Connection Limits Comparison

| Connection Type           | Max Connections   | Best For                 |
| ------------------------- | ----------------- | ------------------------ |
| Direct (5432)             | ~100 connections  | Development, small apps  |
| Transaction Pooler (6543) | ~3000 connections | Production, high traffic |

## 🔧 Configuration Details

### Database URL Format

```bash
# Transaction Pooler (Recommended for Production)
SUPABASE_DB_URL=jdbc:postgresql://db.your-project.supabase.co:6543/postgres

# Direct Connection (Development only)
SUPABASE_DB_URL=jdbc:postgresql://db.your-project.supabase.co:5432/postgres
```

### Critical Configuration Applied

#### 1. Prepared Statement Caching Disabled

```yaml
# In application-prod.yml
hikari:
  data-source-properties:
    prepareStatementCacheQueries: 0
    prepareStatementCacheSizeMiB: 0
    cachePreparedStatements: false
    preferQueryMode: simple
    prepareThreshold: 0
```

#### 2. Hibernate Statement Cache Disabled

```yaml
hibernate:
  properties:
    hibernate:
      statement_cache.size: 0
      query.plan_cache_max_size: 0
```

## 🛠️ Setup Steps

### 1. Get Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Copy the connection details

### 2. Configure Environment Variables

```bash
# Production environment
SPRING_PROFILES_ACTIVE=prod
SUPABASE_DB_URL=jdbc:postgresql://db.xxxxx.supabase.co:6543/postgres
SUPABASE_DB_USERNAME=postgres
SUPABASE_DB_PASSWORD=your-actual-password
```

### 3. Verify Configuration

```bash
# Test connection
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

## 📊 Performance Tuning

### Connection Pool Settings

```yaml
hikari:
  maximum-pool-size: 20 # Adjust based on your needs
  minimum-idle: 5 # Keep some connections warm
  idle-timeout: 300000 # 5 minutes
  max-lifetime: 1200000 # 20 minutes
  connection-timeout: 30000 # 30 seconds
```

### Recommended Pool Sizes by App Size

| App Type              | Max Pool Size | Min Idle |
| --------------------- | ------------- | -------- |
| Small (< 100 users)   | 10            | 2        |
| Medium (< 1000 users) | 20            | 5        |
| Large (< 10000 users) | 50            | 10       |
| Enterprise            | 100+          | 20+      |

## 🚨 Common Issues & Solutions

### Issue 1: Connection Timeouts

```
Caused by: org.postgresql.util.PSQLException: Connection timeout
```

**Solution**: Increase connection timeout

```yaml
hikari:
  connection-timeout: 30000 # Increase from default 30s
```

### Issue 2: Prepared Statement Errors

```
ERROR: prepared statement "S_1" does not exist
```

**Solution**: Verify prepared statement caching is disabled (already configured)

### Issue 3: Too Many Connections

```
FATAL: remaining connection slots are reserved
```

**Solution**:

1. Use Transaction Pooler (port 6543) instead of direct connection
2. Reduce maximum-pool-size if necessary

## 🔍 Monitoring & Debugging

### Enable Connection Pool Logging

```yaml
logging:
  level:
    com.zaxxer.hikari: DEBUG
    com.zaxxer.hikari.HikariConfig: DEBUG
```

### Health Check Query

```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';

-- Check connection source
SELECT application_name, count(*)
FROM pg_stat_activity
GROUP BY application_name;
```

## 🏗️ Deployment Platforms

### Heroku

```bash
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set SUPABASE_DB_URL="jdbc:postgresql://db.xxx.supabase.co:6543/postgres"
heroku config:set SUPABASE_DB_USERNAME=postgres
heroku config:set SUPABASE_DB_PASSWORD=your-password
```

### Railway

```bash
railway variables:set SPRING_PROFILES_ACTIVE=prod
railway variables:set SUPABASE_DB_URL="jdbc:postgresql://db.xxx.supabase.co:6543/postgres"
railway variables:set SUPABASE_DB_USERNAME=postgres
railway variables:set SUPABASE_DB_PASSWORD=your-password
```

### Docker

```yaml
# docker-compose.yml
environment:
  - SPRING_PROFILES_ACTIVE=prod
  - SUPABASE_DB_URL=jdbc:postgresql://db.xxx.supabase.co:6543/postgres
  - SUPABASE_DB_USERNAME=postgres
  - SUPABASE_DB_PASSWORD=${SUPABASE_DB_PASSWORD}
```

## ✅ Deployment Checklist

- [ ] ✅ Using Transaction Pooler (port 6543)
- [ ] ✅ Prepared statement caching disabled
- [ ] ✅ Hibernate statement cache disabled
- [ ] ✅ Environment variables configured
- [ ] ✅ Connection pool size optimized
- [ ] ✅ DDL mode set to `validate`
- [ ] ✅ Swagger UI disabled in production
- [ ] ✅ Logging configured for production
- [ ] ✅ Error messages sanitized

## 📞 Support

### Supabase Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Connection Pooling Guide](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Performance Tips](https://supabase.com/docs/guides/database/postgres/configuration)

### Troubleshooting

1. Check Supabase project status
2. Verify connection string format
3. Test with direct connection first (port 5432)
4. Check application logs for specific errors
5. Monitor connection pool metrics

---

**Ready for production with Supabase Transaction Pooler! 🎉**
