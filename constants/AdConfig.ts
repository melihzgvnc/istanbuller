import { Platform } from "react-native";

/**
 * AdMob Configuration
 *
 * Replace these with your actual AdMob App IDs and Ad Unit IDs
 * You can find these in your AdMob console at https://apps.admob.com/
 */

// AdMob App IDs
export const ADMOB_APP_IDS = {
  ios: "ca-app-pub-3940256099942544~1458002511", // Replace with your iOS App ID
  android: "ca-app-pub-8146248774141593~9560062378", // Replace with your Android App ID
} as const;

// Banner Ad Unit IDs
export const BANNER_AD_UNIT_IDS = {
  ios: "ca-app-pub-3940256099942544/2934735716", // Replace with your iOS Banner Ad Unit ID
  android: "ca-app-pub-8146248774141593/4938678125", // Replace with your Android Banner Ad Unit ID
} as const;

// Interstitial Ad Unit IDs
export const INTERSTITIAL_AD_UNIT_IDS = {
  ios: "ca-app-pub-3940256099942544/4411468910", // Replace with your iOS Interstitial Ad Unit ID
  android: "ca-app-pub-8146248774141593/2333336710", // Replace with your Android Interstitial Ad Unit ID
} as const;

/**
 * Get the current platform's App ID
 */
export const getAppId = (): string => {
  return Platform.OS === "ios" ? ADMOB_APP_IDS.ios : ADMOB_APP_IDS.android;
};

/**
 * Get the current platform's Banner Ad Unit ID
 */
export const getBannerAdUnitId = (): string => {
  return Platform.OS === "ios"
    ? BANNER_AD_UNIT_IDS.ios
    : BANNER_AD_UNIT_IDS.android;
};

/**
 * Get the current platform's Interstitial Ad Unit ID
 */
export const getInterstitialAdUnitId = (): string => {
  return Platform.OS === "ios"
    ? INTERSTITIAL_AD_UNIT_IDS.ios
    : INTERSTITIAL_AD_UNIT_IDS.android;
};

/**
 * Check if we're in development mode
 * IMPORTANT: In development (__DEV__ = true), we ALWAYS use test ad unit IDs
 * This is intentional to prevent invalid traffic to your real ad units
 * Your real ad unit IDs will only be used in production builds
 */
export const isDevelopment = __DEV__;

/**
 * Development/Test Ad Unit IDs
 * These are Google's test ad unit IDs for development
 * You will see these IDs in logs when running in development mode - this is correct!
 */
export const TEST_AD_UNIT_IDS = {
  banner: "ca-app-pub-3940256099942544/6300978111", // Android test banner
  interstitial: "ca-app-pub-3940256099942544/1033173712", // Android test interstitial
} as const;

/**
 * Get the appropriate ad unit ID based on environment
 * Development mode: Returns test ad unit IDs (you'll see ca-app-pub-3940256099942544 in logs)
 * Production mode: Returns your real ad unit IDs
 */
export const getAdUnitId = (type: "banner" | "interstitial"): string => {
  if (isDevelopment) {
    console.log(`[AdMob] Using TEST ad unit ID for ${type} (development mode)`);
    return TEST_AD_UNIT_IDS[type];
  }

  const adUnitId = type === "banner" ? getBannerAdUnitId() : getInterstitialAdUnitId();
  console.log(`[AdMob] Using PRODUCTION ad unit ID for ${type}: ${adUnitId}`);
  return adUnitId;
};
