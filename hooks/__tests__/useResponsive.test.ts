/**
 * Tests for useResponsive hook
 */

import { renderHook } from '@testing-library/react-native';
import { useWindowDimensions } from 'react-native';
import { useResponsive } from '../useResponsive';
import { DESIGN_WIDTH } from '../../utils/responsive';

// Mock React Native modules
jest.mock('react-native', () => ({
  useWindowDimensions: jest.fn(),
}));

describe('useResponsive hook', () => {
  describe('small phone (320x568)', () => {
    it('should return correct values for small phone in portrait', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 320,
        height: 568,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(320);
      expect(result.current.height).toBe(568);
      expect(result.current.deviceCategory).toBe('small');
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isLandscape).toBe(false);
      expect(result.current.isPortrait).toBe(true);
      expect(result.current.scale).toBeCloseTo(320 / DESIGN_WIDTH, 5);
    });

    it('should return correct values for small phone in landscape', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 568,
        height: 320,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(568);
      expect(result.current.height).toBe(320);
      expect(result.current.deviceCategory).toBe('large');
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isLandscape).toBe(true);
      expect(result.current.isPortrait).toBe(false);
      expect(result.current.scale).toBeCloseTo(568 / DESIGN_WIDTH, 5);
    });
  });

  describe('medium phone (375x667)', () => {
    it('should return correct values for medium phone in portrait', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 375,
        height: 667,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(375);
      expect(result.current.height).toBe(667);
      expect(result.current.deviceCategory).toBe('medium');
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isLandscape).toBe(false);
      expect(result.current.isPortrait).toBe(true);
      expect(result.current.scale).toBe(1);
    });

    it('should return correct values for medium phone in landscape', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 667,
        height: 375,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(667);
      expect(result.current.height).toBe(375);
      expect(result.current.deviceCategory).toBe('large');
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isLandscape).toBe(true);
      expect(result.current.isPortrait).toBe(false);
      expect(result.current.scale).toBeCloseTo(667 / DESIGN_WIDTH, 5);
    });
  });

  describe('large phone (414x896)', () => {
    it('should return correct values for large phone in portrait', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 414,
        height: 896,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(414);
      expect(result.current.height).toBe(896);
      expect(result.current.deviceCategory).toBe('large');
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isLandscape).toBe(false);
      expect(result.current.isPortrait).toBe(true);
      expect(result.current.scale).toBeCloseTo(414 / DESIGN_WIDTH, 5);
    });

    it('should return correct values for large phone in landscape', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 896,
        height: 414,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(896);
      expect(result.current.height).toBe(414);
      expect(result.current.deviceCategory).toBe('tablet');
      expect(result.current.isTablet).toBe(true);
      expect(result.current.isLandscape).toBe(true);
      expect(result.current.isPortrait).toBe(false);
      expect(result.current.scale).toBeCloseTo(896 / DESIGN_WIDTH, 5);
    });
  });

  describe('tablet (768x1024)', () => {
    it('should return correct values for tablet in portrait', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 768,
        height: 1024,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(768);
      expect(result.current.height).toBe(1024);
      expect(result.current.deviceCategory).toBe('tablet');
      expect(result.current.isTablet).toBe(true);
      expect(result.current.isLandscape).toBe(false);
      expect(result.current.isPortrait).toBe(true);
      expect(result.current.scale).toBeCloseTo(768 / DESIGN_WIDTH, 5);
    });

    it('should return correct values for tablet in landscape', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 1024,
        height: 768,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(1024);
      expect(result.current.height).toBe(768);
      expect(result.current.deviceCategory).toBe('tablet');
      expect(result.current.isTablet).toBe(true);
      expect(result.current.isLandscape).toBe(true);
      expect(result.current.isPortrait).toBe(false);
      expect(result.current.scale).toBeCloseTo(1024 / DESIGN_WIDTH, 5);
    });
  });

  describe('edge cases', () => {
    it('should handle square dimensions', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 500,
        height: 500,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(500);
      expect(result.current.height).toBe(500);
      expect(result.current.deviceCategory).toBe('large');
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isLandscape).toBe(false);
      expect(result.current.isPortrait).toBe(false);
      expect(result.current.scale).toBeCloseTo(500 / DESIGN_WIDTH, 5);
    });

    it('should handle very small dimensions', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 240,
        height: 320,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(240);
      expect(result.current.height).toBe(320);
      expect(result.current.deviceCategory).toBe('small');
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isLandscape).toBe(false);
      expect(result.current.isPortrait).toBe(true);
      expect(result.current.scale).toBeCloseTo(240 / DESIGN_WIDTH, 5);
    });

    it('should handle very large dimensions', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 1920,
        height: 1080,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.width).toBe(1920);
      expect(result.current.height).toBe(1080);
      expect(result.current.deviceCategory).toBe('tablet');
      expect(result.current.isTablet).toBe(true);
      expect(result.current.isLandscape).toBe(true);
      expect(result.current.isPortrait).toBe(false);
      expect(result.current.scale).toBeCloseTo(1920 / DESIGN_WIDTH, 5);
    });
  });

  describe('breakpoint boundaries', () => {
    it('should correctly classify at 375px boundary', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 375,
        height: 667,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.deviceCategory).toBe('medium');
      expect(result.current.isTablet).toBe(false);
    });

    it('should correctly classify at 414px boundary', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 414,
        height: 896,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.deviceCategory).toBe('large');
      expect(result.current.isTablet).toBe(false);
    });

    it('should correctly classify at 768px boundary', () => {
      (useWindowDimensions as jest.Mock).mockReturnValue({
        width: 768,
        height: 1024,
      });

      const { result } = renderHook(() => useResponsive());

      expect(result.current.deviceCategory).toBe('tablet');
      expect(result.current.isTablet).toBe(true);
    });
  });
});
