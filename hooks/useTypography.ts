/**
 * Typography Hook
 * Provides easy access to themed typography styles
 */

import { TextStyle } from "react-native";
import { Typography } from "@/constants/theme";

export function useTypography() {
  return {
    // Heading styles (Poppins)
    h1: {
      fontFamily: Typography.fontFamily.heading.bold,
      fontSize: Typography.fontSize["4xl"],
      lineHeight: Typography.fontSize["4xl"] * Typography.lineHeight.tight,
    } as TextStyle,
    h2: {
      fontFamily: Typography.fontFamily.heading.bold,
      fontSize: Typography.fontSize["3xl"],
      lineHeight: Typography.fontSize["3xl"] * Typography.lineHeight.tight,
    } as TextStyle,
    h3: {
      fontFamily: Typography.fontFamily.heading.semibold,
      fontSize: Typography.fontSize["2xl"],
      lineHeight: Typography.fontSize["2xl"] * Typography.lineHeight.tight,
    } as TextStyle,
    h4: {
      fontFamily: Typography.fontFamily.heading.semibold,
      fontSize: Typography.fontSize.xl,
      lineHeight: Typography.fontSize.xl * Typography.lineHeight.normal,
    } as TextStyle,
    h5: {
      fontFamily: Typography.fontFamily.heading.medium,
      fontSize: Typography.fontSize.lg,
      lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
    } as TextStyle,

    // Body styles (Inter)
    body: {
      fontFamily: Typography.fontFamily.body.regular,
      fontSize: Typography.fontSize.base,
      lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    } as TextStyle,
    bodyMedium: {
      fontFamily: Typography.fontFamily.body.medium,
      fontSize: Typography.fontSize.base,
      lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    } as TextStyle,
    bodySemibold: {
      fontFamily: Typography.fontFamily.body.semibold,
      fontSize: Typography.fontSize.base,
      lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    } as TextStyle,
    bodySmall: {
      fontFamily: Typography.fontFamily.body.regular,
      fontSize: Typography.fontSize.sm,
      lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    } as TextStyle,
    caption: {
      fontFamily: Typography.fontFamily.body.regular,
      fontSize: Typography.fontSize.xs,
      lineHeight: Typography.fontSize.xs * Typography.lineHeight.normal,
    } as TextStyle,

    // Direct font family access
    fonts: Typography.fontFamily,
  };
}
