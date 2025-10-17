import OptimizedImage from "@/components/ui/OptimizedImage";
import { ATTRACTION_CARD_IMAGE_CONFIG } from "@/constants/ImageConfig";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { AttractionWithDistance } from "@/types";
import { mediumHaptic } from "@/utils/haptics";
import { getTranslatedAttractionField } from "@/utils/translations";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import DistanceBadge from "./DistanceBadge";

interface AttractionCardProps {
  attraction: AttractionWithDistance;
  onPress: (id: string) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AttractionCard({
  attraction,
  onPress,
}: AttractionCardProps) {
  const { language } = useLanguage();
  const scale = useSharedValue(1);
  const scheme = (
    typeof window === "undefined" ? "light" : (window as any)
  ) as any;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    mediumHaptic();
    onPress(attraction.id);
  };

  return (
    <AnimatedPressable
      style={[styles.card, animatedStyle]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${attraction.name}, ${attraction.category}`}
      accessibilityHint="Double tap to view attraction details"
    >
      <OptimizedImage
        source={{ uri: attraction.imageUrl }}
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
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.sm,
    overflow: "hidden",
    ...Theme.shadows.base,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: Theme.spacing.base,
    gap: Theme.spacing.md,
  },
  header: {
    gap: Theme.spacing.xs,
  },
  name: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    lineHeight: 26,
  },
  category: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.text.secondary,
  },
  summary: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    lineHeight: 20,
  },
});
