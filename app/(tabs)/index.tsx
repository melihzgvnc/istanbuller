import BannerAd from "@/components/ads/BannerAd";
import AttractionList from "@/components/attractions/AttractionList";
import { DistrictPicker } from "@/components/district/DistrictPicker";
import DistrictSelectionPrompt from "@/components/district/DistrictSelectionPrompt";
import { ManualSelectionIndicator } from "@/components/district/ManualSelectionIndicator";
import LocationPermission from "@/components/location/LocationPermission";
import { BANNER_AD_UNIT_ID_HOME } from "@/constants/AdConfig";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useManualSelection } from "@/context/ManualSelectionContext";
import { useAttractions } from "@/hooks/useAttractions";
import { useLocation } from "@/hooks/useLocation";
import { IstanbulDistrict } from "@/types";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logger } from "@/utils/logger";
import { createSafeAreaStyle } from "@/utils/styleUtils";
import { useResponsive } from "@/hooks/useResponsive";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { onClearTriggered } = useManualSelection();
  const insets = useSafeAreaInsets();
  const { isLandscape, isTablet } = useResponsive();

  // District picker visibility state
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Track if we've already shown the notification for this district entry
  const notificationShownRef = useRef<IstanbulDistrict | null>(null);

  // Use location hook for location and district detection
  const {
    location,
    district,
    loading: locationLoading,
    error: locationError,
    permissionGranted,
    refreshLocation,
    manuallySelectedDistrict,
    isManualSelection,
    lastAutoDetectedDistrict,
    setManualDistrict,
    clearManualSelection,
  } = useLocation();

  // Use attractions hook for filtered attractions
  // Manual selection only affects which district's attractions are shown
  // Distance calculations always use actual user location for accurate ETAs
  const {
    attractions,
    loading: attractionsLoading,
    error: attractionsError,
    refresh: refreshAttractions,
  } = useAttractions({
    district,
    userLocation: location,
    referencePoint: undefined, // Always use user location for distance calculations
    isManualSelection,
  });

  // Handle permission granted
  const handlePermissionGranted = () => {
    // Permission is handled by the hook, just refresh location
    refreshLocation();
  };

  // Handle permission denied
  const handlePermissionDenied = () => {
    // User denied permission, show appropriate message
    logger.log("Location permission denied");
  };

  // Handle refresh - only refresh location if not in manual mode
  const handleRefresh = () => {
    if (!isManualSelection) {
      refreshLocation();
    }
    refreshAttractions();
  };

  // Handle attraction press - navigate to detail screen
  const handleAttractionPress = (id: string) => {
    router.push(`/attraction/${id}`);
  };

  // Handle district selection from picker
  const handleDistrictSelect = async (selectedDistrict: IstanbulDistrict) => {
    justSelectedRef.current = true;
    await setManualDistrict(selectedDistrict);
    setIsPickerVisible(false);
    // Refresh attractions for the new district
    refreshAttractions();
  };

  // Handle picker dismiss
  const handlePickerDismiss = () => {
    setIsPickerVisible(false);
  };

  // Handle "Choose Manually" action from prompt
  const handleChooseManually = () => {
    setIsPickerVisible(true);
  };

  // Handle "Retry Location" action from prompt
  const handleRetryLocation = () => {
    refreshLocation();
  };

  // Handle manual selection indicator press - open picker to change district
  const handleManualIndicatorPress = () => {
    setIsPickerVisible(true);
  };

  // Track if we just selected a district to avoid clearing it immediately
  const justSelectedRef = useRef(false);

  // Handle tab focus - only close picker when leaving
  useFocusEffect(
    useCallback(() => {
      // If we just selected a district, don't do anything
      if (justSelectedRef.current) {
        justSelectedRef.current = false;
        return;
      }

      return () => {
        // Cleanup: close picker when leaving the screen
        setIsPickerVisible(false);
      };
    }, [])
  );

  // Register callback to clear manual selection when triggered from tab layout
  useEffect(() => {
    const unregister = onClearTriggered(() => {
      if (isManualSelection) {
        clearManualSelection();
      }
    });

    return unregister;
  }, [isManualSelection, clearManualSelection, onClearTriggered]);

  // Handle switch to auto-detection
  const handleSwitchToAuto = async () => {
    await clearManualSelection();
    notificationShownRef.current = null;
  };

  // Handle keep manual selection
  const handleKeepManual = () => {
    // User chose to keep manual selection, don't show notification again for this district
    if (lastAutoDetectedDistrict) {
      notificationShownRef.current = lastAutoDetectedDistrict;
    }
  };

  // Detect when user enters a district boundary with manual selection active
  useEffect(() => {
    // Check if:
    // 1. Manual selection is active
    // 2. Auto-detection found a valid district
    // 3. Auto-detected district differs from manual selection
    // 4. We haven't shown notification for this district yet
    if (
      isManualSelection &&
      lastAutoDetectedDistrict &&
      lastAutoDetectedDistrict !== manuallySelectedDistrict &&
      notificationShownRef.current !== lastAutoDetectedDistrict
    ) {
      // Show alert with options
      Alert.alert(
        t("district.detected"),
        t("district.detectedMessage").replace(
          "{district}",
          lastAutoDetectedDistrict
        ),
        [
          {
            text: t("district.keepManual"),
            style: "cancel",
            onPress: handleKeepManual,
          },
          {
            text: t("district.switchToAuto"),
            onPress: handleSwitchToAuto,
          },
        ],
        { cancelable: true, onDismiss: handleKeepManual }
      );

      // Mark that we've shown the notification for this district
      notificationShownRef.current = lastAutoDetectedDistrict;
    }
  }, [isManualSelection, lastAutoDetectedDistrict, manuallySelectedDistrict]);

  // Show location permission screen if permission not granted
  if (!permissionGranted) {
    return (
      <View style={[styles.container, createSafeAreaStyle(insets)]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Theme.colors.background}
        />
        <LocationPermission
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
        />
      </View>
    );
  }

  // Show error message if location error exists
  const displayError = locationError || attractionsError;
  const isLoading = locationLoading || attractionsLoading;

  // Determine if we should show the district selection prompt
  // Show when: location is available, no district detected, and no manual selection active
  const shouldShowPrompt =
    location && !district && !isManualSelection && !locationLoading;

  return (
    <View style={[styles.container, createSafeAreaStyle(insets, { bottom: false })]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Theme.colors.background}
      />

      {/* Header */}
      <View style={[
        styles.header,
        isLandscape && styles.headerLandscape,
        isTablet && styles.headerTablet
      ]}>
        <Text style={[
          styles.title,
          isLandscape && styles.titleLandscape
        ]}>{t("home.nearbyAttractions")}</Text>
        {district && !isManualSelection && (
          <Text style={styles.subtitle}>{district}</Text>
        )}
        {isManualSelection && manuallySelectedDistrict && (
          <ManualSelectionIndicator
            district={manuallySelectedDistrict}
            onPress={handleManualIndicatorPress}
          />
        )}
      </View>

      {/* Show District Selection Prompt when no district detected */}
      {shouldShowPrompt ? (
        <DistrictSelectionPrompt
          onSelectDistrict={handleChooseManually}
          onRetryLocation={handleRetryLocation}
        />
      ) : (
        /* Attraction List */
        <AttractionList
          attractions={attractions}
          loading={isLoading}
          error={displayError}
          onRefresh={handleRefresh}
          onAttractionPress={handleAttractionPress}
        />
      )}

      {/* District Picker Modal */}
      <DistrictPicker
        visible={isPickerVisible}
        onSelect={handleDistrictSelect}
        onDismiss={handlePickerDismiss}
        currentDistrict={district}
      />

      {/* Banner Ad */}
      <BannerAd adUnitId={BANNER_AD_UNIT_ID_HOME} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.base,
    paddingVertical: Theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border.default,
    backgroundColor: Theme.colors.background,
  },
  headerLandscape: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  headerTablet: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.lg,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize["3xl"],
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  titleLandscape: {
    fontSize: Theme.typography.fontSize["2xl"],
    marginBottom: Theme.spacing.xs / 2,
  },
  subtitle: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
  },
});
