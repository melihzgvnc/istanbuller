import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';
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
  titleKey: string;
  messageKey: string;
  showSecondaryButton: boolean;
}

const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  'no-district': {
    icon: 'help-circle-outline',
    iconColor: Theme.colors.warning[500],
    titleKey: 'district.noDistrictTitle',
    messageKey: 'district.noDistrictMessage',
    showSecondaryButton: true,
  },
  'gps-timeout': {
    icon: 'time-outline',
    iconColor: Theme.colors.warning[500],
    titleKey: 'district.gpsTimeoutTitle',
    messageKey: 'district.gpsTimeoutMessage',
    showSecondaryButton: true,
  },
  'services-disabled': {
    icon: 'location-outline',
    iconColor: Theme.colors.error[500],
    titleKey: 'district.servicesDisabledTitle',
    messageKey: 'district.servicesDisabledMessage',
    showSecondaryButton: true,
  },
  'permission-denied': {
    icon: 'lock-closed-outline',
    iconColor: Theme.colors.error[500],
    titleKey: 'district.permissionNeededTitle',
    messageKey: 'district.permissionNeededMessage',
    showSecondaryButton: true,
  },
};

export default function DistrictSelectionPrompt({
  onSelectDistrict,
  onRetryLocation,
  errorType = 'no-district',
}: DistrictSelectionPromptProps) {
  const { t } = useLanguage();
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
        {t(config.titleKey)}
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.duration(400).delay(300)}
        style={styles.message}
      >
        {t(config.messageKey)}
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
          accessibilityLabel={t('district.chooseManually')}
        >
          <Ionicons
            name="map-outline"
            size={20}
            color={Theme.colors.text.inverse}
          />
          <Text style={styles.primaryButtonText}>
            {t('district.chooseManually')}
          </Text>
        </TouchableOpacity>

        {config.showSecondaryButton && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleRetryLocation}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t('location.retryLocation')}
          >
            <Text style={styles.secondaryButtonText}>
              {t('location.retryLocation')}
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
