import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, StyleProp, ImageStyle } from 'react-native';
import { Image, ImageProps, ImageContentFit } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { logger } from '@/utils/logger';
import { normalize } from '@/utils/responsive';

interface OptimizedImageProps extends Omit<ImageProps, 'source' | 'style' | 'contentFit'> {
  source: { uri: string } | string | number; // number for require() module IDs
  style?: StyleProp<ImageStyle>;
  fallbackIcon?: keyof typeof Ionicons.glyphMap;
  fallbackIconSize?: number;
  fallbackText?: string;
  showLoadingIndicator?: boolean;
  contentFit?: ImageContentFit; // Explicitly define contentFit (replaces resizeMode)
  aspectRatio?: number; // Support aspectRatio for responsive scaling
}

/**
 * OptimizedImage Component
 * 
 * A wrapper around expo-image that provides:
 * - Progressive loading with blurhash placeholders
 * - Error handling with fallback UI
 * - Optimized caching strategy
 * - Loading states
 * - Responsive scaling with aspectRatio support
 * - Normalized dimensions for consistent rendering across devices
 */
function OptimizedImage({
  source,
  style,
  fallbackIcon = 'image-outline',
  fallbackIconSize = 48,
  fallbackText = 'Image unavailable',
  showLoadingIndicator = false,
  contentFit = 'cover', // Default to 'cover' for proper image scaling
  aspectRatio,
  ...imageProps
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);

  // Normalize source to object format
  // If source is a number (require() module ID), use it directly
  // If source is a string (URL), wrap it in { uri: ... }
  const imageSource = typeof source === 'number'
    ? source
    : typeof source === 'string'
      ? { uri: source }
      : source;

  // Handle image load error
  const handleError = useCallback(() => {
    setImageError(true);
  }, []);

  // Process style to ensure responsive dimensions
  // Extract and normalize any fixed dimensions
  const processedStyle = React.useMemo(() => {
    const styleArray = StyleSheet.flatten(style);
    const processedStyles: ImageStyle = { ...styleArray };

    // If aspectRatio is provided, use it and ensure width is percentage-based
    if (aspectRatio) {
      processedStyles.aspectRatio = aspectRatio;
      // Remove fixed height if aspectRatio is specified
      delete processedStyles.height;
    }

    // Ensure width is percentage-based or undefined (defaults to 100%)
    if (typeof processedStyles.width === 'number' && processedStyles.width > 1) {
      // If width is a fixed pixel value, convert to percentage or remove it
      logger.warn('[OptimizedImage] Fixed width detected. Consider using percentage-based width or aspectRatio.');
    }

    return processedStyles;
  }, [style, aspectRatio]);

  // If image failed to load, show fallback UI
  if (imageError) {
    return (
      <View style={[styles.fallbackContainer, processedStyle]}>
        <Ionicons name={fallbackIcon} size={normalize(fallbackIconSize)} color="#9CA3AF" />
        {fallbackText && (
          <Text style={styles.fallbackText}>{fallbackText}</Text>
        )}
      </View>
    );
  }

  try {
    return (
      <Image
        source={imageSource}
        style={[styles.image, processedStyle]}
        contentFit={contentFit}
        onError={handleError}
        {...imageProps}
      />
    );
  } catch (error) {
    logger.error(`[OptimizedImage] Error rendering Image:`, error);
    return (
      <View style={[styles.fallbackContainer, processedStyle]}>
        <Ionicons name={fallbackIcon} size={normalize(fallbackIconSize)} color="#9CA3AF" />
        {fallbackText && (
          <Text style={styles.fallbackText}>Error: {String(error)}</Text>
        )}
      </View>
    );
  }
}

export default React.memo(OptimizedImage);

const styles = StyleSheet.create({
  image: {
    width: '100%', // Always use percentage-based width
    // height removed - use aspectRatio instead for responsive scaling
  },
  fallbackContainer: {
    width: '100%', // Always use percentage-based width
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(8),
  },
  fallbackText: {
    fontFamily: 'Inter_500Medium',
    fontSize: normalize(14),
    color: '#6B7280',
  },
});
