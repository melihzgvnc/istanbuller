import { useState, useEffect, useMemo, useRef } from 'react';
import { Coordinates, IstanbulDistrict, AttractionWithDistance } from '@/types';
import { getAttractionsByDistrict } from '@/services/attractionService';
import { enrichWithDistance, hasSignificantLocationChange } from '@/services/distanceService';
import { showErrorToast } from '@/utils/toast';
import { preloadAttractionImages } from '@/utils/imageUtils';

export interface UseAttractionsOptions {
  district: IstanbulDistrict | null;
  userLocation: Coordinates | null;
  referencePoint?: Coordinates; // Optional reference point for distance calculations (e.g., district center for manual selection)
  isManualSelection?: boolean; // Flag to indicate if manual selection is active
}

export interface UseAttractionsReturn {
  attractions: AttractionWithDistance[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Custom hook for filtering attractions by district and enriching with distance information
 * Handles attraction loading, filtering, and distance calculations
 */
export function useAttractions({
  district,
  userLocation,
  referencePoint,
  isManualSelection = false,
}: UseAttractionsOptions): UseAttractionsReturn {
  const [attractions, setAttractions] = useState<AttractionWithDistance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  
  // Track last location used for distance calculations
  const lastCalculatedLocation = useRef<Coordinates | null>(null);

  /**
   * Trigger a refresh of attractions
   */
  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  /**
   * Load and filter attractions based on district and user location
   * Only recalculates distances when location changes significantly (>100m)
   */
  useEffect(() => {
    const loadAttractions = async () => {
      try {
        setLoading(true);
        setError(null);

        // If no district, clear attractions
        if (!district) {
          setAttractions([]);
          setLoading(false);
          return;
        }

        // Get attractions for the current district
        const districtAttractions = getAttractionsByDistrict(district);

        // Validate that we have attractions data
        if (!districtAttractions || !Array.isArray(districtAttractions)) {
          throw new Error('Invalid attraction data received');
        }

        // Always use user's actual location for distance calculations
        // Manual selection only affects which district's attractions are shown
        const calculationPoint = userLocation;

        // If no calculation point available, return attractions without distance info
        if (!calculationPoint) {
          // Create attractions with placeholder distance info
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
          setLoading(false);
          return;
        }

        // Check if location has changed significantly since last calculation
        const shouldRecalculate = 
          !lastCalculatedLocation.current ||
          hasSignificantLocationChange(
            lastCalculatedLocation.current,
            calculationPoint,
            0.1 // 100 meters threshold
          );

        if (!shouldRecalculate && attractions.length > 0) {
          // Location change is insignificant, keep existing attractions
          setLoading(false);
          return;
        }

        // Enrich attractions with distance information using the calculation point
        const enrichedAttractions = enrichWithDistance(
          districtAttractions,
          calculationPoint
        );

        // Validate enriched attractions
        if (!enrichedAttractions || enrichedAttractions.length === 0) {
          if (districtAttractions.length > 0) {
            // Distance calculation failed but we have attractions
            console.warn('Distance calculation failed, showing attractions without distance');
            const attractionsWithoutDistance = districtAttractions.map((attraction) => ({
              ...attraction,
              distance: {
                walkingDistanceKm: 0,
                walkingTimeMinutes: 0,
                publicTransportTimeMinutes: 0,
              },
            }));
            setAttractions(attractionsWithoutDistance);
          } else {
            setAttractions([]);
          }
        } else {
          setAttractions(enrichedAttractions);
          
          // Preload images for the first few attractions for better performance
          preloadAttractionImages(enrichedAttractions, 5).catch((err) => {
            console.warn('Failed to preload attraction images:', err);
          });
        }
        
        lastCalculatedLocation.current = calculationPoint;
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to load attractions';
        setError(errorMessage);
        showErrorToast(errorMessage);
        setAttractions([]);
      } finally {
        setLoading(false);
      }
    };

    loadAttractions();
  }, [district, userLocation, referencePoint, isManualSelection, refreshKey]);

  /**
   * Memoize the return value to prevent unnecessary re-renders
   */
  const returnValue = useMemo(
    () => ({
      attractions,
      loading,
      error,
      refresh,
    }),
    [attractions, loading, error]
  );

  return returnValue;
}
