import React from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AttractionWithDistance } from '@/types';
import AttractionCard from './AttractionCard';
import Theme from '@/constants/theme';
import { mediumHaptic } from '@/utils/haptics';

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
  const [refreshing, setRefreshing] = React.useState(false);

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
      <Animated.View entering={FadeIn.duration(300)} style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary[500]} />
        <Text style={styles.loadingText}>Finding attractions near you...</Text>
      </Animated.View>
    );
  }

  // Error state
  if (error) {
    return (
      <Animated.View entering={FadeIn.duration(300)} style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable 
          style={styles.retryButton} 
          onPress={handleRetry}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Try Again"
          accessibilityHint="Retries loading attractions"
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </Animated.View>
    );
  }

  // Empty state
  if (attractions.length === 0) {
    return (
      <Animated.View entering={FadeIn.duration(300)} style={styles.centerContainer}>
        <Text style={styles.emptyIcon}>🗺️</Text>
        <Text style={styles.emptyTitle}>No Attractions Found</Text>
        <Text style={styles.emptyMessage}>
          There are no attractions in your current area. Try moving to a different district.
        </Text>
        <Pressable 
          style={styles.refreshButton} 
          onPress={handleRefresh}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Refresh Location"
          accessibilityHint="Refreshes your current location"
        >
          <Text style={styles.refreshButtonText}>Refresh Location</Text>
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
      getItemLayout={(data, index) => ({
        length: 280, // Approximate item height (200px image + 80px content)
        offset: 288 * index, // 280 + 8 margin
        index,
      })}
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={50}
      initialNumToRender={5}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: Theme.spacing.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing['2xl'],
  },
  loadingText: {
    marginTop: Theme.spacing.base,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: Theme.spacing.base,
  },
  errorTitle: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  errorMessage: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: Theme.colors.primary[500],
    paddingHorizontal: Theme.spacing['2xl'],
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: 'center',
    ...Theme.shadows.base,
  },
  retryButtonText: {
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Theme.spacing.base,
  },
  emptyTitle: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  emptyMessage: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  refreshButton: {
    backgroundColor: Theme.colors.primary[500],
    paddingHorizontal: Theme.spacing['2xl'],
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: 'center',
    ...Theme.shadows.base,
  },
  refreshButtonText: {
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
});
