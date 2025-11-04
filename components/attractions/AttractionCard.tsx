import OptimizedImage from "@/components/ui/OptimizedImage";
import { ATTRACTION_CARD_IMAGE_CONFIG } from "@/constants/ImageConfig";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useResponsive } from "@/hooks/useResponsive";
import { AttractionWithDistance } from "@/types";
import { mediumHaptic } from "@/utils/haptics";
import { getTranslatedAttractionField } from "@/utils/translations";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DistanceBadge from "./DistanceBadge";

interface AttractionCardProps {
  attraction: AttractionWithDistance;
  onPress: (id: string) => void;
}

function AttractionCard({
  attraction,
  onPress,
}: AttractionCardProps) {
  const { language } = useLanguage();
  const { isTablet } = useResponsive();

  const handlePress = () => {
    mediumHaptic();
    onPress(attraction.id);
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
      accessibilityLabel={`${attraction.name}, ${attraction.category}`}
      accessibilityHint="Double tap to view attraction details"
    >
      <OptimizedImage
        source={attraction.imageUrl}
        style={styles.image}
        fallbackIcon="image-outline"
        fallbackIconSize={48}
        fallbackText="Image unavailable"
        {...ATTRACTION_CARD_IMAGE_CONFIG}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {getTranslatedAttractionField(
              attraction.id,
              "name",
              language,
              attraction.name
            )}
          </Text>
          <Text style={styles.category}>{attraction.category}</Text>
        </View>

        <Text style={styles.summary} numberOfLines={2}>
          {getTranslatedAttractionField(
            attraction.id,
            "summary",
            language,
            attraction.summary
          )}
        </Text>

        <DistanceBadge distance={attraction.distance} />
      </View>
    </Pressable>
  );
}

export default React.memo(AttractionCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.sm,
    overflow: "hidden",
    minHeight: Theme.accessibility.minTouchTarget,
    ...Theme.shadows.base,
  },
  cardTablet: {
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  content: {
    padding: Theme.spacing.base,
    gap: Theme.spacing.md,
    minHeight: Theme.accessibility.minTouchTarget,
  },
  header: {
    gap: Theme.spacing.xs,
  },
  name: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize.xl,
    color: Theme.colors.text.primary,
    lineHeight: 26,
  },
  category: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
  },
  summary: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    lineHeight: 20,
  },
});
