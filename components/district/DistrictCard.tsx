import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { IstanbulDistrict } from '@/types';
import { DistrictInfo } from '@/constants/DistrictMetadata';
import { getAttractionsByDistrict } from '@/services/attractionService';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedDistrictField } from '@/utils/translations';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Theme from '@/constants/theme';
import { mediumHaptic } from '@/utils/haptics';

interface DistrictCardProps {
  district: IstanbulDistrict;
  info: DistrictInfo;
  onPress: (district: IstanbulDistrict) => void;
}

export default function DistrictCard({ district, info, onPress }: DistrictCardProps) {
  const { t, language } = useLanguage();
  const attractions = getAttractionsByDistrict(district);
  const attractionCount = attractions.length;

  const handlePress = () => {
    mediumHaptic();
    onPress(district);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${info.displayName} district`}
      accessibilityHint={`View ${attractionCount} attractions in ${info.displayName}`}
    >
      <View style={styles.imageContainer}>
        {info.image ? (
          <Image
            source={info.image}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.iconFallback}>
            <IconSymbol
              name={info.icon as any}
              size={40}
              color={Theme.colors.primary[500]}
            />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{getTranslatedDistrictField(district, 'displayName', language, info.displayName)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {getTranslatedDistrictField(district, 'description', language, info.description)}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.attractionCount}>
            {attractionCount} {attractionCount === 1 ? t('district.place') : t('district.places')}
          </Text>
          <IconSymbol
            name="chevron.right"
            size={16}
            color={Theme.colors.text.tertiary}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.base,
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    ...Theme.shadows.sm,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    marginRight: Theme.spacing.base,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.secondary,
    lineHeight: 18,
    marginBottom: Theme.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attractionCount: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text.tertiary,
    fontWeight: Theme.typography.fontWeight.medium,
  },
});
