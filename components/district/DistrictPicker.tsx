import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import { IstanbulDistrict } from '@/types';
import { getAllDistricts, DistrictInfo } from '@/constants/DistrictMetadata';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedDistrictField } from '@/utils/translations';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Accessibility } from '@/constants/theme';
import { selectionHaptic, lightHaptic } from '@/utils/haptics';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface DistrictPickerProps {
  visible: boolean;
  onSelect: (district: IstanbulDistrict) => void;
  onDismiss: () => void;
  currentDistrict?: IstanbulDistrict | null;
}

export const DistrictPicker: React.FC<DistrictPickerProps> = ({
  visible,
  onSelect,
  onDismiss,
  currentDistrict,
}) => {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<IstanbulDistrict | null>(
    currentDistrict || null
  );

  const districts = getAllDistricts();

  const handleDistrictPress = (district: IstanbulDistrict) => {
    selectionHaptic();
    setSelectedDistrict(district);

    // Provide visual feedback before closing
    setTimeout(() => {
      onSelect(district);
    }, 150);
  };

  const handleBackdropPress = () => {
    lightHaptic();
    onDismiss();
  };

  const handleClosePress = () => {
    lightHaptic();
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
      statusBarTranslucent
      accessible={true}
      accessibilityLabel="District picker modal"
      accessibilityViewIsModal={true}
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <Pressable
          style={styles.backdrop}
          onPress={handleBackdropPress}
          accessible={true}
          accessibilityLabel="Close district picker"
          accessibilityRole="button"
          accessibilityHint="Tap to dismiss the district picker"
        >
          <View />
        </Pressable>

        {/* Modal Content */}
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{t('district.chooseDistrict')}</Text>
              <TouchableOpacity
                onPress={handleClosePress}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessible={true}
                accessibilityLabel={t('common.close')}
                accessibilityRole="button"
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* District List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            accessible={true}
            accessibilityLabel="District list"
          >
            {districts.map((districtInfo) => (
              <DistrictItem
                key={districtInfo.name}
                districtInfo={districtInfo}
                isSelected={selectedDistrict === districtInfo.name}
                onPress={() => handleDistrictPress(districtInfo.name)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

interface DistrictItemProps {
  districtInfo: DistrictInfo;
  isSelected: boolean;
  onPress: () => void;
}

const DistrictItem: React.FC<DistrictItemProps> = ({
  districtInfo,
  isSelected,
  onPress,
}) => {
  const { language } = useLanguage();
  const displayName = getTranslatedDistrictField(districtInfo.name, 'displayName', language, districtInfo.displayName);
  const description = getTranslatedDistrictField(districtInfo.name, 'description', language, districtInfo.description);

  return (
    <TouchableOpacity
      style={[styles.districtItem, isSelected && styles.districtItemSelected]}
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`${displayName}, ${description}`}
      accessibilityRole="button"
      accessibilityHint={`Select ${displayName} district`}
      accessibilityState={{ selected: isSelected }}
    >
      <View style={styles.districtItemContent}>
        {/* District Image */}
        <View style={styles.imageContainer}>
          {districtInfo.image ? (
            <Image
              source={districtInfo.image}
              style={styles.districtImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.iconFallback}>
              <IconSymbol
                name={districtInfo.icon as any}
                size={32}
                color={Colors.primary[500]}
              />
            </View>
          )}
        </View>

        {/* District Info */}
        <View style={styles.districtInfo}>
          <View style={styles.districtHeader}>
            <Text style={styles.districtName}>{displayName}</Text>
            {/* Selection Indicator */}
            <View style={styles.selectionIndicator}>
              {isSelected ? (
                <View style={styles.selectedCircle}>
                  <View style={styles.selectedDot} />
                </View>
              ) : (
                <View style={styles.unselectedCircle} />
              )}
            </View>
          </View>

          <Text style={styles.districtDescription}>{description}</Text>

          {/* Key Landmarks */}
          <View style={styles.landmarksContainer}>
            {districtInfo.keyLandmarks.slice(0, 2).map((landmark, index) => (
              <Text key={index} style={styles.landmark}>
                • {landmark}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    height: '80%',
    ...Platform.select({
      ios: Shadows.lg,
      android: { elevation: 8 },
    }),
  },
  header: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.neutral[300],
    borderRadius: BorderRadius.full,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  closeButton: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.full,
  },
  closeButtonText: {
    fontSize: Typography.fontSize.xl,
    color: Colors.text.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
  },
  districtItem: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.default,
    marginBottom: Spacing.md,
    minHeight: Accessibility.minTouchTarget,
  },
  districtItemSelected: {
    borderColor: Colors.primary[500],
    borderWidth: 2,
    backgroundColor: Colors.primary[50],
  },
  districtItemContent: {
    flexDirection: 'row',
    padding: Spacing.base,
    gap: Spacing.md,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  districtImage: {
    width: '100%',
    height: '100%',
  },
  iconFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  districtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  selectionIndicator: {
    marginLeft: Spacing.sm,
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.neutral[300],
    backgroundColor: Colors.background,
  },
  districtInfo: {
    flex: 1,
  },
  districtName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  districtDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  landmarksContainer: {
    marginTop: Spacing.xs,
  },
  landmark: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
});
