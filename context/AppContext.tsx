import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { Coordinates, IstanbulDistrict, AttractionWithDistance } from '@/types';
import {
  requestPermissions,
  getCurrentLocation,
  getCurrentDistrict,
  watchLocation,
  LocationError,
} from '@/services/locationService';
import { getAttractionsByDistrict } from '@/services/attractionService';
import { enrichWithDistance, hasSignificantLocationChange } from '@/services/distanceService';
import { showErrorToast } from '@/utils/toast';

/**
 * Global app context type definition
 */
export interface AppContextType {
  // Location state
  userLocation: Coordinates | null;
  currentDistrict: IstanbulDistrict | null;
  
  // Attractions state
  attractions: AttractionWithDistance[];
  
  // UI state
  loading: boolean;
  error: string | null;
  permissionGranted: boolean;
  
  // Actions
  refreshLocation: () => Promise<void>;
  requestLocationPermission: () => Promise<void>;
}

/**
 * Create the context with undefined default value
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Props for the AppProvider component
 */
interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider component that wraps the app and provides global state
 */
export function AppProvider({ children }: AppProviderProps) {
  // Location state
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [currentDistrict, setCurrentDistrict] = useState<IstanbulDistrict | null>(null);
  
  // Attractions state
  const [attractions, setAttractions] = useState<AttractionWithDistance[]>([]);
  
  // UI state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  
  // Track last location used for distance calculations
  const lastCalculatedLocation = useRef<Coordinates | null>(null);

  /**
   * Load and filter attractions based on current district and user location
   * Only recalculates distances when location changes significantly (>100m)
   */
  const loadAttractions = useCallback(async (
    district: IstanbulDistrict | null,
    location: Coordinates | null,
    forceRecalculate: boolean = false
  ) => {
    try {
      // If no district, clear attractions
      if (!district) {
        setAttractions([]);
        lastCalculatedLocation.current = null;
        return;
      }

      // Get attractions for the current district
      const districtAttractions = getAttractionsByDistrict(district);

      // If no user location, return attractions without distance info
      if (!location) {
        const attractionsWithoutDistance = districtAttractions.map((attraction) => ({
          ...attraction,
          distance: {
            walkingDistanceKm: 0,
            walkingTimeMinutes: 0,
            publicTransportTimeMinutes: 0,
          },
        }));
        setAttractions(attractionsWithoutDistance);
        lastCalculatedLocation.current = null;
        return;
      }

      // Check if location has changed significantly since last calculation
      const shouldRecalculate = 
        forceRecalculate ||
        !lastCalculatedLocation.current ||
        hasSignificantLocationChange(
          lastCalculatedLocation.current,
          location,
          0.1 // 100 meters threshold
        );

      if (!shouldRecalculate && attractions.length > 0) {
        // Location change is insignificant, keep existing attractions
        return;
      }

      // Enrich attractions with distance information
      const enrichedAttractions = enrichWithDistance(districtAttractions, location);
      setAttractions(enrichedAttractions);
      lastCalculatedLocation.current = location;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to load attractions';
      setError(errorMessage);
      showErrorToast(errorMessage);
      setAttractions([]);
    }
  }, [attractions.length]);

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
        // Automatically get location after permission is granted
        await refreshLocation();
      } else {
        setError('Location permission is required to show nearby attractions');
        setLoading(false);
      }
    } catch (err) {
      const errorMessage = err instanceof LocationError 
        ? err.message 
        : 'Failed to request location permissions';
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  /**
   * Refresh the current location and update attractions
   */
  const refreshLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const coords = await getCurrentLocation();
      
      if (coords) {
        setUserLocation(coords);
        
        // Detect district from coordinates
        const detectedDistrict = getCurrentDistrict(coords);
        setCurrentDistrict(detectedDistrict);
        
        if (!detectedDistrict) {
          setError('You appear to be outside Istanbul districts');
        }
        
        // Load attractions for the new district (force recalculate)
        await loadAttractions(detectedDistrict, coords, true);
      } else {
        setError('Unable to determine your location');
      }
    } catch (err) {
      const errorMessage = err instanceof LocationError 
        ? err.message 
        : 'Failed to get your location';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadAttractions]);

  /**
   * Handle location updates from the watcher
   * Only called when location has changed significantly (>100m)
   */
  const handleLocationUpdate = useCallback((coords: Coordinates) => {
    setUserLocation(coords);
    
    // Detect district from new coordinates
    const detectedDistrict = getCurrentDistrict(coords);
    
    // Update district and reload attractions if district changed
    setCurrentDistrict((prevDistrict) => {
      if (prevDistrict !== detectedDistrict) {
        // District changed, force recalculate attractions
        loadAttractions(detectedDistrict, coords, true);
        return detectedDistrict;
      } else {
        // Same district, update distances only if significant change
        loadAttractions(detectedDistrict, coords, false);
        return prevDistrict;
      }
    });
  }, [loadAttractions]);

  /**
   * Initialize location on mount
   */
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const initialize = async () => {
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

  /**
   * Context value
   */
  const value: AppContextType = {
    userLocation,
    currentDistrict,
    attractions,
    loading,
    error,
    permissionGranted,
    refreshLocation,
    requestLocationPermission,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Custom hook to use the app context
 * Throws an error if used outside of AppProvider
 */
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}
