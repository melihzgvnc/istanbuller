import { getAdUnitId } from "@/constants/AdConfig";
import Theme from "@/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Conditionally import AdMob components
let BannerAd: any = null;
let BannerAdSize: any = null;
try {
  const admobModule = require("react-native-google-mobile-ads");
  BannerAd = admobModule.BannerAd;
  BannerAdSize = admobModule.BannerAdSize;
} catch (error) {
  // AdMob not available - will show fallback
}

interface BannerAdComponentProps {
  /**
   * Optional custom ad unit ID
   * If not provided, uses the configured ad unit ID
   */
  adUnitId?: string;

  /**
   * Banner size - defaults to standard banner
   */
  size?: any;

  /**
   * Custom styles for the container
   */
  style?: any;

  /**
   * Whether to show a fallback when ad fails to load
   */
  showFallback?: boolean;
}

/**
 * Banner Ad Component
 *
 * A wrapper around Google Mobile Ads Banner with error handling
 * and fallback UI for when ads fail to load or AdMob is not available.
 */
export default function BannerAdComponent({
  adUnitId,
  size,
  style,
  showFallback = true,
}: BannerAdComponentProps) {
  const [adError, setAdError] = useState<string | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  // If AdMob is not available (Expo Go), show fallback or nothing
  if (!BannerAd || !BannerAdSize) {
    if (showFallback) {
      return (
        <View style={[styles.container, styles.fallbackContainer, style]}>
          <Text style={styles.fallbackText}>Advertisement</Text>
        </View>
      );
    }
    return null;
  }

  // Use provided ad unit ID or get the configured one
  const finalAdUnitId = adUnitId || getAdUnitId("banner");
  const finalSize = size || BannerAdSize.ADAPTIVE_BANNER;

  const handleAdLoaded = () => {
    setAdLoaded(true);
    setAdError(null);
  };

  const handleAdFailedToLoad = (error: any) => {
    console.warn("Banner ad failed to load:", error);
    setAdError(error?.message || "Ad failed to load");
    setAdLoaded(false);
  };

  const handleAdOpened = () => {
    console.log("Banner ad opened");
  };

  const handleAdClosed = () => {
    console.log("Banner ad closed");
  };

  // Show fallback UI if ad failed to load and fallback is enabled
  if (adError && showFallback) {
    return (
      <View style={[styles.container, styles.fallbackContainer, style]}>
        <Text style={styles.fallbackText}>Advertisement</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={finalAdUnitId}
        size={finalSize}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailedToLoad}
        onAdOpened={handleAdOpened}
        onAdClosed={handleAdClosed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border.default,
  },
  fallbackContainer: {
    height: 50,
    backgroundColor: Theme.colors.neutral[100],
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border.light,
  },
  fallbackText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
});
