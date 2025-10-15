import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { IstanbulDistrict } from '@/types';
import { getDistrictMetadata } from '@/constants/DistrictMetadata';
import { getDistrictConfig } from '@/constants/Districts';
import { useAttractions } from '@/hooks/useAttractions';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedDistrictField } from '@/utils/translations';
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
  const { t, language } = useLanguage();
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero Image Header */}
      <ImageBackground
        source={districtInfo.image || require('@/assets/images/districts/sultanahmet.jpg')}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.heroGradient}
        >
          {/* Back Button - positioned absolutely at top */}
          <Pressable
            style={styles.backButton}
            onPress={handleBack}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            accessibilityHint="Returns to district list"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          {/* Content at bottom */}
          <View style={styles.heroContent}>
            <Text style={styles.title}>{getTranslatedDistrictField(district, 'displayName', language, districtInfo.displayName)}</Text>
            <Text style={styles.subtitle}>{getTranslatedDistrictField(district, 'description', language, districtInfo.description)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      {districtInfo.keyLandmarks.length > 0 && (
        <View style={styles.landmarksContainer}>
          <Text style={styles.landmarksTitle}>{t('district.keyLandmarks')}</Text>
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
          {t('district.attractions')} ({attractions.length})
        </Text>
        <Text style={styles.attractionsSubtitle}>
          {t('district.distancesFromCenter')}
        </Text>
      </View>

      <AttractionList
        attractions={attractions}
        loading={loading}
        error={error}
        onRefresh={refresh}
        onAttractionPress={handleAttractionPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  heroImage: {
    width: '100%',
    height: 240,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Theme.spacing.base,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: Theme.spacing.base,
    width: Theme.accessibility.minTouchTarget,
    height: Theme.accessibility.minTouchTarget,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.sm,
  },
  title: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: Theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: '#FFFFFF',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
