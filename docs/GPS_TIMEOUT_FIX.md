# GPS Timeout Fix for Manual District Selection

## Problem
When manually selecting a district from the Explore tab, users experienced a GPS timeout error. After clicking "Try Again", the attractions would load correctly. This created a poor user experience.

## Root Cause
The issue occurred because:

1. When the app initializes, the `useLocation` hook automatically requests location permissions and attempts to get GPS coordinates
2. The GPS acquisition has a 15-second timeout to prevent indefinite waiting
3. When users manually selected a district in the Explore tab, the background GPS was still trying to acquire a location
4. The GPS timeout would occur and display an error, even though manual district selection doesn't require GPS
5. The attractions were actually loaded correctly using the district center as a reference point, but the timeout error was confusing

## Solution
The fix implements several improvements:

### 1. Silent Location Acquisition
- Added a `silent` parameter to `getCurrentLocation()` and `refreshLocation()` functions
- When `silent: true`, the function uses the last known location (up to 5 minutes old) if available
- Error toasts are suppressed in silent mode to avoid blocking the UI

### 2. Last Known Location Fallback
- Modified `getCurrentLocation()` to check for last known location first
- Uses `Location.getLastKnownPositionAsync()` with 5-minute max age and 1km accuracy
- Provides faster response time and reduces GPS dependency

### 3. Non-Blocking Initialization
- Changed initial location request to use silent mode
- Prevents GPS timeout errors from blocking the UI during app startup
- Location acquisition happens in the background without interrupting user interaction

### 4. Improved Error Handling
- GPS timeout errors are only shown when explicitly requested by the user
- Background location updates don't show error toasts
- Manual district selection works independently of GPS status

## Changes Made

### `istanbuller/services/locationService.ts`
- Added `options?: { silent?: boolean }` parameter to `getCurrentLocation()`
- Implemented last known location fallback for silent mode
- Improved error handling to respect silent mode

### `istanbuller/hooks/useLocation.ts`
- Added `silent?: boolean` parameter to `refreshLocation()`
- Updated `requestLocationPermission()` to use silent mode for initial location
- Modified error handling to suppress toasts in silent mode
- Updated `UseLocationReturn` interface to reflect new signature

## Benefits
1. **Seamless Manual Selection**: Users can browse districts without GPS interference
2. **Faster Response**: Last known location provides immediate results when available
3. **Better UX**: No confusing timeout errors during normal browsing
4. **Background Updates**: GPS still works in the background for automatic detection
5. **Graceful Degradation**: App works even when GPS is slow or unavailable

## Testing
To verify the fix:
1. Open the app and navigate to the Explore tab
2. Select any district manually
3. Attractions should load immediately without GPS timeout errors
4. Switch back to Home tab - automatic location detection should still work
5. GPS updates continue in the background without blocking the UI

## Technical Details
- Last known location max age: 5 minutes (300,000ms)
- Last known location accuracy: 1km
- GPS timeout: 15 seconds (unchanged)
- Distance threshold for updates: 100 meters (unchanged)
