#!/bin/bash

# Set Environment Variables for Production
# Run this script before starting your application: source set-env.sh

echo "🔧 Setting up environment variables for production..."

export SPRING_PROFILES_ACTIVE=prod
export SERVER_PORT=8080

# Supabase Database Configuration
export SUPABASE_DB_URL="jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?user=postgres.ugqiskucqottfabkpgbw&password=[!Df4b2606020509]"
export SUPABASE_DB_USERNAME="df4b2606"
export SUPABASE_DB_PASSWORD="!Df4b2606020509"

echo "✅ Environment variables set successfully!"
echo "📊 Configuration:"
echo "   Profile: $SPRING_PROFILES_ACTIVE"
echo "   Port: $SERVER_PORT"
echo "   Database: Supabase Transaction Pooler"
echo ""
echo "💡 Now you can run: mvn spring-boot:run"
