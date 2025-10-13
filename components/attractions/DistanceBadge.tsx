import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DistanceInfo } from '@/types';
import Theme from '@/constants/theme';

interface DistanceBadgeProps {
  distance: DistanceInfo;
}

export default function DistanceBadge({ distance }: DistanceBadgeProps) {
  const formatDistance = (km: number): string => {
    if (km < 1) {
      return `${Math.round(km * 1000)}m`;
    }
    return `${km.toFixed(1)}km`;
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${Math.round(minutes)}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}min`;
  };

  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Walking distance: ${formatDistance(distance.walkingDistanceKm)}, ${formatTime(distance.walkingTimeMinutes)}. Public transport: ${formatTime(distance.publicTransportTimeMinutes)}`}
    >
      <View style={styles.badge}>
        <Ionicons name="walk" size={16} color={Theme.colors.primary[600]} />
        <Text style={styles.badgeText}>
          {formatDistance(distance.walkingDistanceKm)} • {formatTime(distance.walkingTimeMinutes)}
        </Text>
      </View>
      
      <View style={styles.badge}>
        <Ionicons name="bus" size={16} color={Theme.colors.success[600]} />
        <Text style={styles.badgeText}>
          {formatTime(distance.publicTransportTimeMinutes)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: Theme.spacing.sm + 2,
    paddingVertical: Theme.spacing.xs + 2,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.xs,
    minHeight: 28,
  },
  badgeText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text.primary,
  },
});
