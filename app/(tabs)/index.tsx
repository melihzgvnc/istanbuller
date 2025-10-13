import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLocation } from '@/hooks/useLocation';
import { useAttractions } from '@/hooks/useAttractions';
import LocationPermission from '@/components/location/LocationPermission';
import AttractionList from '@/components/attractions/AttractionList';
import { DistrictPicker } from '@/components/district/DistrictPicker';
import DistrictSelectionPrompt from '@/components/district/DistrictSelectionPrompt';
import { ManualSelectionIndicator } from '@/components/district/ManualSelectionIndicator';
import Theme from '@/constants/theme';
import { IstanbulDistrict } from '@/types';
import { getDistrictConfig } from '@/constants/Districts';

export default function HomeScreen() {
  const router = useRouter();
  
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

  // Calculate reference point for distance calculations
  // When manual selection is active, use district center; otherwise use user location
  const referencePoint = React.useMemo(() => {
    if (isManualSelection && district) {
      const districtConfig = getDistrictConfig(district);
      return districtConfig?.center || null;
    }
    return null; // Use user location (default behavior)
  }, [isManualSelection, district]);

  // Use attractions hook for filtered attractions
  const {
    attractions,
    loading: attractionsLoading,
    error: attractionsError,
    refresh: refreshAttractions,
  } = useAttractions({
    district,
    userLocation: location,
    referencePoint: referencePoint || undefined,
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
    console.log('Location permission denied');
  };

  // Handle refresh - refresh both location and attractions
  const handleRefresh = () => {
    refreshLocation();
    refreshAttractions();
  };

  // Handle attraction press - navigate to detail screen
  const handleAttractionPress = (id: string) => {
    router.push(`/attraction/${id}`);
  };

  // Handle district selection from picker
  const handleDistrictSelect = async (selectedDistrict: IstanbulDistrict) => {
    await setManualDistrict(selectedDistrict);
    setIsPickerVisible(false);
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

  // Handle clear manual selection
  const handleClearSelection = async () => {
    await clearManualSelection();
    // Reset notification tracking when clearing manual selection
    notificationShownRef.current = null;
  };

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
        'District Detected',
        `You're now in ${lastAutoDetectedDistrict}. Would you like to switch to automatic detection?`,
        [
          {
            text: 'Keep Manual',
            style: 'cancel',
            onPress: handleKeepManual,
          },
          {
            text: 'Switch to Auto',
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
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />
        <LocationPermission
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
        />
      </SafeAreaView>
    );
  }

  // Show error message if location error exists
  const displayError = locationError || attractionsError;
  const isLoading = locationLoading || attractionsLoading;

  // Determine if we should show the district selection prompt
  // Show when: location is available, no district detected, and no manual selection active
  const shouldShowPrompt = location && !district && !isManualSelection && !locationLoading;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Attractions</Text>
        {district && !isManualSelection && (
          <Text style={styles.subtitle}>
            {district}
          </Text>
        )}
        {isManualSelection && manuallySelectedDistrict && (
          <ManualSelectionIndicator
            district={manuallySelectedDistrict}
            onClearSelection={handleClearSelection}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
  },
  header: {
    paddingHorizontal: Theme.spacing.base,
    paddingVertical: Theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border.default,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
});
