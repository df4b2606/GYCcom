-- Redis Like Feature Script
-- Uses Lua script to ensure atomicity of like operations and avoid concurrency issues
--
-- Script Parameters:
-- KEYS[1] = like:art:{aid}   (Set type: stores device IDs of users who liked the article)
-- KEYS[2] = like:cnt:{aid}   (String type: stores the total like count for the article)
-- ARGV[1] = deviceId         (Device ID: used to identify users, temporarily using device ID instead of user ID)
--
-- Data Structure Design:
-- 1. like:art:{aid} - Article like user set, uses Set to store device IDs with automatic deduplication
-- 2. like:cnt:{aid} - Article like count, uses String to store numbers
--
-- Business Logic:
-- 1. Check if device ID already exists in the like set
-- 2. If exists: perform unlike operation
-- 3. If not exists: perform like operation
-- 4. Return operation result and latest like count

-- Check if device ID has already liked this article
local exists = redis.call('SISMEMBER', KEYS[1], ARGV[1])

if exists == 1 then
  -- Case 1: Device ID exists in like set → perform unlike operation
  
  -- Remove device ID from like set
  redis.call('SREM', KEYS[1], ARGV[1])
  
  -- Decrease like count by 1
  local cnt = redis.call('DECR', KEYS[2])
  
  -- Prevent like count from becoming negative (safety protection)
  if cnt < 0 then
    redis.call('SET', KEYS[2], 0)
    cnt = 0
  end
  
  -- Return result: {2, latest like count}
  -- 2 indicates successful unlike operation
  return {2, tostring(cnt)}
  
else
  -- Case 2: Device ID doesn't exist in like set → perform like operation
  
  -- Add device ID to like set
  redis.call('SADD', KEYS[1], ARGV[1])
  
  -- Increase like count by 1
  local cnt = redis.call('INCR', KEYS[2])
  
  -- Return result: {0, latest like count}
  -- 0 indicates successful like operation
  return {0, tostring(cnt)}
end

-- Return Value Description:
-- First element: operation type identifier
--   - 0: like successful
--   - 2: unlike successful
-- Second element: latest total like count after operation (string format)
--
-- Usage Scenarios:
-- 1. Called when user clicks like button
-- 2. Supports toggle between like and unlike operations
-- 3. Ensures atomicity and data consistency of like operations
-- 4. Prevents duplicate likes from same device through device ID (temporary solution, can be upgraded to user ID later)