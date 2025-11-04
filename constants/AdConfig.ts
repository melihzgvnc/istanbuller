/**
 * AdMob Configuration
 *
 * Replace the placeholder values below with your actual AdMob App IDs and Ad Unit IDs
 * from your Google AdMob console.
 *
 * IMPORTANT: iOS AdMob IDs are currently placeholders and MUST be replaced before iOS release.
 * See docs/ADMOB_CONFIGURATION.md for detailed setup instructions.
 */

import { Platform } from "react-native";

// AdMob App IDs
export const ANDROID_APP_ID = "ca-app-pub-8146248774141593~9560062378";
export const IOS_APP_ID = "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"; // TODO: Replace with your iOS App ID from AdMob console

// Android Ad Unit IDs (configured)
export const BANNER_AD_UNIT_ID_HOME_ANDROID = "ca-app-pub-8146248774141593/4938678125";
export const BANNER_AD_UNIT_ID_EXPLORE_ANDROID = "ca-app-pub-8146248774141593/6316478017";
export const INTERSTITIAL_AD_UNIT_ID_ANDROID = "ca-app-pub-8146248774141593/2333336710";

// iOS Ad Unit IDs (placeholders - MUST be replaced)
// TODO: Replace these with your actual iOS Ad Unit IDs from AdMob console
// Format: ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
export const BANNER_AD_UNIT_ID_HOME_IOS = "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX";
export const BANNER_AD_UNIT_ID_EXPLORE_IOS = "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX";
export const INTERSTITIAL_AD_UNIT_ID_IOS = "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX";

// Platform-specific Ad Unit IDs
export const BANNER_AD_UNIT_ID_HOME =
  Platform.OS === "ios"
    ? BANNER_AD_UNIT_ID_HOME_IOS
    : BANNER_AD_UNIT_ID_HOME_ANDROID;

export const BANNER_AD_UNIT_ID_EXPLORE =
  Platform.OS === "ios"
    ? BANNER_AD_UNIT_ID_EXPLORE_IOS
    : BANNER_AD_UNIT_ID_EXPLORE_ANDROID;

export const INTERSTITIAL_AD_UNIT_ID =
  Platform.OS === "ios"
    ? INTERSTITIAL_AD_UNIT_ID_IOS
    : INTERSTITIAL_AD_UNIT_ID_ANDROID;

// Helper function to detect placeholder IDs
const isPlaceholderId = (id: string): boolean => {
  return id.includes("XXXXXXXXXXXXXXXX") || id.includes("XXXXXXXXXX");
};

// Detect if iOS AdMob IDs are still placeholders
export const hasPlaceholderIds = (): boolean => {
  if (Platform.OS === "ios") {
    return (
      isPlaceholderId(IOS_APP_ID) ||
      isPlaceholderId(BANNER_AD_UNIT_ID_HOME_IOS) ||
      isPlaceholderId(BANNER_AD_UNIT_ID_EXPLORE_IOS) ||
      isPlaceholderId(INTERSTITIAL_AD_UNIT_ID_IOS)
    );
  }
  return false;
};

// Ad Configuration
export const AD_CONFIG = {
  // Banner ad refresh rate (in seconds)
  bannerRefreshRate: 30,

  // Interstitial ad frequency capping
  interstitialFrequencyCap: 3, // Show every 3rd view

  // Test mode flag - set to false for production
  testMode: false,

  // Ad request timeout (in milliseconds)
  requestTimeout: 10000,
} as const;

// Storage keys for persistence
export const STORAGE_KEYS = {
  AD_VIEW_COUNT: "@istanbuller:ad_view_count",
} as const;
