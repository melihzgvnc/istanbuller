import DistanceBadge from "@/components/attractions/DistanceBadge";
import ErrorBoundary from "@/components/ErrorBoundary";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { HERO_IMAGE_CONFIG } from "@/constants/ImageConfig";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/hooks/useLocation";
import { getAttractionById } from "@/services/attractionService";
import { enrichWithDistance } from "@/services/distanceService";
import { AttractionWithDistance } from "@/types";
import { mediumHaptic } from "@/utils/haptics";
import { openGoogleMapsDirections } from "@/utils/navigation";
import { showErrorToast } from "@/utils/toast";
import { getTranslatedAttractionField } from "@/utils/translations";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AttractionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { location } = useLocation();
  const { t, language } = useLanguage();

  const [attraction, setAttraction] = useState<AttractionWithDistance | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAttraction = () => {
      try {
        setLoading(true);
        setError(null);

        // Validate attraction ID
        if (!id || typeof id !== "string") {
          const errorMsg = "Invalid attraction ID";
          setError(errorMsg);
          showErrorToast(errorMsg);
          setLoading(false);
          return;
        }

        // Load attraction by ID
        const attractionData = getAttractionById(id);

        if (!attractionData) {
          const errorMsg = "Attraction not found";
          setError(errorMsg);
          showErrorToast(errorMsg);
          setLoading(false);
          return;
        }

        // Validate attraction data
        if (!attractionData.name || !attractionData.description) {
          const errorMsg = "Invalid attraction data";
          setError(errorMsg);
          showErrorToast(errorMsg);
          setLoading(false);
          return;
        }

        // Always use user's actual location for distance calculations
        const calculationPoint = location;

        // Enrich with distance if calculation point is available
        if (calculationPoint) {
          try {
            const enrichedAttractions = enrichWithDistance(
              [attractionData],
              calculationPoint
            );
            if (enrichedAttractions && enrichedAttractions.length > 0) {
              setAttraction(enrichedAttractions[0]);
            } else {
              // Fallback to attraction without distance
              setAttraction({
                ...attractionData,
                distance: {
                  walkingDistanceKm: 0,
                  walkingTimeMinutes: 0,
                  publicTransportTimeMinutes: 0,
                },
              });
            }
          } catch (distanceError) {
            console.warn("Failed to calculate distance:", distanceError);
            // Set attraction without distance info
            setAttraction({
              ...attractionData,
              distance: {
                walkingDistanceKm: 0,
                walkingTimeMinutes: 0,
                publicTransportTimeMinutes: 0,
              },
            });
          }
        } else {
          // Set attraction without distance info
          setAttraction({
            ...attractionData,
            distance: {
              walkingDistanceKm: 0,
              walkingTimeMinutes: 0,
              publicTransportTimeMinutes: 0,
            },
          });
        }

        setLoading(false);
      } catch (err) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Failed to load attraction details";
        setError(errorMsg);
        showErrorToast(errorMsg);
        setLoading(false);
      }
    };

    loadAttraction();
  }, [id, location]);

  const backButtonScale = useSharedValue(1);

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backButtonScale.value }],
  }));

  // Handle back navigation
  const handleBack = () => {
    mediumHaptic();
    router.back();
  };

  const handleBackPressIn = () => {
    backButtonScale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handleBackPressOut = () => {
    backButtonScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  // Handle navigation to attraction
  const handleNavigate = () => {
    mediumHaptic();
    if (attraction) {
      openGoogleMapsDirections(
        attraction.coordinates,
        attraction.name,
        location || undefined
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={["top", "bottom"]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Theme.colors.background}
        />
        <ActivityIndicator size="large" color={Theme.colors.primary[500]} />
      </SafeAreaView>
    );
  }

  // Error state
  if (error || !attraction) {
    return (
      <SafeAreaView style={styles.centerContainer} edges={["top", "bottom"]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Theme.colors.background}
        />
        <Animated.View
          entering={FadeIn.duration(300)}
          style={{ alignItems: "center" }}
        >
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={Theme.colors.error[500]}
          />
          <Text style={styles.errorText}>
            {error || t("attraction.notFound")}
          </Text>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>{t("common.goBack")}</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Image */}
          <View style={styles.imageContainer}>
            <OptimizedImage
              source={{ uri: attraction.imageUrl }}
              style={styles.heroImage}
              fallbackIcon="image-outline"
              fallbackIconSize={80}
              fallbackText="Image unavailable"
              showLoadingIndicator={true}
              {...HERO_IMAGE_CONFIG}
            />

            {/* Back Button Overlay */}
            <AnimatedPressable
              style={[styles.backButtonOverlay, backButtonAnimatedStyle]}
              onPress={handleBack}
              onPressIn={handleBackPressIn}
              onPressOut={handleBackPressOut}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              accessibilityHint="Double tap to return to the previous screen"
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </AnimatedPressable>
          </View>

          {/* Content */}
          <Animated.View
            entering={FadeInDown.duration(400).delay(100)}
            style={styles.content}
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.name}>
                {getTranslatedAttractionField(
                  attraction.id,
                  "name",
                  language,
                  attraction.name
                )}
              </Text>
              <View style={styles.metaRow}>
                <View style={styles.categoryBadge}>
                  <Ionicons
                    name="pricetag"
                    size={16}
                    color={Theme.colors.primary[500]}
                  />
                  <Text style={styles.categoryText}>{attraction.category}</Text>
                </View>
                <View style={styles.districtBadge}>
                  <Ionicons
                    name="location"
                    size={16}
                    color={Theme.colors.success[500]}
                  />
                  <Text style={styles.districtText}>{attraction.district}</Text>
                </View>
              </View>
            </View>

            {/* Distance Information */}
            {location && attraction.distance.walkingDistanceKm > 0 && (
              <View style={styles.distanceSection}>
                <Text style={styles.sectionTitleSecondary}>
                  {t("attraction.distanceFromYou")}
                </Text>
                <DistanceBadge distance={attraction.distance} />
              </View>
            )}

            {/* Description Section */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>{t("attraction.about")}</Text>
              <Text style={styles.description}>
                {getTranslatedAttractionField(
                  attraction.id,
                  "description",
                  language,
                  attraction.description
                )}
              </Text>
            </View>

            {/* Address Section */}
            <View style={styles.addressSection}>
              <Text style={styles.sectionTitleSecondary}>
                {t("attraction.address")}
              </Text>
              <View style={styles.addressRow}>
                <Ionicons
                  name="navigate"
                  size={20}
                  color={Theme.colors.text.secondary}
                />
                <Text style={styles.address}>{attraction.address}</Text>
              </View>
            </View>

            {/* Navigation Button */}
            <Pressable
              style={styles.navigationButton}
              onPress={handleNavigate}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t("attraction.takeMeThere")}
            >
              <Ionicons name="navigate-circle" size={22} color="#FFFFFF" />
              <Text style={styles.navigationButtonText}>
                {t("attraction.takeMeThere")}
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
    borderBottomLeftRadius: Theme.borderRadius.lg,
    borderBottomRightRadius: Theme.borderRadius.lg,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  backButtonOverlay: {
    position: "absolute",
    top: 48,
    left: Theme.spacing.base,
    width: Theme.accessibility.minTouchTarget,
    height: Theme.accessibility.minTouchTarget,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: Theme.spacing.lg,
    gap: Theme.spacing.xl,
  },
  headerSection: {
    gap: Theme.spacing.md,
  },
  name: {
    fontSize: Theme.typography.fontSize["3xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    lineHeight: 34,
  },
  metaRow: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    flexWrap: "wrap",
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs + 2,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs + 2,
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.lg,
    minHeight: Theme.accessibility.minTouchTarget / 1.5,
  },
  categoryText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.primary[500],
  },
  districtBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xs + 2,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs + 2,
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: Theme.borderRadius.lg,
    minHeight: Theme.accessibility.minTouchTarget / 1.5,
  },
  districtText: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.success[500],
  },
  distanceSection: {
    gap: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize["2xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  sectionTitleSecondary: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  descriptionSection: {
    gap: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border.default,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primary[400],
    paddingLeft: Theme.spacing.xl,
  },
  description: {
    fontSize: Theme.typography.fontSize.xl,
    color: Theme.colors.text.secondary,
    lineHeight: 30,
  },
  addressSection: {
    gap: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.base,
    borderWidth: 1,
    borderColor: Theme.colors.border.default,
  },
  addressRow: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    alignItems: "flex-start",
  },
  address: {
    flex: 1,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    lineHeight: 22,
  },
  navigationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Theme.spacing.sm,
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    minHeight: Theme.accessibility.minTouchTarget - 6,
    marginBottom: Theme.spacing.lg,
  },
  navigationButtonText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.inverse,
  },
  errorText: {
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.text.secondary,
    textAlign: "center",
    marginTop: Theme.spacing.base,
    marginBottom: Theme.spacing.xl,
  },
  backButton: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.primary[500],
    borderRadius: Theme.borderRadius.base,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.inverse,
  },
});
