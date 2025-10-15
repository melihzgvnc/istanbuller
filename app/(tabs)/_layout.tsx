import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Text } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import LanguageModal from '@/components/language/LanguageModal';
import { Colors } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import * as Haptics from 'expo-haptics';

export default function TabLayout() {
  const { t, language } = useLanguage();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleLanguagePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLanguageModalVisible(true);
  };

  const languageFlag = language === 'tr' ? '🇹🇷' : '🇬🇧';

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary[500],
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: t('tab.home'),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: t('tab.explore'),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="globe" color={color} />,
          }}
        />
        <Tabs.Screen
          name="language"
          options={{
            title: t('tab.language'),
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
