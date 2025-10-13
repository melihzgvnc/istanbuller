import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IstanbulDistrict } from '@/types';
import { getDistrictMetadata } from '@/constants/DistrictMetadata';
import { getDistrictConfig } from '@/constants/Districts';
import { useAttractions } from '@/hooks/useAttractions';
import AttractionList from '@/components/attractions/AttractionList';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Theme from '@/constants/theme';
import { mediumHaptic } from '@/utils/haptics';

interface DistrictDetailViewProps {
  district: IstanbulDistrict;
  onBack: () => void;
}

export default function DistrictDetailView({ district, onBack }: DistrictDetailViewProps) {
  const router = useRouter();
  const districtInfo = getDistrictMetadata(district);
  const districtConfig = getDistrictConfig(district);

  // Use district center as reference point for distance calculations
  const { attractions, loading, error, refresh } = useAttractions({
    district,
    userLocation: null,
    referencePoint: districtConfig?.center,
    isManualSelection: true,
  });

  const handleBack = () => {
    mediumHaptic();
    onBack();
  };

  const handleAttractionPress = (id: string) => {
    mediumHaptic();
    router.push(`/attraction/${id}`);
  };

  if (!districtInfo) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to district list"
        >
          <IconSymbol
            name="chevron.left"
            size={24}
            color={Theme.colors.primary[500]}
          />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{districtInfo.displayName}</Text>
          <Text style={styles.subtitle}>{districtInfo.description}</Text>
        </View>
      </View>

      {districtInfo.keyLandmarks.length > 0 && (
        <View style={styles.landmarksContainer}>
          <Text style={styles.landmarksTitle}>Key Landmarks</Text>
          <View style={styles.landmarksList}>
            {districtInfo.keyLandmarks.map((landmark, index) => (
              <View key={index} style={styles.landmarkItem}>
                <IconSymbol
                  name="mappin.circle.fill"
                  size={16}
                  color={Theme.colors.primary[500]}
                />
                <Text style={styles.landmarkText}>{landmark}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.attractionsHeader}>
        <Text style={styles.attractionsTitle}>
          Attractions ({attractions.length})
        </Text>
        <Text style={styles.attractionsSubtitle}>
          Distances from district center
        </Text>
      </View>

      <AttractionList
        attractions={attractions}
        loading={loading}
        error={error}
        onRefresh={refresh}
        onAttractionPress={handleAttractionPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.base,
    paddingBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.background,
  },
  backButton: {
    width: Theme.accessibility.minTouchTarget,
    height: Theme.accessibility.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
  },
  landmarksContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.base,
    backgroundColor: Theme.colors.surface,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.base,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.base,
  },
  landmarksTitle: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  landmarksList: {
    gap: Theme.spacing.xs,
  },
  landmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  landmarkText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.primary,
  },
  attractionsHeader: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.sm,
  },
  attractionsTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  attractionsSubtitle: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.tertiary,
  },
});
