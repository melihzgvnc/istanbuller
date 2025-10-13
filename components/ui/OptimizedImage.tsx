import React, { useState } from 'react';
import { View, Text, StyleSheet, StyleProp, ImageStyle } from 'react-native';
import { Image, ImageProps } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

interface OptimizedImageProps extends Omit<ImageProps, 'source' | 'style'> {
  source: { uri: string } | string;
  style?: StyleProp<ImageStyle>;
  fallbackIcon?: keyof typeof Ionicons.glyphMap;
  fallbackIconSize?: number;
  fallbackText?: string;
  showLoadingIndicator?: boolean;
}

/**
 * OptimizedImage Component
 * 
 * A wrapper around expo-image that provides:
 * - Progressive loading with blurhash placeholders
 * - Error handling with fallback UI
 * - Optimized caching strategy
 * - Loading states
 */
export default function OptimizedImage({
  source,
  style,
  fallbackIcon = 'image-outline',
  fallbackIconSize = 48,
  fallbackText = 'Image unavailable',
  showLoadingIndicator = false,
  ...imageProps
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize source to object format
  const imageSource = typeof source === 'string' ? { uri: source } : source;

  // Handle image load completion
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle image load error
  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // If image failed to load, show fallback UI
  if (imageError) {
    return (
      <View style={[styles.fallbackContainer, style]}>
        <Ionicons name={fallbackIcon} size={fallbackIconSize} color="#9CA3AF" />
        {fallbackText && (
          <Text style={styles.fallbackText}>{fallbackText}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={style}>
      <Image
        source={imageSource}
        style={styles.image}
        onLoad={handleLoad}
        onError={handleError}
        {...imageProps}
      />
      {showLoadingIndicator && isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingIndicator} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  fallbackText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(243, 244, 246, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#E5E7EB',
    borderTopColor: '#3B82F6',
  },
});
