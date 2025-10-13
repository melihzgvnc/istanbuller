import { Attraction, IstanbulDistrict } from '../types';
import attractionsData from '../data/attractions.json';

/**
 * Validates that an attraction object has all required fields
 */
function isValidAttraction(attraction: any): attraction is Attraction {
  return (
    typeof attraction === 'object' &&
    attraction !== null &&
    typeof attraction.id === 'string' &&
    attraction.id.length > 0 &&
    typeof attraction.name === 'string' &&
    attraction.name.length > 0 &&
    typeof attraction.description === 'string' &&
    typeof attraction.summary === 'string' &&
    typeof attraction.imageUrl === 'string' &&
    typeof attraction.coordinates === 'object' &&
    typeof attraction.coordinates.latitude === 'number' &&
    typeof attraction.coordinates.longitude === 'number' &&
    typeof attraction.district === 'string' &&
    typeof attraction.category === 'string' &&
    typeof attraction.address === 'string'
  );
}

/**
 * Loads and returns all attractions from the JSON data file
 * Validates each attraction before returning
 * @returns Array of valid attractions
 * @throws Error if data is invalid or cannot be loaded
 */
export function getAllAttractions(): Attraction[] {
  try {
    if (!attractionsData || !Array.isArray(attractionsData.attractions)) {
      throw new Error('Invalid attractions data format');
    }

    const validAttractions = attractionsData.attractions.filter((attraction) => {
      const isValid = isValidAttraction(attraction);
      if (!isValid) {
        console.warn(`Invalid attraction data found, skipping:`, attraction);
      }
      return isValid;
    });

    if (validAttractions.length === 0) {
      throw new Error('No valid attractions found in data');
    }

    return validAttractions as Attraction[];
  } catch (error) {
    console.error('Error loading attractions:', error);
    throw new Error('Failed to load attraction data');
  }
}

/**
 * Filters attractions by district
 * @param district - The Istanbul district to filter by
 * @returns Array of attractions in the specified district
 */
export function getAttractionsByDistrict(
  district: IstanbulDistrict
): Attraction[] {
  const allAttractions = getAllAttractions();
  return allAttractions.filter(
    (attraction) => attraction.district === district
  );
}

/**
 * Retrieves a single attraction by its ID
 * @param id - The unique identifier of the attraction
 * @returns The attraction object if found, null otherwise
 */
export function getAttractionById(id: string): Attraction | null {
  if (!id || typeof id !== 'string') {
    return null;
  }

  const allAttractions = getAllAttractions();
  const attraction = allAttractions.find((attr) => attr.id === id);
  return attraction || null;
}

/**
 * AttractionService interface for dependency injection or testing
 */
export interface AttractionService {
  getAllAttractions(): Attraction[];
  getAttractionsByDistrict(district: IstanbulDistrict): Attraction[];
  getAttractionById(id: string): Attraction | null;
}

/**
 * Default attraction service implementation
 */
export const attractionService: AttractionService = {
  getAllAttractions,
  getAttractionsByDistrict,
  getAttractionById,
};
