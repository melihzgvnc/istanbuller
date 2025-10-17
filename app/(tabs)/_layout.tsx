import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import LanguageModal from "@/components/language/LanguageModal";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ModeColors } from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";

export default function TabLayout() {
  const { t, language } = useLanguage();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const scheme = useColorScheme() ?? "light";

  const handleLanguagePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLanguageModalVisible(true);
  };

  const languageFlag = language === "tr" ? "🇹🇷" : "🇬🇧";

  return (
    <>
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
            height: 64,
          },
          tabBarItemStyle: {
            marginVertical: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("tab.home"),
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: t("tab.explore"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="globe" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="language"
          options={{
            title: t("tab.language"),
            tabBarIcon: () => (
              <Text style={{ fontSize: 28 }}>{languageFlag}</Text>
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
    </>
  );
}
