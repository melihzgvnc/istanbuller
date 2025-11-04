/**
 * useResponsive Hook
 * Provides reactive responsive values for components
 */

import { useWindowDimensions } from 'react-native';
import { getDeviceCategory, isLandscape, isPortrait, DESIGN_WIDTH, DeviceCategory } from '../utils/responsive';

/**
 * Responsive values returned by useResponsive hook
 */
export interface ResponsiveValues {
  /** Current window width in pixels */
  width: number;
  /** Current window height in pixels */
  height: number;
  /** Device category classification */
  deviceCategory: DeviceCategory;
  /** True if device is a tablet (width >= 768px) */
  isTablet: boolean;
  /** True if device is in landscape orientation */
  isLandscape: boolean;
  /** True if device is in portrait orientation */
  isPortrait: boolean;
  /** Scale factor relative to design width (375px) */
  scale: number;
}

/**
 * Hook that provides reactive responsive values
 * Updates automatically when window dimensions change
 * 
 * @returns ResponsiveValues object with current device characteristics
 * 
 * @example
 * ```tsx
 * const { isTablet, isLandscape, scale } = useResponsive();
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     padding: isTablet ? 24 : 16,
 *     flexDirection: isLandscape ? 'row' : 'column',
 *   }
 * });
 * ```
 */
export const useResponsive = (): ResponsiveValues => {
  const { width, height } = useWindowDimensions();
  const deviceCategory = getDeviceCategory(width);

  return {
    width,
    height,
    deviceCategory,
    isTablet: deviceCategory === 'tablet',
    isLandscape: isLandscape(width, height),
    isPortrait: isPortrait(width, height),
    scale: width / DESIGN_WIDTH,
  };
};
