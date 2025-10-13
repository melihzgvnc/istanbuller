import { Linking, Platform } from 'react-native';
import { Coordinates } from '@/types';
import { showErrorToast } from './toast';

/**
 * Opens Google Maps with directions from user's location to destination
 * @param destination - Target coordinates
 * @param destinationName - Name of the destination (optional)
 * @param userLocation - User's current location (optional, if not provided, Google Maps will use device location)
 */
export const openGoogleMapsDirections = async (
  destination: Coordinates,
  destinationName?: string,
  userLocation?: Coordinates
): Promise<void> => {
  try {
    let url: string;

    if (Platform.OS === 'ios') {
      // iOS: Use Apple Maps or Google Maps app if installed
      const origin = userLocation 
        ? `${userLocation.latitude},${userLocation.longitude}`
        : '';
      
      url = `maps://app?daddr=${destination.latitude},${destination.longitude}`;
      if (origin) {
        url += `&saddr=${origin}`;
      }
      
      // Try to open Apple Maps first
      const canOpen = await Linking.canOpenURL(url);
      
      if (!canOpen) {
        // Fallback to Google Maps web
        url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
        if (origin) {
          url += `&origin=${origin}`;
        }
      }
    } else {
      // Android: Use Google Maps app or web
      const origin = userLocation 
        ? `${userLocation.latitude},${userLocation.longitude}`
        : '';
      
      // Try Google Maps app first
      url = `google.navigation:q=${destination.latitude},${destination.longitude}`;
      const canOpenNavigation = await Linking.canOpenURL(url);
      
      if (!canOpenNavigation) {
        // Fallback to Google Maps directions
        url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
        if (origin) {
          url += `&origin=${origin}`;
        }
        if (destinationName) {
          url += `&destination_place_id=${encodeURIComponent(destinationName)}`;
        }
      }
    }

    await Linking.openURL(url);
  } catch (error) {
    console.error('Failed to open maps:', error);
    showErrorToast('Unable to open maps. Please check if Google Maps is installed.');
  }
};
