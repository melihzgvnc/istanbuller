/**
 * Data validation utility for attractions and districts
 * Provides runtime validation with detailed error reporting
 */

import { IstanbulDistrict, AttractionCategory } from '../types';

/**
 * Validation result interface
 */
export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: string[];
  warnings: string[];
}

/**
 * Attraction data structure for validation
 */
interface AttractionData {
  id: string;
  name: string;
  description: string;
  summary: string;
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  district: string;
  category: string;
  address: string;
}

/**
 * District data structure for validation
 */
interface DistrictData {
  name: string;
  center: {
    latitude: number;
    longitude: number;
  };
  radiusKm: number;
  description: string;
  image?: string;
}

/**
 * Validates a single attraction object
 */
export function validateAttraction(
  attraction: unknown,
  index?: number
): ValidationResult<AttractionData> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const prefix = index !== undefined ? `Attraction at index ${index}` : 'Attraction';

  // Check if attraction is an object
  if (!attraction || typeof attraction !== 'object') {
    return {
      isValid: false,
      errors: [`${prefix}: Must be an object`],
      warnings: [],
    };
  }

  const attr = attraction as Record<string, unknown>;

  // Validate required string fields
  const requiredStringFields = ['id', 'name', 'description', 'summary', 'imageUrl', 'district', 'category', 'address'];
  for (const field of requiredStringFields) {
    if (!attr[field] || typeof attr[field] !== 'string') {
      errors.push(`${prefix}: Missing or invalid '${field}' (must be a non-empty string)`);
    } else if ((attr[field] as string).trim().length === 0) {
      errors.push(`${prefix}: Field '${field}' cannot be empty`);
    }
  }

  // Validate coordinates
  if (!attr.coordinates || typeof attr.coordinates !== 'object') {
    errors.push(`${prefix}: Missing or invalid 'coordinates' object`);
  } else {
    const coords = attr.coordinates as Record<string, unknown>;

    if (typeof coords.latitude !== 'number') {
      errors.push(`${prefix}: coordinates.latitude must be a number`);
    } else if (coords.latitude < -90 || coords.latitude > 90) {
      errors.push(`${prefix}: coordinates.latitude must be between -90 and 90`);
    }

    if (typeof coords.longitude !== 'number') {
      errors.push(`${prefix}: coordinates.longitude must be a number`);
    } else if (coords.longitude < -180 || coords.longitude > 180) {
      errors.push(`${prefix}: coordinates.longitude must be between -180 and 180`);
    }

    // Istanbul-specific coordinate validation (warning only)
    if (typeof coords.latitude === 'number' && typeof coords.longitude === 'number') {
      // Istanbul is roughly between 40.8-41.3 latitude and 28.5-29.5 longitude
      if (coords.latitude < 40.5 || coords.latitude > 41.5) {
        warnings.push(`${prefix}: Latitude ${coords.latitude} seems outside Istanbul area`);
      }
      if (coords.longitude < 28.0 || coords.longitude > 30.0) {
        warnings.push(`${prefix}: Longitude ${coords.longitude} seems outside Istanbul area`);
      }
    }
  }

  // Validate district enum
  if (attr.district && typeof attr.district === 'string') {
    const validDistricts = Object.values(IstanbulDistrict);
    if (!validDistricts.includes(attr.district as IstanbulDistrict)) {
      errors.push(
        `${prefix}: Invalid district '${attr.district}'. Must be one of: ${validDistricts.join(', ')}`
      );
    }
  }

  // Validate category enum
  if (attr.category && typeof attr.category === 'string') {
    const validCategories = Object.values(AttractionCategory);
    if (!validCategories.includes(attr.category as AttractionCategory)) {
      errors.push(
        `${prefix}: Invalid category '${attr.category}'. Must be one of: ${validCategories.join(', ')}`
      );
    }
  }

  // Validate ID format (should be kebab-case)
  if (attr.id && typeof attr.id === 'string') {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(attr.id)) {
      warnings.push(`${prefix}: ID '${attr.id}' should be in kebab-case format`);
    }
  }

  // Check description length (warning only)
  if (attr.description && typeof attr.description === 'string') {
    if (attr.description.length < 50) {
      warnings.push(`${prefix}: Description seems too short (${attr.description.length} characters)`);
    }
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    data: isValid ? (attr as unknown as AttractionData) : undefined,
    errors,
    warnings,
  };
}

/**
 * Validates an array of attractions
 */
export function validateAttractions(data: unknown): ValidationResult<AttractionData[]> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if data is an object with attractions array
  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['Data must be an object'],
      warnings: [],
    };
  }

  const dataObj = data as Record<string, unknown>;

  if (!Array.isArray(dataObj.attractions)) {
    return {
      isValid: false,
      errors: ['Data must contain an "attractions" array'],
      warnings: [],
    };
  }

  const attractions = dataObj.attractions;

  if (attractions.length === 0) {
    warnings.push('Attractions array is empty');
  }

  const validAttractions: AttractionData[] = [];
  const seenIds = new Set<string>();

  // Validate each attraction
  attractions.forEach((attraction, index) => {
    const result = validateAttraction(attraction, index);

    errors.push(...result.errors);
    warnings.push(...result.warnings);

    if (result.isValid && result.data) {
      // Check for duplicate IDs
      if (seenIds.has(result.data.id)) {
        errors.push(`Duplicate attraction ID found: '${result.data.id}'`);
      } else {
        seenIds.add(result.data.id);
        validAttractions.push(result.data);
      }
    }
  });

  const isValid = errors.length === 0;

  return {
    isValid,
    data: isValid ? validAttractions : undefined,
    errors,
    warnings,
  };
}

