# App Context Usage Guide

## Overview

The `AppContext` provides global state management for location, district, and attractions data throughout the app. It centralizes location tracking, permission handling, and attraction filtering.

## Usage

### 1. Import the hook

```typescript
import { useAppContext } from '@/context/AppContext';
```

### 2. Use in your component

```typescript
function MyComponent() {
  const {
    userLocation,
    currentDistrict,
    attractions,
    loading,
    error,
    permissionGranted,
    refreshLocation,
    requestLocationPermission,
  } = useAppContext();

  // Use the state and actions as needed
}
```

## Available State

- `userLocation: Coordinates | null` - Current user GPS coordinates
- `currentDistrict: IstanbulDistrict | null` - Detected Istanbul district
- `attractions: AttractionWithDistance[]` - Filtered attractions with distance info
- `loading: boolean` - Loading state for location and attractions
- `error: string | null` - Error message if any operation fails
- `permissionGranted: boolean` - Whether location permission is granted

## Available Actions

- `refreshLocation(): Promise<void>` - Manually refresh user location and reload attractions
- `requestLocationPermission(): Promise<void>` - Request location permissions from user

## Example: Using in a Screen

```typescript
import { useAppContext } from '@/context/AppContext';

export default function AttractionsScreen() {
  const {
    attractions,
    currentDistrict,
    loading,
    error,
    permissionGranted,
    refreshLocation,
  } = useAppContext();

  if (!permissionGranted) {
    return <LocationPermissionScreen />;
  }

  return (
    <View>
      <Text>District: {currentDistrict}</Text>
      <AttractionList
        attractions={attractions}
        loading={loading}
        error={error}
        onRefresh={refreshLocation}
      />
    </View>
  );
}
```

## Benefits

1. **Centralized State**: All location and attraction data in one place
2. **Automatic Updates**: Location changes automatically update attractions
3. **Consistent Data**: All screens see the same data
4. **Simplified Components**: No need to manage location/attraction state in each screen
5. **Performance**: Shared state prevents duplicate API calls and calculations

## Notes

- The context automatically watches for location changes
- Attractions are automatically filtered by the current district
- Distance calculations are performed automatically when location updates
- The context handles all error states and loading states centrally
