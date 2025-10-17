import Theme from "@/constants/theme";
import { DistanceInfo } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
      accessibilityLabel={`Walking distance: ${formatDistance(
        distance.walkingDistanceKm
      )}, ${formatTime(
        distance.walkingTimeMinutes
      )}. Public transport: ${formatTime(distance.publicTransportTimeMinutes)}`}
    >
      <View style={styles.badge}>
        <Ionicons name="walk" size={16} color={Theme.colors.primary[700]} />
        <Text style={styles.badgeText}>
          {formatDistance(distance.walkingDistanceKm)} •{" "}
          {formatTime(distance.walkingTimeMinutes)}
        </Text>
      </View>

      <View style={styles.badge}>
        <Ionicons name="bus" size={16} color={Theme.colors.secondary[600]} />
        <Text style={styles.badgeText}>
          {formatTime(distance.publicTransportTimeMinutes)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
    flexWrap: "wrap",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral[50],
    paddingHorizontal: Theme.spacing.sm + 2,
    paddingVertical: Theme.spacing.xs + 2,
    borderRadius: Theme.borderRadius.full,
    gap: Theme.spacing.xs,
    minHeight: 28,
  },
  badgeText: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.text.primary,
  },
});
