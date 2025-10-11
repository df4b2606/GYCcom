#!/bin/bash

# Development Mode Script for Spring Boot Backend
# This script runs the backend in development mode with local PostgreSQL

echo "🔧 Starting Backend in Development Mode..."

# Set development environment
export SPRING_PROFILES_ACTIVE=dev
export SERVER_PORT=8080

# Check if local database is running
echo "🔍 Checking local PostgreSQL connection..."
if ! pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
    echo "⚠️  Warning: Local PostgreSQL might not be running on localhost:5432"
    echo "   Please make sure PostgreSQL is started and the database 'gyccom' exists"
    echo ""
fi

echo "📊 Development Configuration:"
echo "   Profile: dev"
echo "   Port: 8080"
echo "   Database: Local PostgreSQL"
echo "   Swagger UI: http://localhost:8080/swagger-ui.html"

# Build and run
echo "🔨 Building application..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful"
echo "🚀 Starting Spring Boot application in development mode..."
echo "🛑 Press Ctrl+C to stop the application"
echo ""

mvn spring-boot:run -Dspring-boot.run.profiles=dev
