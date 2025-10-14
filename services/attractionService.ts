import { Attraction, IstanbulDistrict, AttractionCategory } from '../types';
import attractionsData from '../data/attractions.json';
import districtsData from '../data/districts.json';
import { DISTRICT_CONFIGS } from '../constants/Districts';
import { DISTRICT_METADATA } from '../constants/DistrictMetadata';

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
 * Gets an appropriate image URL for a district
 * @param districtName - The name of the district
 * @returns Image URL for the district
 */
function getDistrictImageUrl(districtName: IstanbulDistrict): string {
  const imageMap: Record<string, string> = {
    [IstanbulDistrict.GALATA]: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200', // Galata Tower
    [IstanbulDistrict.NISANTASI]: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04', // Shopping street
    [IstanbulDistrict.MODA]: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // Coastal view
    [IstanbulDistrict.PRINCES_ISLANDS]: 'https://images.unsplash.com/photo-1603650637893-4c8d3f7ef97b', // Islands
  };

  return imageMap[districtName] || 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200';
}

/**
 * Creates a synthetic attraction for a district that has no specific attractions
 * @param districtName - The name of the district
 * @returns A synthetic attraction representing the district itself
 */
function createDistrictAttraction(districtName: IstanbulDistrict): Attraction | null {
  const districtConfig = DISTRICT_CONFIGS.find(d => d.name === districtName);
  const districtMetadata = DISTRICT_METADATA[districtName];
  const districtData = districtsData.districts.find(d => d.name === districtName);

  if (!districtConfig || !districtMetadata || !districtData) {
    return null;
  }

  return {
    id: `district-${districtName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: districtMetadata.displayName,
    description: districtData.description,
    summary: districtMetadata.keyLandmarks.join(', '),
    imageUrl: getDistrictImageUrl(districtName),
    coordinates: districtConfig.center,
    district: districtName,
    category: AttractionCategory.HISTORICAL,
    address: `${districtMetadata.displayName}, İstanbul`,
  };
}

/**
 * Loads and returns all attractions from the JSON data file
 * For districts without specific attractions, creates a synthetic district attraction
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

    // Find districts without attractions
    const allDistricts = Object.values(IstanbulDistrict);
    const districtsWithAttractions = new Set(
      validAttractions.map(a => a.district)
    );
    const districtsWithoutAttractions = allDistricts.filter(
      d => !districtsWithAttractions.has(d)
    );

    // Create synthetic attractions for districts without specific attractions
    const syntheticAttractions = districtsWithoutAttractions
      .map(createDistrictAttraction)
      .filter((a): a is Attraction => a !== null);

    return [...validAttractions as Attraction[], ...syntheticAttractions];
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
