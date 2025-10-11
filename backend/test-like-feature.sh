#!/bin/bash

# Test Like Feature Script
# This script tests the like functionality of the backend API

echo "Testing Like Feature..."
echo "========================"

# Base URL
BASE_URL="http://localhost:8080"

# Test data
ARTICLE_ID=1
DEVICE_ID="test_device_$(date +%s)"

echo "Using Article ID: $ARTICLE_ID"
echo "Using Device ID: $DEVICE_ID"
echo ""

# Test 1: Check initial like count
echo "1. Getting initial like count..."
INITIAL_COUNT=$(curl -s "$BASE_URL/article/$ARTICLE_ID/like/count")
echo "   Initial like count: $INITIAL_COUNT"
echo ""

# Test 2: Check initial like status
echo "2. Checking initial like status..."
INITIAL_STATUS=$(curl -s "$BASE_URL/article/$ARTICLE_ID/like/status?deviceId=$DEVICE_ID")
echo "   Initially liked: $INITIAL_STATUS"
echo ""

# Test 3: Like the article
echo "3. Liking the article..."
LIKE_RESPONSE=$(curl -s -X POST "$BASE_URL/article/like" \
  -H "Content-Type: application/json" \
  -d "{\"articleId\": $ARTICLE_ID, \"deviceId\": \"$DEVICE_ID\"}")
echo "   Like response: $LIKE_RESPONSE"
echo ""

# Test 4: Check like count after like
echo "4. Getting like count after like..."
AFTER_LIKE_COUNT=$(curl -s "$BASE_URL/article/$ARTICLE_ID/like/count")
echo "   Like count after like: $AFTER_LIKE_COUNT"
echo ""

# Test 5: Check like status after like
echo "5. Checking like status after like..."
AFTER_LIKE_STATUS=$(curl -s "$BASE_URL/article/$ARTICLE_ID/like/status?deviceId=$DEVICE_ID")
echo "   Liked after like: $AFTER_LIKE_STATUS"
echo ""

# Test 6: Unlike the article
echo "6. Unliking the article..."
UNLIKE_RESPONSE=$(curl -s -X POST "$BASE_URL/article/like" \
  -H "Content-Type: application/json" \
  -d "{\"articleId\": $ARTICLE_ID, \"deviceId\": \"$DEVICE_ID\"}")
echo "   Unlike response: $UNLIKE_RESPONSE"
echo ""

# Test 7: Check final like count
echo "7. Getting final like count..."
FINAL_COUNT=$(curl -s "$BASE_URL/article/$ARTICLE_ID/like/count")
echo "   Final like count: $FINAL_COUNT"
echo ""

# Test 8: Check final like status
echo "8. Checking final like status..."
FINAL_STATUS=$(curl -s "$BASE_URL/article/$ARTICLE_ID/like/status?deviceId=$DEVICE_ID")
echo "   Finally liked: $FINAL_STATUS"
echo ""

echo "========================"
echo "Test completed!"

# Summary
echo ""
echo "Summary:"
echo "- Initial count: $INITIAL_COUNT"
echo "- After like: $AFTER_LIKE_COUNT"
echo "- Final count: $FINAL_COUNT"
echo "- Initial status: $INITIAL_STATUS"
echo "- After like status: $AFTER_LIKE_STATUS"
echo "- Final status: $FINAL_STATUS"

# Verify results
if [ "$INITIAL_COUNT" = "$FINAL_COUNT" ] && [ "$INITIAL_STATUS" = "$FINAL_STATUS" ]; then
    echo "✅ Test PASSED: Like count and status returned to initial state"
else
    echo "❌ Test FAILED: State mismatch detected"
fi
