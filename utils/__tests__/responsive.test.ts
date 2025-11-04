/**
 * Tests for responsive utilities
 */

import { Dimensions, PixelRatio } from 'react-native';
import {
  normalize,
  getDeviceCategory,
  isLandscape,
  isPortrait,
  DESIGN_WIDTH,
} from '../responsive';

// Mock React Native modules
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(),
  },
  PixelRatio: {
    roundToNearestPixel: jest.fn((value: number) => Math.round(value)),
  },
}));

describe('responsive utilities', () => {
  describe('normalize', () => {
    it('should return the same value for base design width (375px)', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 375, height: 667 });

      const result = normalize(16);
      expect(result).toBe(16);
    });

    it('should scale up values for larger screens (768px tablet)', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 768, height: 1024 });

      const result = normalize(16);
      // 768 / 375 = 2.048, so 16 * 2.048 = 32.768, rounded = 33
      expect(result).toBe(33);
    });

    it('should scale down values for smaller screens (320px)', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 320, height: 568 });

      const result = normalize(16);
      // 320 / 375 = 0.853, so 16 * 0.853 = 13.653, rounded = 14
      expect(result).toBe(14);
    });

    it('should handle large values correctly', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 414, height: 896 });

      const result = normalize(100);
      // 414 / 375 = 1.104, so 100 * 1.104 = 110.4, rounded = 110
      expect(result).toBe(110);
    });

    it('should handle decimal input values', () => {
      (Dimensions.get as jest.Mock).mockReturnValue({ width: 375, height: 667 });

      const result = normalize(16.5);
      expect(result).toBe(17);
    });
  });

  describe('getDeviceCategory', () => {
    it('should return "small" for widths less than 375px', () => {
      expect(getDeviceCategory(320)).toBe('small');
      expect(getDeviceCategory(360)).toBe('small');
      expect(getDeviceCategory(374)).toBe('small');
    });

    it('should return "medium" for widths between 375px and 414px', () => {
      expect(getDeviceCategory(375)).toBe('medium');
      expect(getDeviceCategory(390)).toBe('medium');
      expect(getDeviceCategory(413)).toBe('medium');
    });

    it('should return "large" for widths between 414px and 768px', () => {
      expect(getDeviceCategory(414)).toBe('large');
      expect(getDeviceCategory(428)).toBe('large');
      expect(getDeviceCategory(767)).toBe('large');
    });

    it('should return "tablet" for widths 768px and above', () => {
      expect(getDeviceCategory(768)).toBe('tablet');
      expect(getDeviceCategory(800)).toBe('tablet');
      expect(getDeviceCategory(1024)).toBe('tablet');
      expect(getDeviceCategory(1920)).toBe('tablet');
    });

    it('should handle edge cases at breakpoint boundaries', () => {
      expect(getDeviceCategory(374.9)).toBe('small');
      expect(getDeviceCategory(375.0)).toBe('medium');
      expect(getDeviceCategory(413.9)).toBe('medium');
      expect(getDeviceCategory(414.0)).toBe('large');
      expect(getDeviceCategory(767.9)).toBe('large');
      expect(getDeviceCategory(768.0)).toBe('tablet');
    });
  });

  describe('isLandscape', () => {
    it('should return true when width is greater than height', () => {
      expect(isLandscape(667, 375)).toBe(true);
      expect(isLandscape(896, 414)).toBe(true);
      expect(isLandscape(1024, 768)).toBe(true);
    });

    it('should return false when width is less than height', () => {
      expect(isLandscape(375, 667)).toBe(false);
      expect(isLandscape(414, 896)).toBe(false);
      expect(isLandscape(768, 1024)).toBe(false);
    });

    it('should return false when width equals height (square)', () => {
      expect(isLandscape(500, 500)).toBe(false);
    });

    it('should handle small differences correctly', () => {
      expect(isLandscape(376, 375)).toBe(true);
      expect(isLandscape(375, 376)).toBe(false);
    });
  });

  describe('isPortrait', () => {
    it('should return true when height is greater than width', () => {
      expect(isPortrait(375, 667)).toBe(true);
      expect(isPortrait(414, 896)).toBe(true);
      expect(isPortrait(768, 1024)).toBe(true);
    });

    it('should return false when height is less than width', () => {
      expect(isPortrait(667, 375)).toBe(false);
      expect(isPortrait(896, 414)).toBe(false);
      expect(isPortrait(1024, 768)).toBe(false);
    });

    it('should return false when height equals width (square)', () => {
      expect(isPortrait(500, 500)).toBe(false);
    });

    it('should handle small differences correctly', () => {
      expect(isPortrait(375, 376)).toBe(true);
      expect(isPortrait(376, 375)).toBe(false);
    });
  });

  describe('DESIGN_WIDTH constant', () => {
    it('should be defined as 375', () => {
      expect(DESIGN_WIDTH).toBe(375);
    });
  });
});
