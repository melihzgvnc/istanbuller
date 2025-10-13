# Navigation Feature

## Overview
Added "Take Me There" button functionality that opens Google Maps with directions from the user's location to the selected attraction.

## Implementation

### New Files
- `utils/navigation.ts` - Utility function for opening Google Maps with directions

### Modified Files
- `app/attraction/[id].tsx` - Added navigation button to attraction detail screen

## Features

### Platform Support
- **iOS**: Opens Apple Maps app with directions, falls back to Google Maps web if unavailable
- **Android**: Opens Google Maps app with navigation, falls back to Google Maps web if unavailable

### User Experience
- Button displays at the bottom of the attraction detail screen
- Includes haptic feedback on press
- Shows icon and "Take Me There" text
- Accessible with proper ARIA labels
- Uses user's current location as origin (if available)
- Falls back to device location if user location not available

### Error Handling
- Shows toast notification if maps cannot be opened
- Gracefully handles missing Google Maps app
- Provides web fallback for all platforms

## Usage

The navigation button appears on every attraction detail page. When clicked:
1. Triggers haptic feedback
2. Opens the default maps application
3. Shows route from user's location to the attraction
4. If maps app unavailable, opens Google Maps in browser

## Testing

To test the feature:
1. Navigate to any attraction detail page
2. Scroll to the bottom
3. Click "Take Me There" button
4. Verify maps app opens with correct destination
5. Test on both iOS and Android devices
