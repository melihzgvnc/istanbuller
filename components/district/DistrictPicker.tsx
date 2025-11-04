import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { IstanbulDistrict } from '@/types';
import { getAllDistricts, DistrictInfo } from '@/constants/DistrictMetadata';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedDistrictField, getTranslatedLandmark } from '@/utils/translations';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Accessibility } from '@/constants/theme';
import { selectionHaptic, lightHaptic } from '@/utils/haptics';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useResponsive } from '@/hooks/useResponsive';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  const { isTablet, isLandscape } = useResponsive();
  const [selectedDistrict, setSelectedDistrict] = useState<IstanbulDistrict | null>(
    currentDistrict || null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shouldRenderList, setShouldRenderList] = useState(false);

  const districts = useMemo(() => getAllDistricts(), []);

  // Calculate number of columns for tablet layout
  const numColumns = isTablet && isLandscape ? 2 : 1;
  const columnWrapperStyle = numColumns > 1 ? styles.columnWrapper : undefined;

  // Animation values
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(1000);

  // Animate in when visible
  useEffect(() => {
    if (visible) {
      setIsModalVisible(true);
      setShouldRenderList(false);

      // Start animation immediately
      backdropOpacity.value = withSpring(1, {
        damping: 20,
        stiffness: 300,
      });
      modalTranslateY.value = withSpring(0, {
        damping: 25,
        stiffness: 400,
        mass: 0.5,
      });

      // Render list after a tiny delay to let animation start smoothly
      requestAnimationFrame(() => {
        setShouldRenderList(true);
      });
    } else {
      setShouldRenderList(false);

      // Quick fade out
      backdropOpacity.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
      });
      modalTranslateY.value = withSpring(1000, {
        damping: 20,
        stiffness: 300,
      });

      // Hide modal after animation completes
      setTimeout(() => {
        setIsModalVisible(false);
      }, 200);
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslateY.value }],
  }));

  const handleDistrictPress = useCallback((district: IstanbulDistrict) => {
    selectionHaptic();
    setSelectedDistrict(district);

    // Provide visual feedback before closing
    setTimeout(() => {
      onSelect(district);
    }, 150);
  }, [onSelect]);

  const handleBackdropPress = useCallback(() => {
    lightHaptic();
    onDismiss();
  }, [onDismiss]);

  const handleClosePress = useCallback(() => {
    lightHaptic();
    onDismiss();
  }, [onDismiss]);

  const renderDistrictItem = useCallback(({ item }: { item: DistrictInfo }) => (
    <DistrictItem
      districtInfo={item}
      isSelected={selectedDistrict === item.name}
      onPress={() => handleDistrictPress(item.name)}
    />
  ), [selectedDistrict, handleDistrictPress]);

  const keyExtractor = useCallback((item: DistrictInfo) => item.name, []);

  const getItemLayout = useCallback((_data: any, index: number) => {
    const itemHeight = 120;
    const adjustedIndex = numColumns > 1 ? Math.floor(index / numColumns) : index;
    return {
      length: itemHeight,
      offset: itemHeight * adjustedIndex,
      index,
    };
  }, [numColumns]);

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
      accessible={true}
      accessibilityLabel="District picker modal"
      accessibilityViewIsModal={true}
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <AnimatedPressable
          style={[styles.backdrop, backdropStyle]}
          onPress={handleBackdropPress}
          accessible={true}
          accessibilityLabel="Close district picker"
          accessibilityRole="button"
          accessibilityHint="Tap to dismiss the district picker"
        />

        {/* Modal Content */}
        <Animated.View style={[styles.modalContent, modalStyle]}>
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
          {shouldRenderList ? (
            <FlatList
              data={districts}
              renderItem={renderDistrictItem}
              keyExtractor={keyExtractor}
              numColumns={numColumns}
              key={numColumns}
              columnWrapperStyle={columnWrapperStyle}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
              removeClippedSubviews={Platform.OS === 'android'}
              maxToRenderPerBatch={isTablet ? 8 : 5}
              updateCellsBatchingPeriod={100}
              initialNumToRender={isTablet ? 8 : 5}
              windowSize={5}
              getItemLayout={getItemLayout}
              accessible={true}
              accessibilityLabel="District list"
            />
          ) : (
            <View style={styles.scrollContent} />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

interface DistrictItemProps {
  districtInfo: DistrictInfo;
  isSelected: boolean;
  onPress: () => void;
}

const DistrictItem: React.FC<DistrictItemProps> = React.memo(({
  districtInfo,
  isSelected,
  onPress,
}) => {
  const { language } = useLanguage();
  const displayName = useMemo(() =>
    getTranslatedDistrictField(districtInfo.name, 'displayName', language, districtInfo.displayName),
    [districtInfo.name, language, districtInfo.displayName]
  );
  const description = useMemo(() =>
    getTranslatedDistrictField(districtInfo.name, 'description', language, districtInfo.description),
    [districtInfo.name, language, districtInfo.description]
  );

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
                • {getTranslatedLandmark(landmark, language)}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

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
    maxHeight: '80%',
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
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize['2xl'],
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
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.secondary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  districtItem: {
    flex: 1,
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
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.lg,
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
