import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import LanguageModal from "@/components/language/LanguageModal";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ModeColors } from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useManualSelection } from "@/context/ManualSelectionContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import ErrorBoundary from "@/components/ErrorBoundary";
import * as Haptics from "expo-haptics";

export default function TabLayout() {
  const { t, language } = useLanguage();
  const { triggerClear } = useManualSelection();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const scheme = useColorScheme() ?? "light";

  const handleLanguagePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLanguageModalVisible(true);
  };

  const languageFlag = language === "tr" ? "🇹🇷" : "🇬🇧";

  return (
    <ErrorBoundary>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: ModeColors[scheme].accent,
          tabBarInactiveTintColor: ModeColors[scheme].textSecondary,
          tabBarStyle: {
            backgroundColor: ModeColors[scheme].surface,
            borderTopColor: ModeColors[scheme].border,
            borderTopWidth: 1,
            paddingBottom: 4,
            paddingTop: 4,
          },
          tabBarItemStyle: {
            marginVertical: 4,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginBottom: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("tab.home"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="house.fill" color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              // Clear manual district selection when home tab is pressed
              triggerClear();
            },
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: t("tab.explore"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="globe" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="language"
          options={{
            title: t("tab.language"),
            tabBarIcon: () => (
              <Text style={styles.languageFlag}>{languageFlag}</Text>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleLanguagePress();
            },
          }}
        />
      </Tabs>

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  languageFlag: {
    fontSize: 24,
  },
});
