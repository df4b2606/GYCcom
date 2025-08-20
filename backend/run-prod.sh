#!/bin/bash

# Production Deployment Script for Spring Boot Backend
# This script runs the backend in production mode with Supabase

echo "🚀 Starting Backend in Production Mode..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with your Supabase credentials."
    echo "Copy from env.example and update with real values."
    exit 1
fi

# Load environment variables from .env file
echo "📋 Loading environment variables..."
export $(cat .env | grep -v '^#' | xargs)

# Verify required variables are set
required_vars=("SUPABASE_DB_URL" "SUPABASE_DB_USERNAME" "SUPABASE_DB_PASSWORD")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: $var is not set in .env file"
        exit 1
    fi
done

echo "✅ Environment variables loaded successfully"
echo "📊 Configuration:"
echo "   Profile: ${SPRING_PROFILES_ACTIVE:-prod}"
echo "   Port: ${SERVER_PORT:-8080}"
echo "   Database: Supabase Transaction Pooler"

# Build the application
echo "🔨 Building application..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful"

# Run the application
echo "🚀 Starting Spring Boot application in production mode..."
echo "📱 Application will be available at: http://localhost:${SERVER_PORT:-8080}"
echo "📋 Swagger UI is disabled in production mode for security"
echo "🛑 Press Ctrl+C to stop the application"
echo ""

java -jar target/*.jar \
  --spring.profiles.active=prod \
  --server.port=${SERVER_PORT:-8080} \
  --spring.datasource.url="${SUPABASE_DB_URL}" \
  --spring.datasource.username="${SUPABASE_DB_USERNAME}" \
  --spring.datasource.password="${SUPABASE_DB_PASSWORD}"
