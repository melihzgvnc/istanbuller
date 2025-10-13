# Location Permissions Configuration

## Overview

This document describes the location permission configuration for the Istanbuller app, implemented in `app.json`.

## Configuration Details

### iOS Configuration

Added to `ios.infoPlist`:

- **NSLocationWhenInUseUsageDescription**: Permission message shown when requesting location access while the app is in use
- **NSLocationAlwaysAndWhenInUseUsageDescription**: Permission message for always-on location access (though we only use "when in use")

**Message**: "Istanbuller needs your location to show you nearby tourist attractions in your current district."

### Android Configuration

Added to `android.permissions`:

- **ACCESS_COARSE_LOCATION**: Allows the app to access approximate location
- **ACCESS_FINE_LOCATION**: Allows the app to access precise location (GPS)

### Expo Location Plugin

Added `expo-location` plugin configuration:

- **locationAlwaysAndWhenInUsePermission**: iOS permission message
- **locationWhenInUsePermission**: iOS permission message
- **isAndroidBackgroundLocationEnabled**: `false` - We don't need background location
- **isAndroidForegroundServiceEnabled**: `false` - We don't need foreground service

## Location Accuracy Settings

The app uses balanced location accuracy as configured in `locationService.ts`:

```typescript
{
  accuracy: Location.Accuracy.Balanced,
  distanceInterval: 100, // Update only when moved 100m
}
```

This provides:
- Good accuracy for district detection
- Reasonable battery consumption
- Updates only when user moves significantly

## Testing Instructions

### iOS Testing

1. **First Launch - Permission Request**:
   - Launch the app on iOS device/simulator
   - Verify permission dialog appears with the configured message
   - Test "Allow While Using App" option
   - Verify location is detected and attractions are shown

2. **Permission Denied**:
   - Deny location permission
   - Verify LocationPermission component is shown
   - Verify "Open Settings" button works
   - Grant permission in Settings
   - Return to app and verify location works

3. **Settings Changes**:
   - Go to Settings > Privacy > Location Services > Istanbuller
   - Change permission to "Never"
   - Return to app and verify permission request flow

### Android Testing

1. **First Launch - Permission Request**:
   - Launch the app on Android device/emulator
   - Verify permission dialog appears
   - Test "While using the app" option
   - Verify location is detected and attractions are shown

2. **Permission Denied**:
   - Deny location permission
   - Verify LocationPermission component is shown
   - Verify "Open Settings" button works
   - Grant permission in Settings
   - Return to app and verify location works

3. **Precise Location Toggle** (Android 12+):
   - Go to Settings > Apps > Istanbuller > Permissions > Location
   - Toggle "Use precise location"
   - Verify app still works with approximate location

### Cross-Platform Testing

1. **Location Updates**:
   - Move between different districts
   - Verify attractions update automatically
   - Verify distance calculations update

2. **App Lifecycle**:
   - Background the app
   - Verify location updates stop (battery optimization)
   - Return to foreground
   - Verify location resumes

3. **Error Scenarios**:
   - Turn off GPS/Location Services
   - Verify appropriate error message
   - Turn GPS back on
   - Verify app recovers

## Requirements Coverage

This configuration satisfies the following requirements:

- **Requirement 1.1**: Location permissions are requested on app launch
- **Requirement 1.2**: GPS coordinates are retrieved when permissions are granted
- **Requirement 1.3**: Clear explanation is provided for why location access is needed
- **Requirement 1.5**: User is prompted to enable location services if disabled

## Rebuild Instructions

After updating `app.json`, you need to rebuild the native projects:

```bash
# For iOS
npx expo prebuild --platform ios --clean

# For Android
npx expo prebuild --platform android --clean

# Or both
npx expo prebuild --clean
```

For development builds:

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

## Notes

- The app only requests "when in use" permissions, not background location
- Background location is explicitly disabled to respect user privacy
- Permission messages are user-friendly and explain the specific use case
- The configuration follows platform best practices for both iOS and Android
