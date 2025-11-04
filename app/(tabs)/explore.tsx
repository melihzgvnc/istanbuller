import BannerAd from "@/components/ads/BannerAd";
import DistrictCard from "@/components/district/DistrictCard";
import DistrictDetailView from "@/components/district/DistrictDetailView";
import { BANNER_AD_UNIT_ID_EXPLORE } from "@/constants/AdConfig";
import { getAllDistricts } from "@/constants/DistrictMetadata";
import Theme from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { IstanbulDistrict } from "@/types";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { BackHandler, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createSafeAreaStyle } from "@/utils/styleUtils";
import { useResponsive } from "@/hooks/useResponsive";

export default function ExploreScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const { isLandscape, isTablet } = useResponsive();
  const [selectedDistrict, setSelectedDistrict] =
    useState<IstanbulDistrict | null>(null);
  const districts = useMemo(() => getAllDistricts(), []);

  const handleDistrictPress = useCallback((district: IstanbulDistrict) => {
    setSelectedDistrict(district);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedDistrict(null);
  }, []);

  // Handle Android hardware back button - only when screen is focused
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (selectedDistrict) {
            handleBackToList();
            return true; // Prevent default behavior
          }
          return false; // Let default behavior happen
        }
      );

      return () => backHandler.remove();
    }, [selectedDistrict, handleBackToList])
  );

  const renderDistrictCard = useCallback(({ item }: { item: any }) => (
    <DistrictCard
      district={item.name}
      info={item}
      onPress={handleDistrictPress}
    />
  ), [handleDistrictPress]);

  const keyExtractor = useCallback((item: any) => item.name, []);

  const getItemLayout = useCallback((_data: any, index: number) => ({
    length: 96, // Approximate item height (72px image + 16px padding + 8px margin)
    offset: 96 * index,
    index,
  }), []);

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
    <View style={[styles.container, createSafeAreaStyle(insets, { bottom: false })]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[
        styles.header,
        isLandscape && styles.headerLandscape,
        isTablet && styles.headerTablet
      ]}>
        <Text style={[
          styles.title,
          isLandscape && styles.titleLandscape
        ]}>{t("explore.title")}</Text>
        <Text style={[
          styles.subtitle,
          isLandscape && styles.subtitleLandscape
        ]}>{t("explore.subtitle")}</Text>
      </View>

      <FlatList
        data={districts}
        renderItem={renderDistrictCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          isLandscape && styles.listContentLandscape,
          isTablet && styles.listContentTablet
        ]}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        getItemLayout={getItemLayout}
        numColumns={isLandscape && !isTablet ? 2 : isTablet ? 3 : 1}
        key={isLandscape && !isTablet ? 'landscape-2' : isTablet ? 'tablet-3' : 'portrait-1'}
      />

      {/* Banner Ad */}
      <BannerAd adUnitId={BANNER_AD_UNIT_ID_EXPLORE} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.base,
    paddingVertical: Theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border.default,
    backgroundColor: Theme.colors.background,
  },
  headerLandscape: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  headerTablet: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.lg,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize["3xl"],
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  titleLandscape: {
    fontSize: Theme.typography.fontSize["2xl"],
    marginBottom: Theme.spacing.xs / 2,
  },
  subtitle: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
  },
  subtitleLandscape: {
    fontSize: Theme.typography.fontSize.xs,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.base,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xl,
  },
  listContentLandscape: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.base,
    paddingBottom: Theme.spacing.base,
  },
  listContentTablet: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
  },
});
