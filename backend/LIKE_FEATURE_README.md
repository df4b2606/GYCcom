# Like Feature Implementation

## Overview

This document describes the implementation of the like feature for articles in the GYCcom backend application.

## Features

- **Toggle Like**: Users can like/unlike articles by clicking the like button
- **Like Count**: Real-time like count for each article
- **Device-based Tracking**: Uses device ID to track user likes (can be upgraded to user ID later)
- **Atomic Operations**: Uses Redis Lua scripts to ensure data consistency

## Architecture

### Components

1. **LikeService**: Core business logic for like operations
2. **ArticleController**: REST API endpoints for like functionality
3. **Redis**: Data storage for like data and counts
4. **Lua Script**: Atomic operations for like/unlike

### Data Structure

- `like:art:{articleId}`: Set of device IDs that liked the article
- `like:cnt:{articleId}`: Total like count for the article

## API Endpoints

### 1. Toggle Like
```
POST /article/like
Content-Type: application/json

{
  "articleId": 1,
  "deviceId": "device_123456"
}
```

**Response:**
```json
{
  "articleId": 1,
  "deviceId": "device_123456",
  "isLiked": true,
  "likeCount": 42,
  "message": "Successfully liked the article"
}
```

### 2. Get Like Count
```
GET /article/{articleId}/like/count
```

**Response:**
```json
42
```

### 3. Check Like Status
```
GET /article/{articleId}/like/status?deviceId=device_123456
```

**Response:**
```json
true
```

## Usage

### Frontend Integration

1. **Like Button Click**: Call `/article/like` endpoint when user clicks like button
2. **Update UI**: Use response to update like button state and count
3. **Initial State**: Call `/article/{articleId}/like/status` to get initial like state

### Example Frontend Code

```typescript
const handleLikeClick = async () => {
  try {
    const response = await fetch('/article/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId: article.id,
        deviceId: getDeviceId(), // Implement device ID generation
      }),
    });
    
    const result = await response.json();
    
    // Update UI based on response
    setIsLiked(result.isLiked);
    setLikeCount(result.likeCount);
    
  } catch (error) {
    console.error('Failed to toggle like:', error);
  }
};
```

## Configuration

### Redis Configuration

The application requires Redis to be running. Configuration is in `application-dev.yml`:

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    database: 0
    timeout: 2000ms
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
        max-wait: -1ms
```

### Environment Variables

- `REDIS_HOST`: Redis server host (default: localhost)
- `REDIS_PORT`: Redis server port (default: 6379)
- `REDIS_DATABASE`: Redis database number (default: 0)

## Testing

Run the tests with:

```bash
mvn test -Dtest=LikeServiceTest
```

## Future Enhancements

1. **User Authentication**: Replace device ID with user ID for authenticated users
2. **Like History**: Track user's like history
3. **Analytics**: Like analytics and reporting
4. **Notifications**: Notify users when their articles receive likes

## Troubleshooting

### Common Issues

1. **Redis Connection Failed**: Ensure Redis is running and accessible
2. **Lua Script Error**: Check if `like.lua` file is in the resources directory
3. **Like Count Mismatch**: Verify Redis data consistency

### Debug Mode

Enable debug logging for Redis operations:

```yaml
logging:
  level:
    org.springframework.data.redis: debug
```

## Security Considerations

1. **Rate Limiting**: Consider implementing rate limiting for like operations
2. **Input Validation**: All inputs are validated using Bean Validation
3. **Device ID Generation**: Implement secure device ID generation on frontend
4. **Redis Security**: Ensure Redis is properly secured in production
