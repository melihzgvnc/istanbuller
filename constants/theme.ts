/**
 * Comprehensive Theme System for Istanbul Tourist Guide
 * Provides consistent colors, typography, spacing, and accessibility standards
 */

import { Platform } from 'react-native';

// Color Palette - Pastel, soothing colors inspired by Istanbul
export const Colors = {
  // Primary - Soft blue inspired by Bosphorus at dawn
  primary: {
    50: '#F0F7FF',
    100: '#E0EFFF',
    200: '#C7E2FF',
    300: '#A5D0FF',
    400: '#7AB8FF',
    500: '#6BA5F5', // Main primary - soft pastel blue
    600: '#5B8FDB',
    700: '#4A75B8',
    800: '#3A5E94',
    900: '#2D4A75',
  },

  // Secondary - Soft terracotta inspired by Istanbul architecture
  secondary: {
    50: '#FFF8F3',
    100: '#FFEEE0',
    200: '#FFE0C7',
    300: '#FFCBA5',
    400: '#FFB07A',
    500: '#F5A76B', // Main secondary - soft pastel coral
    600: '#DB8F5B',
    700: '#B8754A',
    800: '#945E3A',
    900: '#754A2D',
  },

  // Success - Soft mint green
  success: {
    50: '#F0FDF9',
    100: '#DDFBF0',
    200: '#BFF5E0',
    300: '#8EECC9',
    400: '#5DDCAE',
    500: '#6BC9A8', // Soft pastel mint
    600: '#5BAF92',
    700: '#4A9178',
    800: '#3A7460',
    900: '#2D5C4A',
  },

  // Error - Soft rose
  error: {
    50: '#FFF5F5',
    100: '#FFE8E8',
    200: '#FFD1D1',
    300: '#FFB0B0',
    400: '#FF8A8A',
    500: '#F57A7A', // Soft pastel rose
    600: '#DB6B6B',
    700: '#B85757',
    800: '#944545',
    900: '#753636',
  },

  // Warning - Soft peach
  warning: {
    50: '#FFFBF0',
    100: '#FFF4DD',
    200: '#FFE9BF',
    300: '#FFD98E',
    400: '#FFC55D',
    500: '#F5B86B', // Soft pastel peach
    600: '#DBA05B',
    700: '#B8854A',
    800: '#946A3A',
    900: '#75542D',
  },

  // Neutral - Warm grays with subtle warmth
  neutral: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },

  // Semantic colors
  background: '#FDFCFB',
  surface: '#F9F8F7',
  text: {
    primary: '#2D2A27',
    secondary: '#78716C',
    tertiary: '#A8A29E',
    inverse: '#FFFFFF',
  },
  border: {
    light: '#F5F5F4',
    default: '#E7E5E4',
    dark: '#D6D3D1',
  },
  overlay: 'rgba(0, 0, 0, 0.4)',
};

// Typography
export const Typography = {
  // Font families
  fontFamily: Platform.select({
    ios: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    android: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      semibold: 'Roboto-Medium',
      bold: 'Roboto-Bold',
    },
    default: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
  }),

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Spacing system (based on 4px grid)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// Border radius - Increased for softer, more rounded appearance
export const BorderRadius = {
  none: 0,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  full: 9999,
};

// Shadows
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
  }),
  base: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
  }),
};

// Accessibility - Minimum touch target sizes
export const Accessibility = {
  minTouchTarget: 44, // iOS HIG and Material Design recommendation
  minTouchTargetAndroid: 48, // Material Design specific

  // Contrast ratios (WCAG AA compliance)
  contrastRatios: {
    normalText: 4.5, // Minimum for normal text
    largeText: 3, // Minimum for large text (18pt+ or 14pt+ bold)
  },
};

// Animation durations (in milliseconds)
export const Animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// Layout constants
export const Layout = {
  screenPadding: Spacing.base,
  cardPadding: Spacing.base,
  sectionSpacing: Spacing.xl,
  itemSpacing: Spacing.md,
};

// Export default theme object
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  accessibility: Accessibility,
  animation: Animation,
  layout: Layout,
};

export default Theme;
