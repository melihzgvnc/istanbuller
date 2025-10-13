import { useState, useEffect, useCallback } from 'react';
import { Coordinates, IstanbulDistrict } from '@/types';
import {
  requestPermissions,
  getCurrentLocation,
  getCurrentDistrict,
  watchLocation,
  LocationError,
} from '@/services/locationService';
import { showErrorToast, showInfoToast } from '@/utils/toast';
import {
  loadManualDistrict,
  saveManualDistrict,
  clearManualDistrict,
} from '@/services/storageService';

export interface UseLocationReturn {
  location: Coordinates | null;
  district: IstanbulDistrict | null;
  loading: boolean;
  error: string | null;
  permissionGranted: boolean;
  requestLocationPermission: () => Promise<void>;
  refreshLocation: (silent?: boolean) => Promise<void>;
  manuallySelectedDistrict: IstanbulDistrict | null;
  isManualSelection: boolean;
  lastAutoDetectedDistrict: IstanbulDistrict | null;
  setManualDistrict: (district: IstanbulDistrict | null) => Promise<void>;
  clearManualSelection: () => Promise<void>;
}

/**
 * Custom hook for managing location state and permissions
 * Handles location permission requests, location watching, and district detection
 * Supports manual district selection as a fallback when auto-detection fails
 */
