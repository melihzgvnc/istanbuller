import { IstanbulDistrict } from '@/types';

// District metadata for manual selection UI
export interface DistrictInfo {
  name: IstanbulDistrict;
  displayName: string;
  description: string;
  keyLandmarks: string[];
  icon: string;
}

const DISTRICTS_ARRAY: DistrictInfo[] = [
  {
    name: IstanbulDistrict.SULTANAHMET,
    displayName: 'Sultanahmet',
    description: 'Historic heart of Istanbul, home to major Byzantine and Ottoman monuments',
    keyLandmarks: ['Hagia Sophia', 'Blue Mosque', 'Topkapi Palace'],
    icon: 'building.columns',
  },
  {
    name: IstanbulDistrict.BEYOGLU,
    displayName: 'Beyoğlu',
    description: 'Modern cultural center with İstiklal Avenue, Galata Tower, and vibrant nightlife',
    keyLandmarks: ['Galata Tower', 'İstiklal Avenue', 'Pera Museum'],
    icon: 'building.2',
  },
  {
    name: IstanbulDistrict.BESIKTAS,
    displayName: 'Beşiktaş',
    description: 'Bosphorus district featuring palaces, parks, and waterfront promenades',
    keyLandmarks: ['Dolmabahçe Palace', 'Beşiktaş Square', 'Yıldız Park'],
    icon: 'water.waves',
  },
  {
    name: IstanbulDistrict.KADIKOY,
    displayName: 'Kadıköy',
    description: 'Vibrant Asian side district known for markets, cafes, and bohemian atmosphere',
    keyLandmarks: ['Kadıköy Market', 'Moda Coast', 'Fenerbahçe Park'],
    icon: 'ferry',
  },
  {
    name: IstanbulDistrict.USKUDAR,
    displayName: 'Üsküdar',
    description: 'Historic Asian side district with mosques, hills, and Bosphorus views',
    keyLandmarks: ['Maiden\'s Tower', 'Çamlıca Hill', 'Mihrimah Sultan Mosque'],
    icon: 'mosque',
  },
  {
    name: IstanbulDistrict.ORTAKOY,
    displayName: 'Ortaköy',
    description: 'Charming Bosphorus neighborhood famous for its mosque and waterfront cafes',
    keyLandmarks: ['Ortaköy Mosque', 'Bosphorus Bridge', 'Ortaköy Square'],
    icon: 'bridge',
  },
  {
    name: IstanbulDistrict.EMINONU,
    displayName: 'Eminönü',
    description: 'Historic area with Spice Bazaar, Galata Bridge, and ferry terminals',
    keyLandmarks: ['Spice Bazaar', 'Galata Bridge', 'New Mosque'],
    icon: 'ferry',
  },
  {
    name: IstanbulDistrict.GALATA,
    displayName: 'Galata',
    description: 'Iconic neighborhood around Galata Tower with stunning city views',
    keyLandmarks: ['Galata Tower', 'Galata Bridge', 'Historic Streets'],
    icon: 'building.columns',
  },
  {
    name: IstanbulDistrict.BALAT,
    displayName: 'Balat',
    description: 'Colorful historic neighborhood known for its old houses and cafes',
    keyLandmarks: ['Colorful Streets', 'Historic Houses', 'Cafes'],
    icon: 'paintpalette',
  },
  {
    name: IstanbulDistrict.FENER,
    displayName: 'Fener',
    description: 'Historic Greek Orthodox neighborhood with old churches and narrow streets',
    keyLandmarks: ['Greek Orthodox Patriarchate', 'Church of St. George', 'Historic Streets'],
    icon: 'building.columns',
  },
  {
    name: IstanbulDistrict.TAKSIM,
    displayName: 'Taksim',
    description: 'Central square and lively area with shops, restaurants, and nightlife',
    keyLandmarks: ['Taksim Square', 'Republic Monument', 'İstiklal Avenue'],
    icon: 'building.2',
  },
  {
    name: IstanbulDistrict.NISANTASI,
    displayName: 'Nişantaşı',
    description: 'Upscale neighborhood with luxury boutiques and cafes',
    keyLandmarks: ['Luxury Boutiques', 'Cafes', 'City\'s Park'],
    icon: 'bag',
  },
  {
    name: IstanbulDistrict.RUMELI_HISARI,
    displayName: 'Rumeli Hisarı',
    description: 'Historic fortress area with Bosphorus views and cafes',
    keyLandmarks: ['Rumeli Fortress', 'Bosphorus Views', 'Historic Walls'],
    icon: 'building.columns',
  },
  {
    name: IstanbulDistrict.BEBEK,
    displayName: 'Bebek',
    description: 'Elegant Bosphorus neighborhood popular for seaside walks and cafes',
    keyLandmarks: ['Bebek Coast', 'Bosphorus Promenade', 'Cafes'],
    icon: 'water.waves',
  },
  {
    name: IstanbulDistrict.MODA,
    displayName: 'Moda',
    description: 'Trendy neighborhood in Kadıköy with sea views, cafes, and parks',
    keyLandmarks: ['Moda Coastal Park', 'Historic Pier', 'Art Nouveau Buildings'],
    icon: 'water.waves',
  },
  {
    name: IstanbulDistrict.PRINCES_ISLANDS,
    displayName: "Princes' Islands",
    description: 'Car-free islands in the Marmara Sea famous for their beaches and mansions',
    keyLandmarks: ['Büyükada', 'Beaches', 'Historic Mansions'],
    icon: 'ferry',
  },
];

export const DISTRICT_METADATA: Record<IstanbulDistrict, DistrictInfo> =
  DISTRICTS_ARRAY.reduce((acc, district) => {
    acc[district.name] = district;
    return acc;
  }, {} as Record<IstanbulDistrict, DistrictInfo>);

// Helper function to get all districts as an array
export const getAllDistricts = (): DistrictInfo[] => {
  return DISTRICTS_ARRAY;
};

// Helper function to get district metadata by name
export const getDistrictMetadata = (
  district: IstanbulDistrict
): DistrictInfo | undefined => {
  return DISTRICT_METADATA[district];
};
