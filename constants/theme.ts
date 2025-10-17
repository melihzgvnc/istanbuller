/**
 * Comprehensive Theme System for Istanbul Tourist Guide
 * Provides consistent colors, typography, spacing, and accessibility standards
 */

import { Platform } from "react-native";

// Color Palette - Pastel, soothing colors inspired by Istanbul
export const Colors = {
  // Primary - Sand/Beige accent (calm)
  primary: {
    50: "#F6F1E9",
    100: "#F0E7D9",
    200: "#E8D9C2",
    300: "#DFC9A8",
    400: "#D6BFA2",
    500: "#CDB493", // Main accent - sand
    600: "#BCA37F",
    700: "#A18B6B",
    800: "#7F6E55",
    900: "#5F5241",
  },

  // Secondary - Muted sage to complement sand
  secondary: {
    50: "#F3F6F2",
    100: "#E6EEE3",
    200: "#D3E0CF",
    300: "#B7C9B0",
    400: "#9DB298",
    500: "#8AA485",
    600: "#748D6F",
    700: "#5E735A",
    800: "#495A46",
    900: "#374338",
  },

  // Success - Soft mint green
  success: {
    50: "#F0FDF9",
    100: "#DDFBF0",
    200: "#BFF5E0",
    300: "#8EECC9",
    400: "#5DDCAE",
    500: "#6BC9A8", // Soft pastel mint
    600: "#5BAF92",
    700: "#4A9178",
    800: "#3A7460",
    900: "#2D5C4A",
  },

  // Error - Soft rose
  error: {
    50: "#FFF5F5",
    100: "#FFE8E8",
    200: "#FFD1D1",
    300: "#FFB0B0",
    400: "#FF8A8A",
    500: "#F57A7A", // Soft pastel rose
    600: "#DB6B6B",
    700: "#B85757",
    800: "#944545",
    900: "#753636",
  },

  // Warning - Soft peach
  warning: {
    50: "#FFFBF0",
    100: "#FFF4DD",
    200: "#FFE9BF",
    300: "#FFD98E",
    400: "#FFC55D",
    500: "#F5B86B", // Soft pastel peach
    600: "#DBA05B",
    700: "#B8854A",
    800: "#946A3A",
    900: "#75542D",
  },

  // Neutral - Warm grays with subtle warmth
  neutral: {
    50: "#FAF8F5",
    100: "#F3EFEA",
    200: "#E7E2DB",
    300: "#D6CFC5",
    400: "#AFA89F",
    500: "#7E776F",
    600: "#5F5A52",
    700: "#3F3B36",
    800: "#2A2622",
    900: "#1A1815",
  },

  // Semantic colors
  background: "#FAF8F5",
  surface: "#FFFFFF",
  text: {
    primary: "#1E1B16",
    secondary: "#5F5A52",
    tertiary: "#AFA89F",
    inverse: "#FFFFFF",
  },
  border: {
    light: "#F3EFEA",
    default: "#E7E2DB",
    dark: "#D6CFC5",
  },
  overlay: "rgba(0, 0, 0, 0.4)",
};

// Scheme-aware minimal color access for Themed components
export const ModeColors = {
  light: {
    background: "#FAF8F5",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    border: "#E7E2DB",
    textPrimary: "#1E1B16",
    textSecondary: "#5F5A52",
    textTertiary: "#AFA89F",
    accent: "#D6BFA2",
    accentMuted: "#EEE4D6",
  },
  dark: {
    background: "#131211",
    surface: "#161513",
    card: "#1C1A18",
    border: "#2A2723",
    textPrimary: "#F5F2ED",
    textSecondary: "#B7B0A6",
    textTertiary: "#8E867B",
    accent: "#CBB08E",
    accentMuted: "#3A332B",
  },
};

// Typography
export const Typography = {
  // Font families
  fontFamily: Platform.select({
    ios: {
      regular: "System",
      medium: "System",
      semibold: "System",
      bold: "System",
    },
    android: {
      regular: "Roboto",
      medium: "Roboto-Medium",
      semibold: "Roboto-Medium",
      bold: "Roboto-Bold",
    },
    default: {
      regular: "System",
      medium: "System",
      semibold: "System",
      bold: "System",
    },
  }),

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
  },

  // Font weights
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
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
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
};

// Border radius - Increased for softer, more rounded appearance
export const BorderRadius = {
  none: 0,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 28,
  full: 9999,
};

// Shadows
export const Shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
  }),
  base: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: "#000",
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
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
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
