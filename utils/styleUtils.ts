/**
 * Shared style utilities for common patterns
 * Helps reduce inline styles and promote reusability
 */

import { EdgeInsets } from 'react-native-safe-area-context';
import { ViewStyle } from 'react-native';

/**
 * Generate safe area padding styles
 * Use this to apply safe area insets consistently across screens
 */
export const createSafeAreaStyle = (
  insets: EdgeInsets,
  options?: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  }
): ViewStyle => {
  const { top = true, bottom = true, left = true, right = true } = options || {};

  return {
    ...(top && { paddingTop: insets.top }),
    ...(bottom && { paddingBottom: insets.bottom }),
    ...(left && { paddingLeft: insets.left }),
    ...(right && { paddingRight: insets.right }),
  };
};

/**
 * Generate safe area padding for specific edges only
 */
export const createSafeAreaPadding = {
  top: (insets: EdgeInsets): ViewStyle => ({ paddingTop: insets.top }),
  bottom: (insets: EdgeInsets): ViewStyle => ({ paddingBottom: insets.bottom }),
  left: (insets: EdgeInsets): ViewStyle => ({ paddingLeft: insets.left }),
  right: (insets: EdgeInsets): ViewStyle => ({ paddingRight: insets.right }),
  horizontal: (insets: EdgeInsets): ViewStyle => ({
    paddingLeft: insets.left,
    paddingRight: insets.right,
  }),
  vertical: (insets: EdgeInsets): ViewStyle => ({
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  }),
};
