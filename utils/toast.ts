import { Alert, Platform, ToastAndroid } from 'react-native';

/**
 * Toast notification utility for displaying user feedback
 * Uses native toast on Android and Alert on iOS
 */

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  type?: ToastType;
  duration?: 'short' | 'long';
}

/**
 * Show a toast notification
 * @param message - The message to display
 * @param options - Optional configuration
 */
export function showToast(message: string, options?: ToastOptions) {
  const { type = 'info', duration = 'short' } = options || {};

  if (Platform.OS === 'android') {
    // Use native Android toast
    const toastDuration =
      duration === 'long' ? ToastAndroid.LONG : ToastAndroid.SHORT;
    ToastAndroid.show(message, toastDuration);
  } else {
    // Use Alert for iOS
    const title = getAlertTitle(type);
    Alert.alert(title, message);
  }
}

/**
 * Show a success toast
 */
export function showSuccessToast(message: string) {
  showToast(message, { type: 'success' });
}

/**
 * Show an error toast
 */
export function showErrorToast(message: string, duration: 'short' | 'long' = 'long') {
  showToast(message, { type: 'error', duration });
}

/**
 * Show an info toast
 */
export function showInfoToast(message: string) {
  showToast(message, { type: 'info' });
}

/**
 * Show a warning toast
 */
export function showWarningToast(message: string) {
  showToast(message, { type: 'warning' });
}

/**
 * Show a confirmation dialog
 * @param title - Dialog title
 * @param message - Dialog message
 * @param onConfirm - Callback when user confirms
 * @param onCancel - Optional callback when user cancels
 */
export function showConfirmDialog(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'OK',
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
}

/**
 * Get alert title based on toast type
 */
function getAlertTitle(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
    case 'warning':
      return 'Warning';
    case 'info':
    default:
      return 'Info';
  }
}
