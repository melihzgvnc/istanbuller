import * as Location from 'expo-location';
import { AppState, AppStateStatus } from 'react-native';
import { Coordinates, IstanbulDistrict } from '@/types';
import districtsData from '@/data/districts.json';
import { calculateDistance, hasSignificantLocationChange } from './distanceService';

export class LocationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'LocationError';
  }
}

/**
 * Request location permissions from the user
 * @returns Promise<boolean> - true if permissions granted, false otherwise
 */
export async function requestPermissions(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    throw new LocationError(
      'Failed to request location permissions',
      'PERMISSION_REQUEST_FAILED'
    );
  }
}

/**
 * Get the current location of the user with timeout handling
 * @param timeoutMs - Timeout in milliseconds (default: 15000ms / 15 seconds)
 * @param options - Optional configuration
 * @returns Promise<Coordinates | null> - user's current coordinates or null if unavailable
 */
export async function getCurrentLocation(
  timeoutMs: number = 15000,
  options?: { silent?: boolean }
): Promise<Coordinates | null> {
  try {
    // Check if location services are enabled
    const isEnabled = await Location.hasServicesEnabledAsync();
    if (!isEnabled) {
      throw new LocationError(
        'Location services are disabled. Please enable them in your device settings.',
        'LOCATION_SERVICES_DISABLED'
      );
    }

    // Check permissions
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new LocationError(
        'Location permission not granted',
        'PERMISSION_DENIED'
      );
    }

    // Try to get last known location first for faster response
    const lastKnown = await Location.getLastKnownPositionAsync({
      maxAge: 300000, // 5 minutes
      requiredAccuracy: 1000, // 1km accuracy is acceptable
    });

    // If we have a recent location, use it immediately
    if (lastKnown && options?.silent) {
      return {
        latitude: lastKnown.coords.latitude,
        longitude: lastKnown.coords.longitude,
      };
    }

    // Get current location with timeout
    const locationPromise = Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new LocationError(
          'GPS timeout. Please ensure you have a clear view of the sky and try again.',
          'GPS_TIMEOUT'
        ));
      }, timeoutMs);
    });

    // Race between location fetch and timeout
    const location = await Promise.race([locationPromise, timeoutPromise]);

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    if (error instanceof LocationError) {
      throw error;
    }
    console.error('Error getting current location:', error);
    throw new LocationError(
      'Unable to determine your location. Please try again.',
      'LOCATION_UNAVAILABLE'
    );
  }
}

/**
 * Map coordinates to an Istanbul district using district boundaries
 * @param coords - User's coordinates
 * @returns IstanbulDistrict | null - The district name or null if not in any district
 */
export function getCurrentDistrict(
  coords: Coordinates
): IstanbulDistrict | null {
  try {
    let closestDistrict: { name: string; distance: number } | null = null;

    // Find the closest district center
    for (const district of districtsData.districts) {
      const distanceToCenter = calculateDistance(coords, district.center);

      // Check if within district radius
      if (distanceToCenter <= district.radiusKm) {
        if (
          !closestDistrict ||
          distanceToCenter < closestDistrict.distance
        ) {
          closestDistrict = {
            name: district.name,
            distance: distanceToCenter,
          };
        }
      }
    }

    // Return the closest district if found
    if (closestDistrict) {
      return closestDistrict.name as IstanbulDistrict;
    }

    return null;
  } catch (error) {
    console.error('Error determining district:', error);
    return null;
  }
}

/**
 * Watch location updates and call callback when location changes significantly
 * Automatically pauses when app is backgrounded and resumes when foregrounded
 * @param callback - Function to call with new coordinates
 * @param options - Optional configuration
 * @returns Function to stop watching location
 */
export function watchLocation(
  callback: (coords: Coordinates) => void,
  options?: {
    distanceThreshold?: number; // Minimum distance change in meters to trigger callback
    pauseOnBackground?: boolean; // Whether to pause location updates when app is backgrounded
  }
): () => void {
  const {
    distanceThreshold = 100, // Default: 100 meters
    pauseOnBackground = true,
  } = options || {};

  let subscription: Location.LocationSubscription | null = null;
  let appStateSubscription: any = null;
  let lastReportedLocation: Coordinates | null = null;
  let isActive = true;

  const startWatching = async () => {
    try {
      // Check permissions first
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new LocationError(
          'Location permission not granted',
          'PERMISSION_DENIED'
        );
      }

      // Start watching location with appropriate settings
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: distanceThreshold, // Or when moved specified distance
        },
        (location) => {
          // Only process location updates when app is active
          if (!isActive) {
            return;
          }

          const newCoords: Coordinates = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          // Check if location change is significant enough
          if (lastReportedLocation) {
            const hasSignificantChange = hasSignificantLocationChange(
              lastReportedLocation,
              newCoords,
              distanceThreshold / 1000 // Convert meters to kilometers
            );

            if (!hasSignificantChange) {
              // Location change is too small, skip callback
              return;
            }
          }

          // Update last reported location and call callback
          lastReportedLocation = newCoords;
          callback(newCoords);
        }
      );
    } catch (error) {
      console.error('Error watching location:', error);
      throw new LocationError(
        'Failed to start location tracking',
        'WATCH_FAILED'
      );
    }
  };

  const stopWatching = () => {
    if (subscription) {
      subscription.remove();
      subscription = null;
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (pauseOnBackground) {
      if (nextAppState === 'active') {
        // App came to foreground, resume location tracking
        isActive = true;
        if (!subscription) {
          startWatching();
        }
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        // App went to background, pause location tracking
        isActive = false;
        stopWatching();
      }
    }
  };

  // Start watching immediately
  startWatching();

  // Listen to app state changes
  if (pauseOnBackground) {
    appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
  }

  // Return cleanup function
  return () => {
    stopWatching();
    if (appStateSubscription) {
      appStateSubscription.remove();
      appStateSubscription = null;
    }
    lastReportedLocation = null;
  };
}
