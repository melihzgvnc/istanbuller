import { Attraction, IstanbulDistrict, AttractionCategory } from '../types';
import attractionsData from '../data/attractions.json';
import districtsData from '../data/districts.json';
import { DISTRICT_CONFIGS } from '../constants/Districts';
import { DISTRICT_METADATA } from '../constants/DistrictMetadata';
import { getAttractionImage } from '../constants/AttractionImages';
import { logger } from '../utils/logger';
import { validateAttractions, validateDistricts, formatValidationResult } from '../utils/validation';

/**
 * Gets the appropriate image for a district from DISTRICT_METADATA
 * @param districtName - The name of the district
 * @returns Image module ID (number) for the district
 */
function getDistrictImage(districtName: IstanbulDistrict): number {
  const districtMetadata = DISTRICT_METADATA[districtName];

  if (districtMetadata && districtMetadata.image) {
    return districtMetadata.image;
  }

  // Fallback to first district's image if not found
  const firstDistrict = DISTRICT_METADATA[IstanbulDistrict.SULTANAHMET];
  return firstDistrict?.image || require('@/assets/images/districts/sultanahmet.jpg');
}

/**
 * Validates and loads district data from JSON
 * @returns Validated district data or throws error
 */
function loadValidatedDistricts() {
  try {
    // Validate districts data structure
    const districtValidation = validateDistricts(districtsData);

    // Log validation result for debugging
    logger.log('District validation result:', {
      isValid: districtValidation.isValid,
      dataLength: districtValidation.data?.length || 0,
      errorsCount: districtValidation.errors.length,
      warningsCount: districtValidation.warnings.length,
    });

    // Log validation warnings
    if (districtValidation.warnings.length > 0) {
      logger.warn('District data validation warnings:', districtValidation.warnings);
    }

    // Handle validation errors
    if (!districtValidation.isValid) {
      logger.error('District data validation failed:', formatValidationResult(districtValidation));
      logger.error('Validation errors:', districtValidation.errors);

      // Attempt to use partial data if available
      if (districtValidation.data && districtValidation.data.length > 0) {
        logger.warn(`Using ${districtValidation.data.length} valid districts despite validation errors`);
        return districtValidation.data;
      } else {
        const err = new Error('No valid districts found in data');
        (err as any).translationKey = 'districts.no.valid.data';
        throw err;
      }
    }

    return districtValidation.data || [];
  } catch (error) {
    logger.error('Error validating district data:', error);
    throw error;
  }
}

/**
 * Creates a synthetic attraction for a district that has no specific attractions
 * @param districtName - The name of the district
 * @returns A synthetic attraction representing the district itself
 */
function createDistrictAttraction(districtName: IstanbulDistrict): Attraction | null {
  const districtConfig = DISTRICT_CONFIGS.find(d => d.name === districtName);
  const districtMetadata = DISTRICT_METADATA[districtName];

  // Use validated district data
  const validatedDistricts = loadValidatedDistricts();
  const districtData = validatedDistricts.find(d => d.name === districtName);

  if (!districtConfig || !districtMetadata) {
    logger.warn(`Missing configuration or metadata for district: ${districtName}`);
    return null;
  }

  if (!districtData) {
    logger.warn(`No validated data found for district: ${districtName}, using fallback`);
    // Create fallback with available data
    return {
      id: `district-${districtName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: districtMetadata.displayName,
      description: `Explore the ${districtMetadata.displayName} district of Istanbul`,
      summary: districtMetadata.keyLandmarks.join(', '),
      imageUrl: getDistrictImage(districtName),
      coordinates: districtConfig.center,
      district: districtName,
      category: AttractionCategory.HISTORICAL,
      address: `${districtMetadata.displayName}, İstanbul`,
    };
  }

  return {
    id: `district-${districtName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: districtMetadata.displayName,
    description: districtData.description,
    summary: districtMetadata.keyLandmarks.join(', '),
    imageUrl: getDistrictImage(districtName),
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
    // Validate attractions data structure
    const attractionValidation = validateAttractions(attractionsData);

    // Log validation warnings
    if (attractionValidation.warnings.length > 0) {
      logger.warn('Attraction data validation warnings:', attractionValidation.warnings);
    }

    // Handle validation errors
    if (!attractionValidation.isValid) {
      logger.error('Attraction data validation failed:', formatValidationResult(attractionValidation));

      // Attempt to use partial data if available
      if (attractionValidation.data && attractionValidation.data.length > 0) {
        logger.warn(`Using ${attractionValidation.data.length} valid attractions despite validation errors`);
      } else {
        const err = new Error('No valid attractions found in data');
        (err as any).translationKey = 'attractions.no.valid.data';
        throw err;
      }
    }

    // Use validated data or fall back to empty array
    const validatedAttractions = attractionValidation.data || [];

    if (validatedAttractions.length === 0) {
      const err = new Error('No valid attractions found in data');
      (err as any).translationKey = 'attractions.no.valid.data';
      throw err;
    }

    // Convert image paths to require() module IDs
    const validAttractions = validatedAttractions.map((attraction) => ({
      ...attraction,
      imageUrl: getAttractionImage(attraction.imageUrl),
    }));

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
    logger.error('Error loading attractions:', error);
    const err = new Error('Failed to load attraction data');
    (err as any).translationKey = 'attractions.load.failed';
    throw err;
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
  const filtered = allAttractions.filter((attraction) => {
    const matches = attraction.district === district;
    return matches;
  });

  return filtered;
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
