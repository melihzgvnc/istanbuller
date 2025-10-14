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
      longitude: 29.0078,
    },
    radiusKm: 2.8,
  },
  {
    name: IstanbulDistrict.KADIKOY,
    center: {
      latitude: 40.9904,
      longitude: 29.0258,
    },
    radiusKm: 3.5,
  },
  {
    name: IstanbulDistrict.USKUDAR,
    center: {
      latitude: 41.0225,
      longitude: 29.015,
    },
    radiusKm: 3.2,
  },
  {
    name: IstanbulDistrict.ORTAKOY,
    center: {
      latitude: 41.0553,
      longitude: 29.0264,
    },
    radiusKm: 1.5,
  },
  {
    name: IstanbulDistrict.EMINONU,
    center: {
      latitude: 41.0165,
      longitude: 28.9711,
    },
    radiusKm: 2.0,
  },
  {
    name: IstanbulDistrict.GALATA,
    center: {
      latitude: 41.0257,
      longitude: 28.9733,
    },
    radiusKm: 1.2,
  },
  {
    name: IstanbulDistrict.BALAT,
    center: {
      latitude: 41.0324,
      longitude: 28.9481,
    },
    radiusKm: 1.5,
  },
  {
    name: IstanbulDistrict.FENER,
    center: {
      latitude: 41.031,
      longitude: 28.9473,
    },
    radiusKm: 1.2,
  },
  {
    name: IstanbulDistrict.TAKSIM,
    center: {
      latitude: 41.037,
      longitude: 28.9856,
    },
    radiusKm: 1.8,
  },
  {
    name: IstanbulDistrict.NISANTASI,
    center: {
      latitude: 41.0469,
      longitude: 28.9903,
    },
    radiusKm: 1.5,
  },
  {
    name: IstanbulDistrict.RUMELI_HISARI,
    center: {
      latitude: 41.0841,
      longitude: 29.0571,
    },
    radiusKm: 1.3,
  },
  {
    name: IstanbulDistrict.BEBEK,
    center: {
      latitude: 41.074,
      longitude: 29.042,
    },
    radiusKm: 1.3,
  },
  {
    name: IstanbulDistrict.MODA,
    center: {
      latitude: 40.9846,
      longitude: 29.0242,
    },
    radiusKm: 1.5,
  },
  {
    name: IstanbulDistrict.PRINCES_ISLANDS,
    center: {
      latitude: 40.874,
      longitude: 29.09,
    },
    radiusKm: 6.0,
  },
];

// Helper function to get district config by name
export const getDistrictConfig = (
  district: IstanbulDistrict
): DistrictConfig | undefined => {
  return DISTRICT_CONFIGS.find((config) => config.name === district);
};
