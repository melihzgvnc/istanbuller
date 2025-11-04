import { IconSymbol } from "@/components/ui/icon-symbol";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { DistrictInfo } from "@/constants/DistrictMetadata";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useResponsive } from "@/hooks/useResponsive";
import { getAttractionsByDistrict } from "@/services/attractionService";
import { IstanbulDistrict } from "@/types";
import { mediumHaptic } from "@/utils/haptics";
import { getTranslatedDistrictField } from "@/utils/translations";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface DistrictCardProps {
  district: IstanbulDistrict;
  info: DistrictInfo;
  onPress: (district: IstanbulDistrict) => void;
}

function DistrictCard({
  district,
  info,
  onPress,
}: DistrictCardProps) {
  const { t, language } = useLanguage();
  const { isTablet } = useResponsive();

  // Memoize expensive calculation
  const attractionCount = useMemo(() => {
    return getAttractionsByDistrict(district).length;
  }, [district]);

  const handlePress = () => {
    mediumHaptic();
    onPress(district);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isTablet && styles.cardTablet,
        pressed && styles.cardPressed,
      ]}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${info.displayName} district`}
      accessibilityHint={`View ${attractionCount} attractions in ${info.displayName}`}
    >
      <View style={styles.imageContainer}>
        {info.image ? (
          <OptimizedImage
            source={info.image}
            style={styles.image}
            contentFit="cover"
            aspectRatio={1}
            fallbackIcon="map-outline"
          />
        ) : (
          <View style={styles.iconFallback}>
            <IconSymbol
              name={info.icon as any}
              size={40}
              color={Theme.colors.primary[500]}
            />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>
          {getTranslatedDistrictField(
            district,
            "displayName",
            language,
            info.displayName
          )}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {getTranslatedDistrictField(
            district,
            "description",
            language,
            info.description
          )}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.attractionCount}>
            {attractionCount}{" "}
            {attractionCount === 1 ? t("district.place") : t("district.places")}
          </Text>
          <View style={styles.chevronContainer}>
            <IconSymbol
              name="chevron.right"
              size={16}
              color={Theme.colors.text.tertiary}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(DistrictCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.base,
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    ...Theme.shadows.base,
  },
  cardTablet: {
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: Theme.spacing["4xl"] + Theme.spacing.lg, // 68dp (normalized)
    aspectRatio: 1,
    borderRadius: Theme.borderRadius.md,
    overflow: "hidden",
    marginRight: Theme.spacing.base,
  },
  image: {
    width: "100%",
    // height removed - using aspectRatio for responsive scaling
  },
  iconFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: Theme.colors.primary[50],
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: Theme.accessibility.minTouchTarget,
  },
  name: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    lineHeight: 18,
    marginBottom: Theme.spacing.xs,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: Theme.accessibility.minTouchTarget,
  },
  attractionCount: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.tertiary,
  },
  chevronContainer: {
    minWidth: Theme.accessibility.minTouchTarget,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: "center",
    alignItems: "center",
  },
});
