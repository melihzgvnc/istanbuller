import AttractionList from "@/components/attractions/AttractionList";
import { IconSymbol } from "@/components/ui/icon-symbol";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getDistrictMetadata } from "@/constants/DistrictMetadata";
import { getDistrictConfig } from "@/constants/Districts";
import { HERO_IMAGE_CONFIG } from "@/constants/ImageConfig";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useAttractions } from "@/hooks/useAttractions";
import { useLocation } from "@/hooks/useLocation";
import { useResponsive } from "@/hooks/useResponsive";
import { IstanbulDistrict } from "@/types";
import { mediumHaptic } from "@/utils/haptics";
import { getTranslatedDistrictField, getTranslatedLandmark } from "@/utils/translations";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logger } from "@/utils/logger";
import { createSafeAreaPadding } from "@/utils/styleUtils";

interface DistrictDetailViewProps {
  district: IstanbulDistrict;
  onBack: () => void;
}

export default function DistrictDetailView({
  district,
  onBack,
}: DistrictDetailViewProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const insets = useSafeAreaInsets();
  const { isTablet, isLandscape } = useResponsive();

  // Get user's location for distance calculations
  const { location } = useLocation();

  // Add error handling for district metadata
  let districtInfo;
  let districtConfig;
  try {
    districtInfo = getDistrictMetadata(district);
    districtConfig = getDistrictConfig(district);
  } catch (err) {
    logger.error(`Error loading district metadata for ${district}:`, err);
    return (
      <View style={styles.container}>
        <Text>Error loading district information</Text>
        <Pressable onPress={onBack}>
          <Text>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  // Use user's actual location for distance calculations
  const { attractions, loading, error, refresh } = useAttractions({
    district,
    userLocation: location,
    referencePoint: undefined,
    isManualSelection: true,
  });

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
      <View style={[
        styles.heroImage,
        isLandscape && styles.heroImageLandscape,
        isTablet && styles.heroImageTablet,
      ]}>
        <OptimizedImage
          source={
            districtInfo.image ||
            require("@/assets/images/districts/sultanahmet.jpg")
          }
          style={styles.heroImageBackground}
          fallbackIcon="map-outline"
          {...HERO_IMAGE_CONFIG}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}
          style={[
            styles.heroGradient,
            { paddingTop: insets.top + Theme.spacing.lg },
          ]}
        >
          {/* Content at bottom */}
          <View style={[
            styles.heroContent,
            isLandscape && styles.heroContentLandscape,
          ]}>
            <Text style={[
              styles.title,
              isTablet && styles.titleTablet,
            ]}>
              {getTranslatedDistrictField(
                district,
                "displayName",
                language,
                districtInfo.displayName
              )}
            </Text>
            <Text style={[
              styles.subtitle,
              isTablet && styles.subtitleTablet,
            ]}>
              {getTranslatedDistrictField(
                district,
                "description",
                language,
                districtInfo.description
              )}
            </Text>
            {districtInfo.keyLandmarks.length > 0 && (
              <View style={styles.landmarksOverlay}>
                <Text style={styles.landmarksOverlayTitle}>
                  {t("district.keyLandmarks")}
                </Text>
                <View style={styles.landmarksOverlayList}>
                  {districtInfo.keyLandmarks.map((landmark, index) => (
                    <View key={index} style={styles.landmarksOverlayItem}>
                      <IconSymbol
                        name="mappin.circle.fill"
                        size={14}
                        color="#FFFFFF"
                      />
                      <Text style={styles.landmarksOverlayText}>
                        {getTranslatedLandmark(landmark, language)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
      </View>

      {/* Landmarks moved into hero overlay */}

      <View style={styles.attractionsHeader}>
        <Text style={styles.attractionsTitle}>
          {t("district.attractions")} ({attractions.length})
        </Text>
        <Text style={styles.attractionsSubtitle}>
          {t("district.distancesFromYourLocation")}
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
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
    overflow: "hidden",
  },
  heroImageLandscape: {
    aspectRatio: 21 / 9,
  },
  heroImageTablet: {
    aspectRatio: 18 / 9,
  },
  heroImageBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Theme.spacing.base,
  },
  heroContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.sm,
  },
  heroContentLandscape: {
    paddingHorizontal: Theme.spacing["2xl"],
    maxWidth: "70%",
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize["3xl"],
    color: "#FFFFFF",
    marginBottom: Theme.spacing.xs,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleTablet: {
    fontSize: Theme.typography.fontSize["4xl"],
  },
  subtitle: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.base,
    color: "#FFFFFF",
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitleTablet: {
    fontSize: Theme.typography.fontSize.lg,
    lineHeight: 26,
  },
  landmarksOverlay: {
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.xs,
  },
  landmarksOverlayTitle: {
    fontSize: Theme.typography.fontSize.xs,
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: Theme.spacing.xs,
    opacity: 0.9,
  },
  landmarksOverlayList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.xs,
  },
  landmarksOverlayItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: Theme.borderRadius.full,
  },
  landmarksOverlayText: {
    fontSize: Theme.typography.fontSize.xs,
    color: "#FFFFFF",
  },
  landmarksContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.sm,
    backgroundColor: "transparent",
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.base,
    marginBottom: Theme.spacing.sm,
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
  },
  landmarksTitle: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  landmarksList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.xs,
  },
  landmarkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.full,
  },
  landmarkText: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.primary,
  },
  attractionsHeader: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xs,
    paddingTop: 0,
    marginHorizontal: Theme.spacing.lg,
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: Theme.spacing.xs,
    marginTop: Theme.spacing["2xl"],
  },
  attractionsTitle: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  attractionsSubtitle: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.tertiary,
  },
});
