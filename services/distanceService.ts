import { Coordinates, Attraction, AttractionWithDistance, DistanceInfo } from '../types';

/**
 * Cache for distance calculations to avoid redundant computations
 */
const distanceCache = new Map<string, number>();

/**
 * Generate a cache key for two coordinates
 */
function getCacheKey(from: Coordinates, to: Coordinates): string {
  return `${from.latitude.toFixed(6)},${from.longitude.toFixed(6)}-${to.latitude.toFixed(6)},${to.longitude.toFixed(6)}`;
}

/**
 * Convert degrees to radians
 */
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate the great-circle distance between two coordinates using the Haversine formula
 * Results are cached to avoid redundant calculations
 * @param from Starting coordinates
 * @param to Destination coordinates
 * @returns Distance in kilometers
 */
export function calculateDistance(from: Coordinates, to: Coordinates): number {
  // Check cache first
  const cacheKey = getCacheKey(from, to);
  const cachedDistance = distanceCache.get(cacheKey);
  
  if (cachedDistance !== undefined) {
    return cachedDistance;
  }
  
  const R = 6371; // Earth's radius in kilometers
  
  const dLat = toRad(to.latitude - from.latitude);
  const dLon = toRad(to.longitude - from.longitude);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.latitude)) *
    Math.cos(toRad(to.latitude)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  // Cache the result
  distanceCache.set(cacheKey, distance);
  
  // Limit cache size to prevent memory issues
  if (distanceCache.size > 1000) {
    const firstKey = distanceCache.keys().next().value;
    if (firstKey !== undefined) {
      distanceCache.delete(firstKey);
    }
  }
  
  return distance;
}

/**
 * Calculate estimated walking time based on distance
 * Assumes average walking speed of 5 km/h
 * @param distanceKm Distance in kilometers
 * @returns Estimated walking time in minutes
 */
export function calculateWalkingTime(distanceKm: number): number {
  const WALKING_SPEED_KMH = 5;
  const timeHours = distanceKm / WALKING_SPEED_KMH;
  const timeMinutes = Math.round(timeHours * 60);
  
  return timeMinutes;
}

/**
 * Calculate estimated public transport time based on distance
 * Uses a base time of 10 minutes plus travel time at 20 km/h average speed
 * @param distanceKm Distance in kilometers
 * @returns Estimated public transport time in minutes
 */
export function calculatePublicTransportTime(distanceKm: number): number {
  const BASE_TIME_MINUTES = 10; // Time for waiting and transfers
  const TRANSPORT_SPEED_KMH = 20; // Average speed including stops
  
  const travelTimeHours = distanceKm / TRANSPORT_SPEED_KMH;
  const travelTimeMinutes = travelTimeHours * 60;
  const totalTime = Math.round(BASE_TIME_MINUTES + travelTimeMinutes);
  
  return totalTime;
}

/**
 * Enrich attractions with distance information from user's location
 * @param attractions Array of attractions to enrich
 * @param userLocation User's current coordinates
 * @returns Array of attractions with distance information
 */
export function enrichWithDistance(
  attractions: Attraction[],
  userLocation: Coordinates
): AttractionWithDistance[] {
  return attractions.map((attraction) => {
    const distanceKm = calculateDistance(userLocation, attraction.coordinates);
    
    const distanceInfo: DistanceInfo = {
      walkingDistanceKm: Math.round(distanceKm * 100) / 100, // Round to 2 decimal places
      walkingTimeMinutes: calculateWalkingTime(distanceKm),
      publicTransportTimeMinutes: calculatePublicTransportTime(distanceKm),
    };
    
    return {
      ...attraction,
      distance: distanceInfo,
    };
  });
}

/**
 * Check if the distance between two locations is significant enough to warrant recalculation
 * @param from First coordinates
 * @param to Second coordinates
 * @param thresholdKm Threshold distance in kilometers (default: 0.1km = 100m)
 * @returns true if the distance is greater than the threshold
 */
export function hasSignificantLocationChange(
  from: Coordinates,
  to: Coordinates,
  thresholdKm: number = 0.1
): boolean {
  const distance = calculateDistance(from, to);
  return distance >= thresholdKm;
}

/**
 * Clear the distance calculation cache
 * Useful for testing or memory management
 */
export function clearDistanceCache(): void {
  distanceCache.clear();
}
