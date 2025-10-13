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
    description: 'Historic heart of Istanbul',
    keyLandmarks: ['Hagia Sophia', 'Blue Mosque', 'Topkapi Palace'],
    icon: 'building.columns',
  },
  {
    name: IstanbulDistrict.BEYOGLU,
    displayName: 'Beyoğlu',
    description: 'Modern cultural center',
    keyLandmarks: ['Galata Tower', 'Istiklal Street', 'Taksim Square'],
    icon: 'building.2',
  },
  {
    name: IstanbulDistrict.BESIKTAS,
    displayName: 'Beşiktaş',
    description: 'Bosphorus waterfront',
    keyLandmarks: ['Dolmabahçe Palace', 'Beşiktaş Square', 'Yıldız Park'],
    icon: 'water.waves',
  },
  {
    name: IstanbulDistrict.KADIKOY,
    displayName: 'Kadıköy',
    description: 'Asian side cultural hub',
    keyLandmarks: ['Moda', 'Kadıköy Market', 'Fenerbahçe Park'],
    icon: 'ferry',
  },
  {
    name: IstanbulDistrict.USKUDAR,
    displayName: 'Üsküdar',
    description: 'Historic Asian district',
    keyLandmarks: ['Maiden\'s Tower', 'Çamlıca Hill', 'Mihrimah Sultan Mosque'],
    icon: 'mosque',
  },
  {
    name: IstanbulDistrict.ORTAKOY,
    displayName: 'Ortaköy',
    description: 'Bosphorus Bridge neighborhood',
    keyLandmarks: ['Ortaköy Mosque', 'Bosphorus Bridge', 'Ortaköy Square'],
    icon: 'bridge',
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
