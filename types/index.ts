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
  EMINONU = 'Eminönü',
  GALATA = 'Galata',
  BALAT = 'Balat',
  FENER = 'Fener',
  TAKSIM = 'Taksim',
  NISANTASI = 'Nişantaşı',
  RUMELI_HISARI = 'Rumeli Hisarı',
  BEBEK = 'Bebek',
  MODA = 'Moda',
  PRINCES_ISLANDS = "Princes' Islands",
}

export enum AttractionCategory {
  HISTORICAL = 'Historical',
  MUSEUM = 'Museum',
  MOSQUE = 'Mosque',
  PALACE = 'Palace',
  BAZAAR = 'Bazaar',
  PARK = 'Park',
  VIEWPOINT = 'Viewpoint',
  SQUARE = 'Square',
  TRANSPORTATION = 'Transportation',
  ISLAND = 'Island',
  RELIGIOUS = 'Religious',
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
