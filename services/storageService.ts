import AsyncStorage from '@react-native-async-storage/async-storage';
import { IstanbulDistrict } from '@/types';
import { STORAGE_KEYS } from '@/constants/StorageKeys';

/**
 * Save manually selected district to AsyncStorage
 * @param district - The district to save, or null to clear
 */
export async function saveManualDistrict(
  district: IstanbulDistrict | null
): Promise<void> {
  try {
    if (district === null) {
      await AsyncStorage.removeItem(STORAGE_KEYS.MANUAL_DISTRICT_SELECTION);
    } else {
      await AsyncStorage.setItem(
        STORAGE_KEYS.MANUAL_DISTRICT_SELECTION,
        district
      );
    }
  } catch (error) {
    console.error('Error saving manual district selection:', error);
    throw new Error('Failed to save district selection');
  }
}

/**
 * Load manually selected district from AsyncStorage
 * @returns The saved district or null if none exists
 */
export async function loadManualDistrict(): Promise<IstanbulDistrict | null> {
  try {
    const district = await AsyncStorage.getItem(
      STORAGE_KEYS.MANUAL_DISTRICT_SELECTION
    );
    
    // Validate that the loaded value is a valid district
    if (district && Object.values(IstanbulDistrict).includes(district as IstanbulDistrict)) {
      return district as IstanbulDistrict;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading manual district selection:', error);
    return null;
  }
}

/**
 * Clear manually selected district from AsyncStorage
 */
export async function clearManualDistrict(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.MANUAL_DISTRICT_SELECTION);
  } catch (error) {
    console.error('Error clearing manual district selection:', error);
    throw new Error('Failed to clear district selection');
  }
}

/**
 * Save last auto-detected district to AsyncStorage
 * @param district - The district to save, or null to clear
 */
export async function saveLastAutoDetectedDistrict(
  district: IstanbulDistrict | null
): Promise<void> {
  try {
    if (district === null) {
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_AUTO_DETECTED_DISTRICT);
    } else {
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_AUTO_DETECTED_DISTRICT,
        district
      );
    }
  } catch (error) {
    console.error('Error saving last auto-detected district:', error);
    // Don't throw - this is not critical
  }
}

/**
 * Load last auto-detected district from AsyncStorage
 * @returns The saved district or null if none exists
 */
export async function loadLastAutoDetectedDistrict(): Promise<IstanbulDistrict | null> {
  try {
    const district = await AsyncStorage.getItem(
      STORAGE_KEYS.LAST_AUTO_DETECTED_DISTRICT
    );
    
    // Validate that the loaded value is a valid district
    if (district && Object.values(IstanbulDistrict).includes(district as IstanbulDistrict)) {
      return district as IstanbulDistrict;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading last auto-detected district:', error);
    return null;
  }
}
