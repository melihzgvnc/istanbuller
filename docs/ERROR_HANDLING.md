# Error Handling Documentation

This document describes the comprehensive error handling implementation in the Istanbul Tourist Guide app.

## Overview

The app implements multiple layers of error handling to ensure a robust user experience:

1. **Error Boundaries** - Catch component crashes
2. **Toast Notifications** - User-friendly error feedback
3. **GPS Timeout Handling** - Graceful handling of location timeouts
4. **Data Validation** - Handle missing or invalid attraction data
5. **Loading Indicators** - Visual feedback for all async operations

## Error Boundaries

### Global Error Boundary

Location: `istanbuller/app/_layout.tsx`

The root layout wraps the entire app in an ErrorBoundary component that catches any unhandled errors in the component tree.

```typescript
<ErrorBoundary>
  <AppProvider>
    {/* App content */}
  </AppProvider>
</ErrorBoundary>
```

### Screen-Level Error Boundaries

Location: `istanbuller/app/attraction/[id].tsx`

Individual screens also have error boundaries for isolated error handling.

### ErrorBoundary Component

Location: `istanbuller/components/ErrorBoundary.tsx`

Features:
- Catches React component errors
- Displays user-friendly error message
- Shows error details in development mode
- Provides "Try Again" button to reset error state
- Supports custom fallback UI

## Toast Notifications

### Toast Utility

Location: `istanbuller/utils/toast.ts`

Provides cross-platform toast notifications:
- **Android**: Uses native ToastAndroid
- **iOS**: Uses Alert dialogs

Available functions:
- `showToast(message, options)` - Generic toast
- `showSuccessToast(message)` - Success feedback
- `showErrorToast(message, duration)` - Error feedback
- `showInfoToast(message)` - Info feedback
- `showWarningToast(message)` - Warning feedback
- `showConfirmDialog(title, message, onConfirm, onCancel)` - Confirmation dialog

### Usage in Hooks

#### useLocation Hook

Location: `istanbuller/hooks/useLocation.ts`

Error notifications for:
- Permission denied
- GPS timeout
- Location services disabled
- Location unavailable

#### useAttractions Hook

Location: `istanbuller/hooks/useAttractions.ts`

Error notifications for:
- Failed to load attractions
- Invalid attraction data

## GPS Timeout Handling

### Location Service

Location: `istanbuller/services/locationService.ts`

The `getCurrentLocation()` function implements timeout handling:

```typescript
export async function getCurrentLocation(timeoutMs: number = 15000): Promise<Coordinates | null>
```

Features:
- Default 15-second timeout
- Configurable timeout duration
- Throws `LocationError` with code 'GPS_TIMEOUT'
- User-friendly error message

Error codes:
- `GPS_TIMEOUT` - GPS took too long to respond
- `LOCATION_SERVICES_DISABLED` - Location services are off
- `PERMISSION_DENIED` - User denied permission
- `LOCATION_UNAVAILABLE` - Generic location error

### Error Handling Flow

1. Location request initiated
2. Race between location fetch and timeout
3. If timeout wins, throw GPS_TIMEOUT error
4. Hook catches error and shows appropriate toast
5. User sees helpful message with guidance

## Data Validation

### Attraction Service

Location: `istanbuller/services/attractionService.ts`

Features:
- Validates attraction data structure
- Checks for required fields
- Filters out invalid attractions
- Logs warnings for invalid data
- Throws errors for critical failures

Validation checks:
- Valid attraction object structure
- Required string fields (id, name, description, etc.)
- Valid coordinates (latitude, longitude)
- Valid district and category

### Attraction Detail Screen

Location: `istanbuller/app/attraction/[id].tsx`

Enhanced error handling:
- Validates attraction ID
- Checks for missing attraction
- Validates attraction data completeness
- Handles distance calculation failures
- Graceful fallback to attractions without distance

## Image Loading

### Image Error Handling

Implemented in:
- `istanbuller/components/attractions/AttractionCard.tsx`
- `istanbuller/app/attraction/[id].tsx`

Features:
- Detects image load failures
- Shows placeholder with icon
- Displays "Image unavailable" message
- Maintains layout consistency

## Loading Indicators

### Global Loading State

Location: `istanbuller/context/AppContext.tsx`

Tracks loading state for:
- Initial location request
- Location refresh
- Attraction loading

### Component Loading States

#### AttractionList Component

Location: `istanbuller/components/attractions/AttractionList.tsx`

Loading states:
- Initial load with spinner and message
- Pull-to-refresh indicator
- Empty state
- Error state with retry button

#### Attraction Detail Screen

Loading states:
- Full-screen loading spinner
- Error state with back button

#### LocationPermission Component

Location: `istanbuller/components/location/LocationPermission.tsx`

Loading states:
- "Requesting..." button state
- Disabled button during request

## Error Messages

### User-Friendly Messages

All error messages are written in clear, actionable language:

**Location Errors:**
- "Location permission is required to show nearby attractions"
- "GPS timeout. Please ensure you have a clear view of the sky."
- "Please enable location services in your device settings."
- "Unable to determine your location. Please try again."
- "You appear to be outside Istanbul districts"

**Attraction Errors:**
- "Failed to load attractions"
- "Invalid attraction data"
- "Attraction not found"
- "No attractions found in your current area"

**Image Errors:**
- "Image unavailable" (with icon placeholder)

**Component Errors:**
- "Oops! Something went wrong"
- "The app encountered an unexpected error. Please try again."

## Error Recovery

### Retry Mechanisms

1. **Pull-to-Refresh**: Users can refresh location and attractions
2. **Try Again Buttons**: Available in error states
3. **Error Boundary Reset**: Allows recovery from component crashes
4. **Settings Redirect**: Direct users to enable permissions

### Graceful Degradation

The app continues to function with reduced features when:
- Location unavailable: Shows attractions without distance
- Image unavailable: Shows placeholder
- Distance calculation fails: Shows attractions without distance
- Outside Istanbul: Shows appropriate message

## Testing Error Scenarios

### Manual Testing Checklist

- [ ] Deny location permission
- [ ] Disable location services
- [ ] Move outside Istanbul
- [ ] Simulate GPS timeout (airplane mode)
- [ ] Load invalid attraction ID
- [ ] Simulate network failure for images
- [ ] Trigger component error (invalid prop)
- [ ] Test pull-to-refresh
- [ ] Test retry buttons
- [ ] Test settings redirect

### Error Simulation

For development testing:
1. Use airplane mode for GPS timeout
2. Deny permissions in settings
3. Use invalid attraction IDs in URLs
4. Use broken image URLs
5. Throw errors in components

## Best Practices

1. **Always catch errors**: Use try-catch blocks for async operations
2. **Show user feedback**: Use toasts for important errors
3. **Provide recovery options**: Include retry buttons
4. **Log errors**: Console.error for debugging
5. **Validate data**: Check data before using it
6. **Graceful degradation**: Continue with reduced features
7. **Clear messages**: Use actionable, friendly language
8. **Loading states**: Show feedback for all async operations

## Future Improvements

- Error tracking service integration (e.g., Sentry)
- Offline mode with cached data
- Network connectivity detection
- Retry with exponential backoff
- Error analytics and monitoring