export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [district, setDistrict] = useState<IstanbulDistrict | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  
  // Manual selection state
  const [manuallySelectedDistrict, setManuallySelectedDistrict] = useState<IstanbulDistrict | null>(null);
  const [lastAutoDetectedDistrict, setLastAutoDetectedDistrict] = useState<IstanbulDistrict | null>(null);

  /**
   * Set manual district selection
   * Saves to AsyncStorage and prioritizes manual selection over auto-detection
   */
  const setManualDistrict = useCallback(async (district: IstanbulDistrict | null) => {
    try {
      await saveManualDistrict(district);
      setManuallySelectedDistrict(district);
      
      // Update the displayed district to the manual selection
      if (district) {
        setDistrict(district);
        setError(null); // Clear any previous errors
      }
    } catch (err) {
      const errorMessage = 'Failed to save district selection';
      showErrorToast(errorMessage);
      console.error('Error setting manual district:', err);
    }
  }, []);

  /**
   * Clear manual selection and restore auto-detection behavior
   */
  const clearManualSelection = useCallback(async () => {
    try {
      await clearManualDistrict();
      setManuallySelectedDistrict(null);
      
      // Restore the last auto-detected district if available
      if (lastAutoDetectedDistrict) {
        setDistrict(lastAutoDetectedDistrict);
      } else {
        // Otherwise, try to detect current district
        if (location) {
          const detectedDistrict = getCurrentDistrict(location);
          setDistrict(detectedDistrict);
        }
      }
      
      showInfoToast('Switched to automatic district detection');
    } catch (err) {
      const errorMessage = 'Failed to clear district selection';
      showErrorToast(errorMessage);
      console.error('Error clearing manual district:', err);
    }
  }, [lastAutoDetectedDistrict, location]);

  /**
   * Refresh the current location
   */
  const refreshLocation = useCallback(async (silent: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const coords = await getCurrentLocation(15000, { silent });
      
      if (coords) {
        setLocation(coords);
        
        // Detect district from coordinates
        const detectedDistrict = getCurrentDistrict(coords);
        
        // Update last auto-detected district
        setLastAutoDetectedDistrict(detectedDistrict);
        
        // If manual selection is active, keep it but check if user entered the district
        if (manuallySelectedDistrict) {
          // Keep the manual selection as the displayed district
          setDistrict(manuallySelectedDistrict);
          
          // If user entered a valid district that differs from manual selection, we'll handle notification in the UI
          // The UI component will detect this by comparing lastAutoDetectedDistrict with manuallySelectedDistrict
        } else {
          // No manual selection, use auto-detected district
          setDistrict(detectedDistrict);
          
          if (!detectedDistrict) {
            const errorMsg = 'You appear to be outside Istanbul districts';
            setError(errorMsg);
            if (!silent) {
              showErrorToast(errorMsg);
            }
          }
        }
      } else {
        const errorMsg = 'Unable to determine your location';
        setError(errorMsg);
        if (!silent) {
          showErrorToast(errorMsg);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof LocationError 
        ? err.message 
        : 'Failed to get your location';
      setError(errorMessage);
      
      // Show appropriate toast based on error type (only if not silent)
      if (!silent) {
        if (err instanceof LocationError) {
          if (err.code === 'GPS_TIMEOUT') {
            showErrorToast('GPS timeout. Please ensure you have a clear view of the sky.', 'long');
          } else if (err.code === 'LOCATION_SERVICES_DISABLED') {
            showErrorToast('Please enable location services in your device settings.', 'long');
          } else {
            showErrorToast(errorMessage);
          }
        } else {
          showErrorToast(errorMessage);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [manuallySelectedDistrict]);

  /**
   * Request location permissions from the user
   */
  const requestLocationPermission = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const granted = await requestPermissions();
      setPermissionGranted(granted);
      
      if (granted) {
        showInfoToast('Location permission granted');
        // Automatically get location after permission is granted (silently to avoid blocking)
        await refreshLocation(true);
      } else {
        const errorMsg = 'Location permission is required to show nearby attractions';
        setError(errorMsg);
        showErrorToast(errorMsg);
        setLoading(false);
      }
    } catch (err) {
      const errorMessage = err instanceof LocationError 
        ? err.message 
        : 'Failed to request location permissions';
      setError(errorMessage);
      showErrorToast(errorMessage);
      setLoading(false);
    }
  }, [refreshLocation]);

  /**
   * Handle location updates from the watcher
   * Only called when location has changed significantly (>100m)
   */
  const handleLocationUpdate = useCallback((coords: Coordinates) => {
    setLocation(coords);
    
    // Detect district from new coordinates
    const detectedDistrict = getCurrentDistrict(coords);
    
    // Update last auto-detected district
    setLastAutoDetectedDistrict(detectedDistrict);
    
    // If manual selection is active, keep it but track the auto-detected district
    if (manuallySelectedDistrict) {
      // Keep the manual selection as the displayed district
      // The UI will detect when lastAutoDetectedDistrict differs from manuallySelectedDistrict
      // and show a notification to the user
    } else {
      // No manual selection, update district if it changed
      setDistrict((prevDistrict) => {
        if (prevDistrict !== detectedDistrict) {
          return detectedDistrict;
        }
        return prevDistrict;
      });
    }
  }, [manuallySelectedDistrict]);

  /**
   * Load manual selection from storage on mount
   */
  useEffect(() => {
    const loadManualSelection = async () => {
      try {
        const savedDistrict = await loadManualDistrict();
        if (savedDistrict) {
          setManuallySelectedDistrict(savedDistrict);
          setDistrict(savedDistrict);
        }
      } catch (err) {
        console.error('Error loading manual district selection:', err);
      }
    };

    loadManualSelection();
  }, []);

  /**
   * Initialize location on mount
   */
  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let isInitializing = false;

    const initialize = async () => {
      if (isInitializing) return;
      isInitializing = true;

      try {
        // Request permissions on mount
        await requestLocationPermission();
        
        // Start watching location if permission granted
        if (permissionGranted) {
          // Watch location with optimizations:
          // - Only update when moved >100m
          // - Pause when app is backgrounded
          cleanup = watchLocation(handleLocationUpdate, {
            distanceThreshold: 100, // 100 meters
            pauseOnBackground: true,
          });
        }
      } catch (err) {
        console.error('Error initializing location:', err);
      } finally {
        isInitializing = false;
      }
    };

    initialize();

    // Cleanup function to stop watching location
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [permissionGranted, handleLocationUpdate, requestLocationPermission]);

  // Determine if current district is from manual selection
  const isManualSelection = manuallySelectedDistrict !== null;

  return {
    location,
    district,
    loading,
    error,
    permissionGranted,
    requestLocationPermission,
    refreshLocation,
    manuallySelectedDistrict,
    isManualSelection,
    lastAutoDetectedDistrict,
    setManualDistrict,
    clearManualSelection,
  };
}
