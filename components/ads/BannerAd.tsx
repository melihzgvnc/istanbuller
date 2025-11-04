import { AD_CONFIG, hasPlaceholderIds } from "@/constants/AdConfig";
import Theme from "@/constants/theme";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { SafeAreaView } from "react-native-safe-area-context";
import { logger } from "@/utils/logger";

interface BannerAdProps {
  adUnitId: string;
  size?: BannerAdSize;
  style?: any;
}

export default function BannerAdComponent({
  adUnitId,
  size = BannerAdSize.ADAPTIVE_BANNER,
  style,
}: BannerAdProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Use test ID in development, production ID otherwise
  const finalAdUnitId = AD_CONFIG.testMode ? TestIds.BANNER : adUnitId;

  // Debug logging and placeholder detection
  React.useEffect(() => {
    logger.log(
      `Banner Ad - Test Mode: ${AD_CONFIG.testMode}, Using Ad Unit ID: ${finalAdUnitId}`
    );

    // Warn if iOS placeholder IDs are detected in development
    if (__DEV__ && hasPlaceholderIds()) {
      logger.warn(
        "⚠️ iOS AdMob IDs are still placeholders! Ads will not work on iOS until you configure real AdMob IDs. See docs/ADMOB_CONFIGURATION.md for setup instructions."
      );
    }
  }, [finalAdUnitId]);

  const handleAdLoaded = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleAdFailedToLoad = (error: any) => {
    logger.warn("Banner ad failed to load:", error);
    setIsLoading(false);
    setHasError(true);

    // Log specific error details for debugging
    if (error?.message?.includes("no-fill")) {
      logger.log("No ads available (no-fill) - this is normal in development");
    } else if (error?.message?.includes("network")) {
      logger.log("Network error loading ad");
    }

    // Retry loading for non-no-fill errors (max 3 retries)
    if (!error?.message?.includes("no-fill") && retryCount < 3) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setIsLoading(true);
        setHasError(false);
      }, 5000); // Retry after 5 seconds
    }
  };

  // Don't render anything if there's an error
  if (hasError) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, style]} edges={["bottom"]}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Theme.colors.primary[500]} />
        </View>
      )}
      <BannerAd
        unitId={finalAdUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailedToLoad}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border.default,
  },
  loadingContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.surface,
  },
});
