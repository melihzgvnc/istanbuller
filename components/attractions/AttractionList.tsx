import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { AttractionWithDistance } from "@/types";
import { mediumHaptic } from "@/utils/haptics";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import AttractionCard from "./AttractionCard";

interface AttractionListProps {
  attractions: AttractionWithDistance[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onAttractionPress: (id: string) => void;
}

export default function AttractionList({
  attractions,
  loading,
  error,
  onRefresh,
  onAttractionPress,
}: AttractionListProps) {
  const { t } = useLanguage();
  const { isTablet } = useResponsive();
  const [refreshing, setRefreshing] = React.useState(false);

  // Calculate number of columns for tablet layout
  const numColumns = isTablet ? 2 : 1;
  const columnWrapperStyle = isTablet ? styles.columnWrapper : undefined;

  const handleRefresh = async () => {
    mediumHaptic();
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const handleRetry = () => {
    mediumHaptic();
    onRefresh();
  };

  // Loading state
  if (loading && !refreshing) {
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        style={styles.centerContainer}
      >
        <ActivityIndicator size="large" color={Theme.colors.primary[500]} />
        <Text style={styles.loadingText}>{t("attraction.loading")}</Text>
      </Animated.View>
    );
  }

  // Error state
  if (error) {
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        style={styles.centerContainer}
      >
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>{t("common.error")}</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={handleRetry}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t("common.retry")}
        >
          <Text style={styles.retryButtonText}>{t("common.retry")}</Text>
        </Pressable>
      </Animated.View>
    );
  }

  // Empty state
  if (attractions.length === 0) {
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        style={styles.centerContainer}
      >
        <Text style={styles.emptyIcon}>🗺️</Text>
        <Text style={styles.emptyTitle}>{t("attraction.noAttractions")}</Text>
        <Text style={styles.emptyMessage}>
          {t("attraction.noAttractionsMessage")}
        </Text>
        <Pressable
          style={styles.refreshButton}
          onPress={handleRefresh}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t("location.refreshLocation")}
        >
          <Text style={styles.refreshButtonText}>
            {t("location.refreshLocation")}
          </Text>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <FlatList
      data={attractions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AttractionCard attraction={item} onPress={onAttractionPress} />
      )}
      numColumns={numColumns}
      key={numColumns}
      columnWrapperStyle={columnWrapperStyle}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Theme.colors.primary[500]}
          colors={[Theme.colors.primary[500]]}
        />
      }
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={isTablet ? 8 : 5}
      updateCellsBatchingPeriod={50}
      initialNumToRender={isTablet ? 8 : 5}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: Theme.spacing.base,
    paddingBottom: Theme.spacing["2xl"],
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing["2xl"],
  },
  loadingText: {
    fontFamily: Theme.typography.fontFamily.medium,
    marginTop: Theme.spacing.base,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: Theme.spacing.base,
  },
  errorTitle: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize["2xl"],
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  errorMessage: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: Theme.colors.primary[500],
    paddingHorizontal: Theme.spacing["2xl"],
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: "center",
    ...Theme.shadows.base,
  },
  retryButtonText: {
    fontFamily: Theme.typography.fontFamily.semibold,
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.base,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Theme.spacing.base,
  },
  emptyTitle: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize["2xl"],
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  emptyMessage: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  refreshButton: {
    backgroundColor: Theme.colors.primary[500],
    paddingHorizontal: Theme.spacing["2xl"],
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: "center",
    ...Theme.shadows.base,
  },
  refreshButtonText: {
    fontFamily: Theme.typography.fontFamily.semibold,
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.base,
  },
});
