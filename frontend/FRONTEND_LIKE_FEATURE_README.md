# Frontend Like Feature Implementation

## Overview

This document describes how to implement and use the like feature in the frontend React application.

## Features

- **Device-based Identification**: Uses UUID stored in cookies to identify users
- **Like Button Component**: Interactive like/unlike button with animations
- **Like Statistics**: Display like counts and user status
- **Batch Operations**: Efficiently manage multiple articles' like data
- **Real-time Updates**: Immediate UI updates after like operations

## Components

### 1. LikeButton

Interactive like button component with multiple sizes and configurations.

```tsx
import { LikeButton } from './components/article/LikeButton';

// Basic usage
<LikeButton 
  articleId={1}
  initialLikeCount={42}
  initialIsLiked={false}
/>

// Large button without count
<LikeButton 
  articleId={1}
  size="lg"
  showCount={false}
/>
```

**Props:**
- `articleId`: Article ID (required)
- `initialLikeCount`: Initial like count (optional)
- `initialIsLiked`: Initial like status (optional)
- `size`: Button size - 'sm' | 'md' | 'lg' (default: 'md')
- `showCount`: Whether to show like count (default: true)
- `className`: Additional CSS classes

### 2. LikeStats

Display like statistics and user status.

```tsx
import { LikeStats } from './components/article/LikeStats';

<LikeStats 
  articleId={1}
  initialLikeCount={42}
  showDeviceStatus={true}
/>
```

**Props:**
- `articleId`: Article ID (required)
- `initialLikeCount`: Initial like count (optional)
- `showDeviceStatus`: Show user's like status (default: true)
- `className`: Additional CSS classes

### 3. LikeExample

Complete example showing all like components.

```tsx
import { LikeExample } from './components/article/LikeExample';

<LikeExample 
  articleId={1}
  initialLikeCount={42}
  initialIsLiked={false}
/>
```

## Device ID Management

### How It Works

1. **First Visit**: Generates a new UUID and stores it in cookies
2. **Subsequent Visits**: Retrieves existing UUID from cookies
3. **Cookie Expiration**: Set to 365 days by default
4. **Privacy**: Uses `SameSite=Lax` for security

### Usage

```tsx
import { getDeviceId, generateDeviceId, clearDeviceId } from '../utils/deviceId';

// Get current device ID (creates new one if doesn't exist)
const deviceId = getDeviceId();

// Generate new device ID
const newDeviceId = generateDeviceId();

// Clear device ID (useful for testing or privacy)
clearDeviceId();
```

## API Integration

### Like API Functions

```tsx
import { 
  toggleLike, 
  getLikeCount, 
  hasLiked,
  getLikeCountsBatch 
} from '../api/like';

// Toggle like status
const response = await toggleLike({
  articleId: 1,
  deviceId: 'device-uuid'
});

// Get like count
const count = await getLikeCount(1);

// Check if liked
const isLiked = await hasLiked(1, 'device-uuid');

// Batch get like counts
const counts = await getLikeCountsBatch([1, 2, 3]);
```

### API Response Types

```tsx
interface LikeResponse {
  articleId: number;
  deviceId: string;
  isLiked: boolean;
  likeCount: number;
  message: string;
}
```

## Custom Hooks

### useLikeManager

Manages like data for multiple articles efficiently.

```tsx
import { useLikeManager } from '../hooks/useLikeManager';

const { 
  likeData, 
  isLoading, 
  updateLikeCount, 
  getTotalLikes 
} = useLikeManager({ 
  articleIds: [1, 2, 3] 
});

// Get like data for specific article
const articleLikeData = getLikeData(1);

// Get total likes across all articles
const totalLikes = getTotalLikes();
```

## Styling

### Tailwind CSS Classes

Components use Tailwind CSS for styling:

- **Colors**: Red for liked state, gray for unliked
- **Animations**: Hover effects, scale transitions, loading spinners
- **Responsive**: Different sizes for different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard support

### Custom Styling

You can override styles using the `className` prop:

```tsx
<LikeButton 
  articleId={1}
  className="my-custom-class"
/>
```

## Error Handling

### Network Errors

- Automatic state reversion on API failures
- Console error logging for debugging
- Loading states to prevent double-clicks

### Fallback Behavior

- Uses initial props if API calls fail
- Graceful degradation for offline scenarios
- Default values for missing data

## Performance Considerations

### Optimization Strategies

1. **Batch Operations**: Use `getLikeCountsBatch` for multiple articles
2. **Lazy Loading**: Only fetch like data when components mount
3. **Caching**: Device ID is cached in cookies
4. **Debouncing**: Prevents rapid successive API calls

### Memory Management

- Cleanup on component unmount
- Efficient state updates
- Minimal re-renders

## Testing

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LikeButton } from './LikeButton';

test('like button toggles state', () => {
  render(<LikeButton articleId={1} />);
  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  
  // Assert state change
});
```

### Mock API Calls

```tsx
// Mock the API module
jest.mock('../api/like', () => ({
  toggleLike: jest.fn(),
  getLikeCount: jest.fn(),
  hasLiked: jest.fn()
}));
```

## Browser Compatibility

### Supported Browsers

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Features Used

- ES6+ features (arrow functions, destructuring, etc.)
- Modern CSS (Flexbox, Grid, animations)
- Cookie API
- Fetch API

## Security Considerations

### Cookie Security

- `SameSite=Lax` prevents CSRF attacks
- Secure cookie handling
- No sensitive data in cookies

### API Security

- Input validation
- Rate limiting (backend)
- Device ID validation

## Troubleshooting

### Common Issues

1. **Device ID not persisting**: Check cookie settings and browser privacy
2. **Like count not updating**: Verify API endpoints and network requests
3. **Component not rendering**: Check prop types and required fields

### Debug Mode

Enable console logging for debugging:

```tsx
// In development
console.log('Device ID:', getDeviceId());
console.log('Like response:', response);
```

## Future Enhancements

### Planned Features

1. **User Authentication**: Replace device ID with user ID
2. **Like History**: Track user's like history
3. **Notifications**: Real-time like notifications
4. **Analytics**: Like interaction analytics

### Performance Improvements

1. **Service Worker**: Offline like functionality
2. **WebSocket**: Real-time like updates
3. **Virtual Scrolling**: Handle large numbers of articles
