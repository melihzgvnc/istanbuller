import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { IstanbulDistrict } from '@/types';
import { getDistrictMetadata } from '@/constants/DistrictMetadata';
import { useLanguage } from '@/context/LanguageContext';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Accessibility } from '@/constants/theme';
import { lightHaptic } from '@/utils/haptics';

interface ManualSelectionIndicatorProps {
  district: IstanbulDistrict;
  onClearSelection: () => void;
}

export const ManualSelectionIndicator: React.FC<ManualSelectionIndicatorProps> = ({
  district,
  onClearSelection,
}) => {
  const { t } = useLanguage();
  const districtInfo = getDistrictMetadata(district);

  const handleClearPress = () => {
    lightHaptic();
    onClearSelection();
  };

  if (!districtInfo) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleClearPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`Manually selected district: ${districtInfo.displayName}. Tap to clear selection.`}
      accessibilityRole="button"
      accessibilityHint="Clears manual district selection and returns to automatic detection"
    >
      <View style={styles.content}>
        {/* Manual Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📍</Text>
        </View>

        {/* District Name */}
        <Text style={styles.districtName} numberOfLines={1}>
          {districtInfo.displayName}
        </Text>

        {/* Manual Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{t('district.manual')}</Text>
        </View>

        {/* Close Icon */}
        <View style={styles.closeIcon}>
          <Text style={styles.closeIconText}>✕</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary[200],
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: Accessibility.minTouchTarget,
    justifyContent: 'center',
    ...Platform.select({
      ios: Shadows.sm,
      android: { elevation: 2 },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  districtName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary[700],
    maxWidth: 100,
  },
  badge: {
    backgroundColor: Colors.primary[100],
    borderRadius: BorderRadius.sm,
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary[700],
    textTransform: 'uppercase',
  },
  closeIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.xs,
  },
  closeIconText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[600],
    fontWeight: Typography.fontWeight.bold,
  },
});
