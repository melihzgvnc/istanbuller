/**
 * Haptic Feedback Utilities
 * Provides consistent haptic feedback across the app
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Light haptic feedback for subtle interactions
 * Use for: Button presses, toggle switches, selections
 */
export const lightHaptic = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

/**
 * Medium haptic feedback for standard interactions
 * Use for: Card taps, navigation actions, confirmations
 */
export const mediumHaptic = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

/**
 * Heavy haptic feedback for important interactions
 * Use for: Errors, warnings, important confirmations
 */
export const heavyHaptic = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};

/**
 * Success haptic feedback
 * Use for: Successful operations, completions
 */
export const successHaptic = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
};

/**
 * Warning haptic feedback
 * Use for: Warnings, cautions
 */
export const warningHaptic = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }
};

/**
 * Error haptic feedback
 * Use for: Errors, failures
 */
export const errorHaptic = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
};

/**
 * Selection haptic feedback
 * Use for: Scrolling through pickers, sliders
 */
export const selectionHaptic = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    Haptics.selectionAsync();
  }
};
