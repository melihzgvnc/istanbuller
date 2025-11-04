import { AD_CONFIG, STORAGE_KEYS } from "@/constants/AdConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { logger } from "@/utils/logger";

interface UseInterstitialAdReturn {
  isReady: boolean;
  showAd: () => Promise<void>;
  loadAd: () => void;
}

export function useInterstitialAd(adUnitId: string): UseInterstitialAdReturn {
  const [isReady, setIsReady] = useState(false);
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(
    null
  );

  // Use test ID in development, production ID otherwise
  const finalAdUnitId = AD_CONFIG.testMode ? TestIds.INTERSTITIAL : adUnitId;

  // Debug logging
  React.useEffect(() => {
    logger.log(
      `Interstitial Ad - Test Mode: ${AD_CONFIG.testMode}, Using Ad Unit ID: ${finalAdUnitId}`
    );
  }, [finalAdUnitId]);

  const loadAd = useCallback(() => {
    try {
      const ad = InterstitialAd.createForAdRequest(finalAdUnitId, {
        requestNonPersonalizedAdsOnly: false,
      });

      ad.addAdEventListener(AdEventType.LOADED, () => {
        setIsReady(true);
      });

      ad.addAdEventListener(AdEventType.ERROR, (error) => {
        logger.warn("Interstitial ad failed to load:", error);
        setIsReady(false);

        // Log specific error details for debugging
        if (error?.message?.includes("no-fill")) {
          logger.log(
            "No interstitial ads available (no-fill) - this is normal in development"
          );
        } else if (error?.message?.includes("network")) {
          logger.log("Network error loading interstitial ad");
        }

        // Retry loading after a delay for non-no-fill errors
        if (!error?.message?.includes("no-fill")) {
          setTimeout(() => {
            loadAd();
          }, 5000); // Retry after 5 seconds
        }
      });

      ad.addAdEventListener(AdEventType.CLOSED, () => {
        setIsReady(false);
        // Load next ad after current one is closed
        setTimeout(() => {
          loadAd();
        }, 1000);
      });

      ad.load();
      setInterstitialAd(ad);
    } catch (error) {
      logger.warn("Failed to create interstitial ad:", error);
      setIsReady(false);
    }
  }, [finalAdUnitId]);

  const showAd = useCallback(async (): Promise<void> => {
    if (!isReady || !interstitialAd) {
      return;
    }

    try {
      // Get current view count
      const currentCountStr = await AsyncStorage.getItem(
        STORAGE_KEYS.AD_VIEW_COUNT
      );
      const currentCount = currentCountStr ? parseInt(currentCountStr, 10) : 0;

      // Increment view count
      const newCount = currentCount + 1;
      await AsyncStorage.setItem(
        STORAGE_KEYS.AD_VIEW_COUNT,
        newCount.toString()
      );

      // Check if we should show ad based on frequency cap
      if (newCount % AD_CONFIG.interstitialFrequencyCap === 0) {
        interstitialAd.show();
      }
    } catch (error) {
      logger.warn("Failed to show interstitial ad:", error);
    }
  }, [isReady, interstitialAd]);

  // Load ad on mount
  useEffect(() => {
    loadAd();
  }, [loadAd]);

  return {
    isReady,
    showAd,
    loadAd,
  };
}
