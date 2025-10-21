import { getAdUnitId } from "@/constants/AdConfig";
import { useCallback, useEffect, useRef } from "react";

// Conditionally import AdMob components
let AdEventType: any = null;
let InterstitialAd: any = null;
try {
  const admobModule = require("react-native-google-mobile-ads");
  AdEventType = admobModule.AdEventType;
  InterstitialAd = admobModule.InterstitialAd;
} catch (error) {
  // AdMob not available - hook will be disabled
}

interface UseInterstitialAdOptions {
  /**
   * Number of views before showing an ad
   * Default: 5
   */
  viewsBeforeAd?: number;

  /**
   * Custom ad unit ID
   * If not provided, uses the configured ad unit ID
   */
  adUnitId?: string;

  /**
   * Whether to enable the hook
   * Default: true
   */
  enabled?: boolean;
}

interface UseInterstitialAdReturn {
  /**
   * Call this when a user views an attraction
   * Will automatically show ad after the specified number of views
   */
  trackView: () => void;

  /**
   * Manually show an interstitial ad
   */
  showAd: () => Promise<void>;

  /**
   * Current view count
   */
  viewCount: number;

  /**
   * Whether an ad is currently loaded and ready to show
   */
  isAdLoaded: boolean;
}

/**
 * Hook for managing interstitial ads with view tracking
 *
 * Automatically shows an interstitial ad after a specified number of views
 * and preloads the next ad after showing one.
 * 
 * If AdMob is not available (Expo Go), the hook will be disabled automatically.
 */
export function useInterstitialAd({
  viewsBeforeAd = 5,
  adUnitId,
  enabled = true,
}: UseInterstitialAdOptions = {}): UseInterstitialAdReturn {
  const viewCountRef = useRef(0);
  const interstitialAdRef = useRef<any>(null);
  const isAdLoadedRef = useRef(false);
  const isShowingAdRef = useRef(false);

  // Disable if AdMob is not available
  const isAdMobAvailable = InterstitialAd && AdEventType;
  const effectivelyEnabled = enabled && isAdMobAvailable;

  // Get the ad unit ID to use
  const finalAdUnitId = adUnitId || (isAdMobAvailable ? getAdUnitId("interstitial") : "");

  /**
   * Create and load a new interstitial ad
   */
  const loadAd = useCallback(() => {
    if (!effectivelyEnabled || isShowingAdRef.current || !InterstitialAd) {
      return;
    }

    try {
      // Create new interstitial ad
      const interstitial = InterstitialAd.createForAdRequest(finalAdUnitId, {
        requestNonPersonalizedAdsOnly: false,
      });

      // Set up event listeners
      const unsubscribeLoaded = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          console.log("Interstitial ad loaded");
          isAdLoadedRef.current = true;
        }
      );

      const unsubscribeClosed = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          console.log("Interstitial ad closed");
          isShowingAdRef.current = false;
          isAdLoadedRef.current = false;

          // Load next ad after current one is closed
          setTimeout(() => {
            loadAd();
          }, 1000);
        }
      );

      const unsubscribeError = interstitial.addAdEventListener(
        AdEventType.ERROR,
        (error) => {
          console.warn("Interstitial ad error:", error);
          isAdLoadedRef.current = false;
          isShowingAdRef.current = false;

          // Retry loading after a delay
          setTimeout(() => {
            loadAd();
          }, 5000);
        }
      );

      // Store the ad and cleanup function
      interstitialAdRef.current = interstitial;

      // Load the ad
      interstitial.load();

      // Return cleanup function
      return () => {
        unsubscribeLoaded();
        unsubscribeClosed();
        unsubscribeError();
      };
    } catch (error) {
      console.error("Failed to create interstitial ad:", error);
    }
  }, [finalAdUnitId, effectivelyEnabled]);

  /**
   * Show the currently loaded interstitial ad
   */
  const showAd = useCallback(async (): Promise<void> => {
    if (
      !effectivelyEnabled ||
      !interstitialAdRef.current ||
      !isAdLoadedRef.current ||
      isShowingAdRef.current
    ) {
      if (!isAdMobAvailable) {
        console.log("Cannot show ad: AdMob not available");
      } else {
        console.log("Cannot show ad: not loaded or already showing");
      }
      return;
    }

    try {
      isShowingAdRef.current = true;
      await interstitialAdRef.current.show();
    } catch (error) {
      console.error("Failed to show interstitial ad:", error);
      isShowingAdRef.current = false;
    }
  }, [effectivelyEnabled, isAdMobAvailable]);

  /**
   * Track a view and show ad if threshold is reached
   */
  const trackView = useCallback(() => {
    if (!effectivelyEnabled) {
      return;
    }

    viewCountRef.current += 1;
    console.log(`View count: ${viewCountRef.current}/${viewsBeforeAd}`);

    // Check if we should show an ad
    if (viewCountRef.current >= viewsBeforeAd && isAdLoadedRef.current) {
      console.log(
        "Showing interstitial ad after",
        viewCountRef.current,
        "views"
      );
      showAd().then(() => {
        // Reset counter after showing ad
        viewCountRef.current = 0;
      });
    }
  }, [effectivelyEnabled, viewsBeforeAd, showAd]);

  // Load initial ad on mount
  useEffect(() => {
    if (effectivelyEnabled) {
      const cleanup = loadAd();
      return cleanup;
    }
  }, [effectivelyEnabled, loadAd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (interstitialAdRef.current) {
        // Note: InterstitialAd doesn't have a destroy method
        // The ad will be garbage collected when the ref is cleared
        interstitialAdRef.current = null;
      }
    };
  }, []);

  return {
    trackView,
    showAd,
    viewCount: viewCountRef.current,
    isAdLoaded: isAdLoadedRef.current,
  };
}