/**
 * Validates a single district object
 */
export function validateDistrict(
  district: unknown,
  index?: number
): ValidationResult<DistrictData> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const prefix = index !== undefined ? `District at index ${index}` : 'District';

  // Check if district is an object
  if (!district || typeof district !== 'object') {
    return {
      isValid: false,
      errors: [`${prefix}: Must be an object`],
      warnings: [],
    };
  }

  const dist = district as Record<string, unknown>;

  // Validate name
  if (!dist.name || typeof dist.name !== 'string') {
    errors.push(`${prefix}: Missing or invalid 'name' (must be a non-empty string)`);
  } else if (dist.name.trim().length === 0) {
    errors.push(`${prefix}: Field 'name' cannot be empty`);
  } else {
    // Check if name matches a valid district enum
    const validDistricts = Object.values(IstanbulDistrict);
    if (!validDistricts.includes(dist.name as IstanbulDistrict)) {
      errors.push(
        `${prefix}: Invalid district name '${dist.name}'. Must be one of: ${validDistricts.join(', ')}`
      );
    }
  }

  // Validate description
  if (!dist.description || typeof dist.description !== 'string') {
    errors.push(`${prefix}: Missing or invalid 'description' (must be a non-empty string)`);
  } else if (dist.description.trim().length === 0) {
    errors.push(`${prefix}: Field 'description' cannot be empty`);
  }

  // Validate center coordinates
  if (!dist.center || typeof dist.center !== 'object') {
    errors.push(`${prefix}: Missing or invalid 'center' object`);
  } else {
    const center = dist.center as Record<string, unknown>;

    if (typeof center.latitude !== 'number') {
      errors.push(`${prefix}: center.latitude must be a number`);
    } else if (center.latitude < -90 || center.latitude > 90) {
      errors.push(`${prefix}: center.latitude must be between -90 and 90`);
    }

    if (typeof center.longitude !== 'number') {
      errors.push(`${prefix}: center.longitude must be a number`);
    } else if (center.longitude < -180 || center.longitude > 180) {
      errors.push(`${prefix}: center.longitude must be between -180 and 180`);
    }

    // Istanbul-specific coordinate validation (warning only)
    if (typeof center.latitude === 'number' && typeof center.longitude === 'number') {
      if (center.latitude < 40.5 || center.latitude > 41.5) {
        warnings.push(`${prefix}: Latitude ${center.latitude} seems outside Istanbul area`);
      }
      if (center.longitude < 28.0 || center.longitude > 30.0) {
        warnings.push(`${prefix}: Longitude ${center.longitude} seems outside Istanbul area`);
      }
    }
  }

  // Validate radiusKm
  if (typeof dist.radiusKm !== 'number') {
    errors.push(`${prefix}: Missing or invalid 'radiusKm' (must be a number)`);
  } else if (dist.radiusKm <= 0) {
    errors.push(`${prefix}: radiusKm must be greater than 0`);
  } else if (dist.radiusKm > 20) {
    warnings.push(`${prefix}: radiusKm ${dist.radiusKm} seems unusually large for a district`);
  }

  // Validate optional image field
  if (dist.image !== undefined && typeof dist.image !== 'string') {
    errors.push(`${prefix}: 'image' must be a string if provided`);
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    data: isValid ? (dist as unknown as DistrictData) : undefined,
    errors,
    warnings,
  };
}

/**
 * Validates an array of districts
 */
export function validateDistricts(data: unknown): ValidationResult<DistrictData[]> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if data is an object with districts array
  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['Data must be an object'],
      warnings: [],
    };
  }

  const dataObj = data as Record<string, unknown>;

  if (!Array.isArray(dataObj.districts)) {
    return {
      isValid: false,
      errors: ['Data must contain a "districts" array'],
      warnings: [],
    };
  }

  const districts = dataObj.districts;

  if (districts.length === 0) {
    warnings.push('Districts array is empty');
  }

  const validDistricts: DistrictData[] = [];
  const seenNames = new Set<string>();

  // Validate each district
  districts.forEach((district, index) => {
    const result = validateDistrict(district, index);

    errors.push(...result.errors);
    warnings.push(...result.warnings);

    if (result.isValid && result.data) {
      // Check for duplicate names
      if (seenNames.has(result.data.name)) {
        errors.push(`Duplicate district name found: '${result.data.name}'`);
      } else {
        seenNames.add(result.data.name);
        validDistricts.push(result.data);
      }
    }
  });

  const isValid = errors.length === 0;

  return {
    isValid,
    data: validDistricts.length > 0 ? validDistricts : undefined,
    errors,
    warnings,
  };
}

/**
 * Helper function to format validation results for logging
 */
export function formatValidationResult<T>(result: ValidationResult<T>): string {
  const lines: string[] = [];

  lines.push(`Validation ${result.isValid ? 'PASSED' : 'FAILED'}`);

  if (result.errors.length > 0) {
    lines.push('\nErrors:');
    result.errors.forEach(error => lines.push(`  - ${error}`));
  }

  if (result.warnings.length > 0) {
    lines.push('\nWarnings:');
    result.warnings.forEach(warning => lines.push(`  - ${warning}`));
  }

  return lines.join('\n');
}
