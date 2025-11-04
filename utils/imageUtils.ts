/**
 * Image Utilities
 * Helper functions for image loading, caching, and optimization
 */

import { Image } from 'expo-image';
import { Attraction } from '@/types';
import { logger } from './logger';
import { ImageConfig } from '@/constants/AppConfig';

/**
 * Preload images for better performance
 * Useful for preloading images before they're displayed
 * 
 * @param uris - Array of image URIs to preload
 * @returns Promise that resolves when all images are preloaded
 */
export async function preloadImages(uris: string[]): Promise<void> {
  try {
    await Promise.all(
      uris.map((uri) => Image.prefetch(uri))
    );
  } catch (error) {
    logger.warn('Failed to preload some images:', error);
  }
}

/**
 * Preload attraction images
 * Preloads images for a list of attractions
 * Only preloads remote images (strings), not local bundled images (numbers)
 * 
 * @param attractions - Array of attractions
 * @param limit - Maximum number of images to preload (default from AppConfig)
 */
export async function preloadAttractionImages(
  attractions: Attraction[],
  limit: number = ImageConfig.PRELOAD_COUNT
): Promise<void> {
  const imageUris = attractions
    .slice(0, limit)
    .map((attraction) => attraction.imageUrl)
    // Only preload remote images (strings), local images (numbers) are already bundled
    .filter((uri): uri is string => typeof uri === 'string' && uri.trim() !== '');

  if (imageUris.length > 0) {
    await preloadImages(imageUris);
  }
}

/**
 * Clear image cache
 * Useful for freeing up memory or forcing fresh image loads
 */
export async function clearImageCache(): Promise<void> {
  try {
    await Image.clearMemoryCache();
    await Image.clearDiskCache();
  } catch (error) {
    logger.warn('Failed to clear image cache:', error);
  }
}

/**
 * Get cache size information
 * Returns the current size of the image cache
 */
export async function getCacheSize(): Promise<{ disk: number; memory: number }> {
  try {
    // Note: expo-image doesn't provide direct cache size API
    // This is a placeholder for future implementation
    return { disk: 0, memory: 0 };
  } catch (error) {
    logger.warn('Failed to get cache size:', error);
    return { disk: 0, memory: 0 };
  }
}

/**
 * Validate image URL
 * Checks if an image URL is valid and accessible
 * 
 * @param uri - Image URI to validate
 * @returns Promise that resolves to true if image is valid
 */
export async function validateImageUrl(uri: string): Promise<boolean> {
  if (!uri || uri.trim() === '') {
    return false;
  }

  try {
    // Try to prefetch the image to validate it
    await Image.prefetch(uri);
    return true;
  } catch (error) {
    logger.warn('Invalid image URL:', uri, error);
    return false;
  }
}

/**
 * Generate blurhash from image URL
 * Note: This requires server-side processing or a third-party service
 * This is a placeholder for future implementation
 * 
 * @param uri - Image URI
 * @returns Blurhash string or null
 */
export function generateBlurhash(uri: string): string | null {
  // Placeholder - would need server-side implementation
  // or integration with a blurhash generation service
  return null;
}
