/**
 * Responsive Utilities for Istanbul Tourist Guide
 * Provides scaling and device detection utilities for responsive layouts
 */

import { Dimensions, PixelRatio } from 'react-native';

// Base design width - iPhone X/11/12/13 width (most common mobile device)
export const DESIGN_WIDTH = 375;

/**
 * Device category classification based on screen width
 */
export type DeviceCategory = 'small' | 'medium' | 'large' | 'tablet';

/**
 * Normalize function - scales values based on screen width
 * Uses PixelRatio.roundToNearestPixel for crisp rendering
 * 
 * @param size - The size value to normalize (based on 375px design width)
 * @returns Scaled size value rounded to nearest pixel
 */
export const normalize = (size: number): number => {
  const { width } = Dimensions.get('window');
  const scale = width / DESIGN_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Get device category based on screen width
 * 
 * @param width - Screen width in pixels
 * @returns Device category classification
 */
export const getDeviceCategory = (width: number): DeviceCategory => {
  if (width < 375) return 'small';
  if (width < 414) return 'medium';
  if (width < 768) return 'large';
  return 'tablet';
};

/**
 * Check if device is in landscape orientation
 * 
 * @param width - Screen width in pixels
 * @param height - Screen height in pixels
 * @returns True if landscape (width > height)
 */
export const isLandscape = (width: number, height: number): boolean => {
  return width > height;
};

/**
 * Check if device is in portrait orientation
 * 
 * @param width - Screen width in pixels
 * @param height - Screen height in pixels
 * @returns True if portrait (height > width)
 */
export const isPortrait = (width: number, height: number): boolean => {
  return height > width;
};
