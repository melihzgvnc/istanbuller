// Core data types for the Istanbul Tourist Guide app

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum IstanbulDistrict {
  SULTANAHMET = 'Sultanahmet',
  BEYOGLU = 'Beyoğlu',
  BESIKTAS = 'Beşiktaş',
  KADIKOY = 'Kadıköy',
  USKUDAR = 'Üsküdar',
  ORTAKOY = 'Ortaköy',
}

export enum AttractionCategory {
  HISTORICAL = 'Historical',
  MUSEUM = 'Museum',
  MOSQUE = 'Mosque',
  PALACE = 'Palace',
  BAZAAR = 'Bazaar',
  PARK = 'Park',
  VIEWPOINT = 'Viewpoint',
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  summary: string;
  imageUrl: string;
  coordinates: Coordinates;
  district: IstanbulDistrict;
  category: AttractionCategory;
  address: string;
}

export interface DistanceInfo {
  walkingDistanceKm: number;
  walkingTimeMinutes: number;
  publicTransportTimeMinutes: number;
}

export interface AttractionWithDistance extends Attraction {
  distance: DistanceInfo;
}

// District configuration type
export interface DistrictConfig {
  name: IstanbulDistrict;
  center: Coordinates;
  radiusKm: number;
}
