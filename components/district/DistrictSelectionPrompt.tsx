import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/theme';
import { mediumHaptic } from '@/utils/haptics';

export type ErrorType = 'no-district' | 'gps-timeout' | 'services-disabled' | 'permission-denied';

interface DistrictSelectionPromptProps {
  onSelectDistrict: () => void;
  onRetryLocation: () => void;
  errorType?: ErrorType;
}

interface ErrorConfig {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  showSecondaryButton: boolean;
}

const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  'no-district': {
    icon: 'help-circle-outline',
    iconColor: Theme.colors.warning[500],
    title: "We couldn't detect your district",
    message: "You might be outside our covered areas. You can still explore Istanbul by choosing a district manually.",
    primaryButtonText: 'Choose District Manually',
    secondaryButtonText: 'Retry Location',
    showSecondaryButton: true,
  },
  'gps-timeout': {
    icon: 'time-outline',
    iconColor: Theme.colors.warning[500],
    title: 'GPS is taking too long',
    message: "We're still trying to find your location. You can choose a district manually while we keep trying.",
    primaryButtonText: 'Choose District Manually',
    secondaryButtonText: 'Keep Waiting',
    showSecondaryButton: true,
  },
  'services-disabled': {
    icon: 'location-outline',
    iconColor: Theme.colors.error[500],
    title: 'Location services are disabled',
    message: "Location services are turned off. You can still explore by choosing a district manually.",
    primaryButtonText: 'Choose District Manually',
    secondaryButtonText: 'Open Settings',
    showSecondaryButton: true,
  },
  'permission-denied': {
    icon: 'lock-closed-outline',
    iconColor: Theme.colors.error[500],
    title: 'Location permission needed',
    message: "Location permission is needed for automatic detection. You can browse districts manually in the meantime.",
    primaryButtonText: 'Choose District Manually',
    secondaryButtonText: 'Grant Permission',
    showSecondaryButton: true,
  },
};

export default function DistrictSelectionPrompt({
  onSelectDistrict,
  onRetryLocation,
  errorType = 'no-district',
}: DistrictSelectionPromptProps) {
  const config = ERROR_CONFIGS[errorType];

  const handleSelectDistrict = () => {
    mediumHaptic();
    onSelectDistrict();
  };

  const handleRetryLocation = () => {
    mediumHaptic();
    onRetryLocation();
  };

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <Animated.View 
        entering={FadeInDown.duration(400).delay(100)} 
        style={styles.iconContainer}
      >
        <Ionicons 
          name={config.icon} 
          size={64} 
          color={config.iconColor} 
        />
      </Animated.View>
      
      <Animated.Text 
        entering={FadeInDown.duration(400).delay(200)} 
        style={styles.title}
      >
        {config.title}
      </Animated.Text>
      
      <Animated.Text 
        entering={FadeInDown.duration(400).delay(300)} 
        style={styles.message}
      >
        {config.message}
      </Animated.Text>

      <Animated.View 
        entering={FadeInDown.duration(400).delay(400)} 
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSelectDistrict}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={config.primaryButtonText}
          accessibilityHint="Opens district picker to manually select a district"
        >
          <Ionicons 
            name="map-outline" 
            size={20} 
            color={Theme.colors.text.inverse} 
          />
          <Text style={styles.primaryButtonText}>
            {config.primaryButtonText}
          </Text>
        </TouchableOpacity>

        {config.showSecondaryButton && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleRetryLocation}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={config.secondaryButtonText}
            accessibilityHint="Attempts to detect your location again"
          >
            <Text style={styles.secondaryButtonText}>
              {config.secondaryButtonText}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
  },
  iconContainer: {
    marginBottom: Theme.spacing.xl,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.full,
  },
  title: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.base,
    textAlign: 'center',
  },
  message: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.sm,
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.base,
    paddingHorizontal: Theme.spacing['2xl'],
    borderRadius: Theme.borderRadius.md,
    width: '100%',
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    ...Theme.shadows.md,
  },
  primaryButtonText: {
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    marginLeft: Theme.spacing.sm,
  },
  secondaryButton: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.base,
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Theme.colors.primary[500],
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
});
