# Security Setup Guide

## 🔒 Database Security Configuration

This guide helps you set up secure database configuration without exposing sensitive information in your Git repository.

## 📁 File Structure

```
backend/
├── src/main/resources/
│   ├── application.yml          # Common config (safe to commit)
│   ├── application-dev.yml      # Dev config with env vars (safe to commit)
│   └── application-prod.yml     # Prod config with env vars (safe to commit)
├── .env                         # Your actual secrets (NEVER commit)
├── env.example                  # Template file (safe to commit)
└── .gitignore                   # Ignores .env files
```

## 🚀 Quick Setup

### 1. Create your .env file

```bash
cd backend
cp env.example .env
```

### 2. Edit .env with your actual credentials

```bash
# Open .env and replace placeholder values
nano .env
```

### 3. Update your actual values

```env
# Development Database
LOCAL_DB_URL=jdbc:postgresql://localhost:5432/gyccom
LOCAL_DB_USERNAME=gyc
LOCAL_DB_PASSWORD=your_actual_password_here

# Production Database (Supabase)
SUPABASE_DB_URL=jdbc:postgresql://db.xxxxx.supabase.co:5432/postgres
SUPABASE_DB_USERNAME=postgres
SUPABASE_DB_PASSWORD=your_supabase_password_here
```

## ✅ Security Checklist

- [ ] ✅ `.env` is in `.gitignore`
- [ ] ✅ No hardcoded passwords in config files
- [ ] ✅ Environment variables used for all sensitive data
- [ ] ✅ `env.example` has placeholder values only
- [ ] ✅ Production uses `validate` DDL mode
- [ ] ✅ Swagger UI disabled in production

## 🔍 Verification

### Check what will be committed:

```bash
git status
git diff --cached
```

### Ensure .env is ignored:

```bash
git check-ignore .env
# Should output: .env
```

### Test environment loading:

```bash
# Development
SPRING_PROFILES_ACTIVE=dev mvn spring-boot:run

# Production
SPRING_PROFILES_ACTIVE=prod mvn spring-boot:run
```

## 🚨 What NOT to Commit

❌ **NEVER commit these files:**

- `.env`
- `.env.local`
- `.env.production`
- `application-local.yml` (if you create one)
- Any file with actual passwords/secrets

## ✅ Safe to Commit

✅ **These files are safe to commit:**

- `application.yml` (common config)
- `application-dev.yml` (uses env vars)
- `application-prod.yml` (uses env vars)
- `env.example` (template only)
- `.gitignore`
- This guide

## 🌐 Environment Variables in Different Environments

### Local Development

Create `.env` file in backend root directory.

### Docker

```yaml
# docker-compose.yml
environment:
  - SPRING_PROFILES_ACTIVE=prod
  - SUPABASE_DB_URL=${SUPABASE_DB_URL}
  - SUPABASE_DB_USERNAME=${SUPABASE_DB_USERNAME}
  - SUPABASE_DB_PASSWORD=${SUPABASE_DB_PASSWORD}
```

### Cloud Deployment (Heroku, Railway, etc.)

Set environment variables in your platform's dashboard:

- `SPRING_PROFILES_ACTIVE=prod`
- `SUPABASE_DB_URL=your-url`
- `SUPABASE_DB_USERNAME=postgres`
- `SUPABASE_DB_PASSWORD=your-password`

## 🔧 Troubleshooting

### Environment variables not loading?

1. Check `.env` file exists in backend root
2. Verify variable names match exactly
3. No spaces around `=` in .env file
4. Restart your IDE/terminal

### Still seeing placeholder values?

1. Check `SPRING_PROFILES_ACTIVE` is set correctly
2. Verify `.env` file is in the correct location
3. Check for typos in variable names

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Verify all files are in correct locations
3. Test with simple values first
4. Check application logs for specific errors

---

**Remember: Security is everyone's responsibility! 🔐**
