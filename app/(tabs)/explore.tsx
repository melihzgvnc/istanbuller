import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { IstanbulDistrict } from '@/types';
import { getAllDistricts } from '@/constants/DistrictMetadata';
import { useLanguage } from '@/context/LanguageContext';
import DistrictCard from '@/components/district/DistrictCard';
import DistrictDetailView from '@/components/district/DistrictDetailView';
import Theme from '@/constants/theme';

export default function ExploreScreen() {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<IstanbulDistrict | null>(null);
  const districts = getAllDistricts();

  const handleDistrictPress = (district: IstanbulDistrict) => {
    setSelectedDistrict(district);
  };

  const handleBackToList = () => {
    setSelectedDistrict(null);
  };

  // Show district detail view if a district is selected
  if (selectedDistrict) {
    return (
      <DistrictDetailView
        district={selectedDistrict}
        onBack={handleBackToList}
      />
    );
  }

  // Show district list
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{t('explore.title')}</Text>
        <Text style={styles.subtitle}>{t('explore.subtitle')}</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {districts.map((districtInfo) => (
            <DistrictCard
              key={districtInfo.name}
              district={districtInfo.name}
              info={districtInfo}
              onPress={handleDistrictPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.base,
    paddingBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  grid: {
    gap: Theme.spacing.base,
  },
});
