import { IstanbulDistrict, DistrictConfig } from '@/types';

// District center points and radius configurations for Istanbul
export const DISTRICT_CONFIGS: DistrictConfig[] = [
  {
    name: IstanbulDistrict.SULTANAHMET,
    center: {
      latitude: 41.0082,
      longitude: 28.9784,
    },
    radiusKm: 2.5,
  },
  {
    name: IstanbulDistrict.BEYOGLU,
    center: {
      latitude: 41.0369,
      longitude: 28.9784,
    },
    radiusKm: 3.0,
  },
  {
    name: IstanbulDistrict.BESIKTAS,
    center: {
      latitude: 41.0422,
      longitude: 29.0089,
    },
    radiusKm: 2.8,
  },
  {
    name: IstanbulDistrict.KADIKOY,
    center: {
      latitude: 40.9903,
      longitude: 29.0259,
    },
    radiusKm: 3.5,
  },
  {
    name: IstanbulDistrict.USKUDAR,
    center: {
      latitude: 41.0226,
      longitude: 29.0155,
    },
    radiusKm: 2.5,
  },
  {
    name: IstanbulDistrict.ORTAKOY,
    center: {
      latitude: 41.0553,
      longitude: 29.0275,
    },
    radiusKm: 2.0,
  },
];

// Helper function to get district config by name
export const getDistrictConfig = (
  district: IstanbulDistrict
): DistrictConfig | undefined => {
  return DISTRICT_CONFIGS.find((config) => config.name === district);
};
