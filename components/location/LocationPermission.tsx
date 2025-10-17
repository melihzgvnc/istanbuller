import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { requestPermissions } from "@/services/locationService";
import { errorHaptic, mediumHaptic } from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

interface LocationPermissionProps {
  onPermissionGranted: () => void;
  onPermissionDenied: () => void;
}

export default function LocationPermission({
  onPermissionGranted,
  onPermissionDenied,
}: LocationPermissionProps) {
  const { t } = useLanguage();
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSettingsPrompt, setShowSettingsPrompt] = useState(false);

  const handleRequestPermission = async () => {
    mediumHaptic();
    setIsRequesting(true);
    try {
      const granted = await requestPermissions();

      if (granted) {
        onPermissionGranted();
      } else {
        // Permission denied, show settings prompt
        errorHaptic();
        setShowSettingsPrompt(true);
        onPermissionDenied();
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
      errorHaptic();
      setShowSettingsPrompt(true);
      onPermissionDenied();
    } finally {
      setIsRequesting(false);
    }
  };

  const handleOpenSettings = () => {
    mediumHaptic();
    Linking.openSettings();
  };

  if (showSettingsPrompt) {
    return (
      <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
        <Animated.View
          entering={FadeInDown.duration(400).delay(100)}
          style={styles.iconContainer}
        >
          <Ionicons
            name="location-outline"
            size={80}
            color={Theme.colors.error[500]}
          />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.duration(400).delay(200)}
          style={styles.title}
        >
          {t("location.accessDenied")}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(400).delay(300)}
          style={styles.description}
        >
          {t("location.settingsMessage")}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.duration(400).delay(400)}
          style={{ width: "100%" }}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleOpenSettings}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t("location.openSettings")}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={Theme.colors.text.inverse}
            />
            <Text style={styles.primaryButtonText}>
              {t("location.openSettings")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleRequestPermission}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t("common.retry")}
          >
            <Text style={styles.secondaryButtonText}>{t("common.retry")}</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(400).delay(100)}
        style={styles.iconContainer}
      >
        <Ionicons name="location" size={80} color={Theme.colors.primary[500]} />
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.duration(400).delay(200)}
        style={styles.title}
      >
        {t("home.title")}
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.duration(400).delay(300)}
        style={styles.description}
      >
        {t("location.permissionMessage")}
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.duration(400).delay(400)}
        style={styles.featureList}
      >
        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Theme.colors.success[500]}
          />
          <Text style={styles.featureText}>{t("location.feature1")}</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Theme.colors.success[500]}
          />
          <Text style={styles.featureText}>{t("location.feature2")}</Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Theme.colors.success[500]}
          />
          <Text style={styles.featureText}>{t("location.feature3")}</Text>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(400).delay(500)}
        style={{ width: "100%" }}
      >
        <TouchableOpacity
          style={[styles.primaryButton, isRequesting && styles.buttonDisabled]}
          onPress={handleRequestPermission}
          disabled={isRequesting}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t("location.grantPermission")}
        >
          <Ionicons
            name="navigate"
            size={20}
            color={Theme.colors.text.inverse}
          />
          <Text style={styles.primaryButtonText}>
            {isRequesting
              ? t("location.requesting")
              : t("location.grantPermission")}
          </Text>
        </TouchableOpacity>

        <Text style={styles.privacyNote}>{t("location.privacyNote")}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
  },
  iconContainer: {
    marginBottom: Theme.spacing.xl,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.full,
  },
  title: {
    fontSize: Theme.typography.fontSize["3xl"],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.base,
    textAlign: "center",
  },
  description: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Theme.spacing["2xl"],
    paddingHorizontal: Theme.spacing.sm,
  },
  featureList: {
    width: "100%",
    marginBottom: Theme.spacing["2xl"],
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.base,
    paddingHorizontal: Theme.spacing.sm,
    minHeight: Theme.accessibility.minTouchTarget / 1.5,
  },
  featureText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.primary,
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.base,
    paddingHorizontal: Theme.spacing["2xl"],
    borderRadius: Theme.borderRadius.md,
    width: "100%",
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    ...Theme.shadows.base,
  },
  primaryButtonText: {
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    marginLeft: Theme.spacing.sm,
  },
  secondaryButton: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.base,
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Theme.colors.primary[700],
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  privacyNote: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.tertiary,
    textAlign: "center",
    marginTop: Theme.spacing.sm,
  },
});
