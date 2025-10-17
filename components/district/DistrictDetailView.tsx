import AttractionList from "@/components/attractions/AttractionList";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { getDistrictMetadata } from "@/constants/DistrictMetadata";
import { getDistrictConfig } from "@/constants/Districts";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useAttractions } from "@/hooks/useAttractions";
import { IstanbulDistrict } from "@/types";
import { mediumHaptic } from "@/utils/haptics";
import { getTranslatedDistrictField } from "@/utils/translations";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
        source={
          districtInfo.image ||
          require("@/assets/images/districts/sultanahmet.jpg")
        }
        style={styles.heroImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}
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
            <Text style={styles.title}>
              {getTranslatedDistrictField(
                district,
                "displayName",
                language,
                districtInfo.displayName
              )}
            </Text>
            <Text style={styles.subtitle}>
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
                        {landmark}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Landmarks moved into hero overlay */}

      <View style={styles.attractionsHeader}>
        <Text style={styles.attractionsTitle}>
          {t("district.attractions")} ({attractions.length})
        </Text>
        <Text style={styles.attractionsSubtitle}>
          {t("district.distancesFromCenter")}
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
    height: 260,
  },
  heroGradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: Theme.spacing.base,
    paddingTop: Theme.spacing.lg,
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: Theme.spacing.base,
    width: Theme.accessibility.minTouchTarget,
    height: Theme.accessibility.minTouchTarget,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.sm,
  },
  title: {
    fontSize: Theme.typography.fontSize["3xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: "#FFFFFF",
    marginBottom: Theme.spacing.xs,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.base,
    color: "#FFFFFF",
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
