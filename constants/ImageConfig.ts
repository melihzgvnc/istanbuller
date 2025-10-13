/**
 * Image Configuration for expo-image
 * Provides optimized settings for image loading, caching, and placeholders
 */

import { ImageContentFit } from 'expo-image';

/**
 * Blurhash placeholders for different image types
 * Generated using https://blurha.sh/
 */
export const BLURHASH_PLACEHOLDERS = {
  // Generic placeholder for attraction images
  ATTRACTION: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
  // Lighter placeholder for hero images
  HERO: 'L8Q0Mq~q4n9F?b%MRjWB4n-;D%M{',
  // Neutral gray placeholder
  NEUTRAL: 'L6Pj0^jE.AyE_3t7t7R**0o#DgR4',
} as const;

/**
 * Image transition duration in milliseconds
 */
export const IMAGE_TRANSITION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * Image content fit modes
 */
export const IMAGE_CONTENT_FIT: Record<string, ImageContentFit> = {
  COVER: 'cover',
  CONTAIN: 'contain',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down',
} as const;

/**
 * Cache policy for images
 * - memory: Cache in memory only
 * - disk: Cache on disk only
 * - memory-disk: Cache in both memory and disk (default)
 */
export const IMAGE_CACHE_POLICY = {
  MEMORY: 'memory',
  DISK: 'disk',
  MEMORY_DISK: 'memory-disk',
} as const;

/**
 * Image priority levels
 * - low: Load when resources are available
 * - normal: Default priority
 * - high: Load as soon as possible
 */
export const IMAGE_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
} as const;

/**
 * Default image configuration for attraction cards
 */
export const ATTRACTION_CARD_IMAGE_CONFIG = {
  contentFit: IMAGE_CONTENT_FIT.COVER,
  transition: IMAGE_TRANSITION_DURATION.FAST,
  placeholder: { blurhash: BLURHASH_PLACEHOLDERS.ATTRACTION },
  cachePolicy: IMAGE_CACHE_POLICY.MEMORY_DISK,
  priority: IMAGE_PRIORITY.NORMAL,
  recyclingKey: 'attraction-card',
} as const;

/**
 * Default image configuration for hero/detail images
 */
export const HERO_IMAGE_CONFIG = {
  contentFit: IMAGE_CONTENT_FIT.COVER,
  transition: IMAGE_TRANSITION_DURATION.NORMAL,
  placeholder: { blurhash: BLURHASH_PLACEHOLDERS.HERO },
  cachePolicy: IMAGE_CACHE_POLICY.MEMORY_DISK,
  priority: IMAGE_PRIORITY.HIGH,
  recyclingKey: 'hero-image',
} as const;

/**
 * Fallback image URLs for different scenarios
 */
export const FALLBACK_IMAGES = {
  ATTRACTION: 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Attraction',
  HERO: 'https://via.placeholder.com/800x600/e5e7eb/6b7280?text=Image+Unavailable',
} as const;
