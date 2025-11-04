/**
 * Application Configuration Constants
 * 
 * Centralized configuration for all timeout values, thresholds, and magic numbers
 * used throughout the application. Each value is documented with its purpose and rationale.
 */

import { normalize } from '@/utils/responsive';

/**
 * Location Service Configuration
 * 
 * These values control how the app tracks and updates user location.
 */
export const LocationConfig = {
  /**
   * GPS timeout in milliseconds
   * 
   * Maximum time to wait for GPS to acquire a location fix.
   * 
   * Rationale: 15 seconds provides a good balance between:
   * - Giving GPS enough time to acquire satellites (especially in urban areas with tall buildings)
   * - Not making users wait too long if GPS is unavailable
   * - Preventing the app from appearing frozen
   */
  GPS_TIMEOUT_MS: 15000,

  /**
   * Location update interval in milliseconds
   * 
   * How frequently to check for location updates when watching position.
   * 
   * Rationale: 10 seconds provides:
   * - Reasonable real-time tracking for walking tourists
   * - Acceptable battery consumption
   * - Timely updates for nearby attraction recommendations
   * - Not too frequent to cause performance issues
   */
  LOCATION_UPDATE_INTERVAL_MS: 10000,

  /**
   * Distance threshold in meters
   * 
   * Minimum distance the user must move before triggering a location update callback.
   * 
   * Rationale: 100 meters (about 1 city block) ensures:
   * - Significant location changes are captured
   * - Reduces unnecessary updates from GPS drift
   * - Balances battery life with accuracy
   * - Appropriate granularity for tourist navigation
   */
  DISTANCE_THRESHOLD_METERS: 100,

  /**
   * Maximum age for last known location in milliseconds
   * 
   * How old a cached location can be before it's considered stale.
   * 
   * Rationale: 5 minutes (300000ms) allows:
   * - Quick app startup with cached location
   * - Reasonable freshness for tourist use cases
   * - Reduces initial GPS acquisition time
   * - Balances between speed and accuracy
   */
  LAST_KNOWN_MAX_AGE_MS: 300000,

  /**
   * Required accuracy for last known location in meters
   * 
   * Maximum acceptable accuracy radius for cached location.
   * 
   * Rationale: 1km (1000m) is acceptable because:
   * - It's only used for initial quick display
   * - Fresh GPS location will be acquired shortly after
   * - Better to show approximate location quickly than wait
   * - Sufficient for district-level recommendations
   */
  LAST_KNOWN_ACCURACY_METERS: 1000,

  /**
   * Significant location change threshold in kilometers
   * 
   * Used to determine if location change is significant enough to recalculate distances.
   * 
   * Rationale: 0.1km (100m) matches DISTANCE_THRESHOLD_METERS for consistency
   * and ensures distance calculations are updated when user moves meaningfully.
   */
  SIGNIFICANT_CHANGE_THRESHOLD_KM: 0.1,
} as const;

/**
 * Advertisement Configuration
 * 
 * Controls timing and behavior of ads in the app.
 */
export const AdConfig = {
  /**
   * Interstitial ad display delay in milliseconds
   * 
   * Delay before showing interstitial ad after screen loads.
   * 
   * Rationale: 1 second (1000ms) provides:
   * - Time for screen content to render fully
   * - Better user experience (not immediate interruption)
   * - Ensures UI is stable before ad overlay
   * - Complies with ad network best practices
   */
  INTERSTITIAL_DELAY_MS: 1000,

  /**
   * Ad retry delay in milliseconds
   * 
   * Time to wait before retrying ad load after failure.
   * 
   * Rationale: 5 seconds (5000ms) provides:
   * - Reasonable backoff for network issues
   * - Prevents rapid retry loops
   * - Gives time for network conditions to improve
   * - Reduces unnecessary API calls
   */
  AD_RETRY_DELAY_MS: 5000,

  /**
   * Initial ad load delay in milliseconds
   * 
   * Delay before loading first ad after app initialization.
   * 
   * Rationale: 1 second (1000ms) allows:
   * - App to initialize core functionality first
   * - Better startup performance
   * - Prioritizes user experience over ads
   * - Ensures ad SDK is fully initialized
   */
  INITIAL_AD_LOAD_DELAY_MS: 1000,
} as const;

/**
 * Image Loading Configuration
 * 
 * Controls image preloading and caching behavior.
 */
export const ImageConfig = {
  /**
   * Number of attraction images to preload
   * 
   * How many attraction images to preload ahead of time.
   * 
   * Rationale: 5 images provides:
   * - Smooth scrolling experience for first few items
   * - Reasonable memory usage
   * - Balance between performance and resource consumption
   * - Covers typical viewport plus a few items ahead
   */
  PRELOAD_COUNT: 5,
} as const;

/**
 * Animation Configuration
 * 
 * Controls animation timing and behavior throughout the app.
 */
export const AnimationConfig = {
  /**
   * Screen transition duration in milliseconds
   * 
   * Duration of slide animations between screens.
   * 
   * Rationale: 250ms provides:
   * - Smooth, perceptible transitions
   * - Not too slow to feel sluggish
   * - Standard duration for mobile navigation
   * - Good balance between speed and visual feedback
   */
  SCREEN_TRANSITION_DURATION_MS: 250,

  /**
   * Fade in animation duration in milliseconds
   * 
   * Duration for fade-in effects on content.
   * 
   * Rationale: 300ms provides:
   * - Subtle, smooth appearance
   * - Slightly longer than transitions for emphasis
   * - Comfortable viewing experience
   * - Standard duration for content reveals
   */
  FADE_IN_DURATION_MS: 300,

  /**
   * Fade in down animation duration in milliseconds
   * 
   * Duration for fade-in-down effects on content sections.
   * 
   * Rationale: 400ms provides:
   * - More pronounced entrance effect
   * - Draws attention to important content
   * - Smooth motion without feeling slow
   * - Creates visual hierarchy with staggered delays
   */
  FADE_IN_DOWN_DURATION_MS: 400,

  /**
   * Fade in down animation delay in milliseconds
   * 
   * Delay before starting fade-in-down animation.
   * 
   * Rationale: 100ms provides:
   * - Staggered appearance of elements
   * - Creates polished, sequential reveal
   * - Not too long to delay content visibility
   * - Enhances perceived performance
   */
  FADE_IN_DOWN_DELAY_MS: 100,

  /**
   * Button press scale factor
   * 
   * Scale multiplier for button press animation.
   * 
   * Rationale: 0.9 (90% of original size) provides:
   * - Clear visual feedback on press
   * - Not too dramatic to be distracting
   * - Standard iOS-style press effect
   * - Feels responsive and tactile
   */
  BUTTON_PRESS_SCALE: 0.9,

  /**
   * Spring animation damping
   * 
   * Damping coefficient for spring animations.
   * 
   * Rationale: 15 provides:
   * - Slight bounce effect
   * - Natural, physical feel
   * - Not too bouncy to be distracting
   * - Enhances tactile feedback
   */
  SPRING_DAMPING: 15,

  /**
   * Spring animation stiffness
   * 
   * Stiffness coefficient for spring animations.
   * 
   * Rationale: 300 provides:
   * - Quick, responsive animation
   * - Pairs well with damping of 15
   * - Feels snappy without being jarring
   * - Standard value for button interactions
   */
  SPRING_STIFFNESS: 300,
} as const;

/**
 * Cache Configuration
 * 
 * Controls caching behavior for various data types.
 */
export const CacheConfig = {
  /**
   * Maximum distance cache size
   * 
   * Maximum number of distance calculations to cache in memory.
   * 
   * Rationale: 1000 entries provides:
   * - Sufficient cache for typical usage patterns
   * - Prevents unbounded memory growth
   * - Covers all attractions multiple times
   * - Reasonable memory footprint (~50KB)
   */
  MAX_DISTANCE_CACHE_SIZE: 1000,
} as const;

/**
 * Geolocation Constants
 * 
 * Physical constants used in distance calculations.
 */
export const GeoConstants = {
  /**
   * Earth's radius in kilometers
   * 
   * Used for Haversine distance calculations.
   * 
   * Rationale: 6371km is the standard mean radius of Earth
   * used in geographic calculations. Provides accuracy within
   * 0.5% for most practical purposes.
   */
  EARTH_RADIUS_KM: 6371,

  /**
   * Degrees to radians conversion factor
   * 
   * Mathematical constant for converting degrees to radians.
   * 
   * Rationale: π/180 is the standard conversion factor.
   * Precomputed for performance in distance calculations.
   */
  DEGREES_TO_RADIANS: Math.PI / 180,
} as const;

/**
 * Distance Precision Configuration
 * 
 * Controls rounding and precision for distance displays.
 */
export const DistancePrecision = {
  /**
   * Decimal places for distance display
   * 
   * Number of decimal places to show for distances in kilometers.
   * 
   * Rationale: 2 decimal places (e.g., 1.25 km) provides:
   * - Sufficient precision for walking distances
   * - Clean, readable display
   * - Accuracy within 10 meters
   * - Standard for consumer mapping applications
   */
  DECIMAL_PLACES: 2,

  /**
   * Rounding multiplier
   * 
   * Used to round distances: Math.round(distance * 100) / 100
   * 
   * Rationale: 100 corresponds to 2 decimal places.
   * Calculated as 10^DECIMAL_PLACES for consistency.
   */
  ROUNDING_MULTIPLIER: 100,
} as const;

/**
 * UI Layout Constants
 * 
 * Responsive dimensions and sizes used in the UI.
 * All pixel values are normalized for consistent scaling across devices.
 */
export const UIConstants = {
  /**
   * Hero image height in pixels (normalized)
   * 
   * Height of the hero image on attraction detail screen.
   * 
   * Rationale: 160px (normalized) provides:
   * - Prominent visual without dominating screen
   * - Good aspect ratio for landscape images
   * - Leaves room for content below fold
   * - Scales properly on various screen sizes
   * 
   * Note: Using normalize() ensures consistent scaling across devices
   */
  HERO_IMAGE_HEIGHT: normalize(160),

  /**
   * Full width percentage
   * 
   * Used for full-width elements.
   * 
   * Rationale: "100%" is standard CSS for full width.
   * Defined as constant for consistency.
   */
  FULL_WIDTH: "100%" as const,

  /**
   * Full height percentage
   * 
   * Used for full-height elements.
   * 
   * Rationale: "100%" is standard CSS for full height.
   * Defined as constant for consistency.
   */
  FULL_HEIGHT: "100%" as const,

  /**
   * Border left width for accent (normalized)
   * 
   * Width of left border accent on cards.
   * 
   * Rationale: 3px (normalized) provides:
   * - Visible accent without being overwhelming
   * - Clear visual hierarchy
   * - Standard accent width in material design
   * - Works well with border radius
   * - Scales properly on various screen sizes
   */
  ACCENT_BORDER_WIDTH: normalize(3),
} as const;

/**
 * Export all configurations as a single object for convenience
 */
export const AppConfig = {
  location: LocationConfig,
  ads: AdConfig,
  images: ImageConfig,
  animation: AnimationConfig,
  cache: CacheConfig,
  geo: GeoConstants,
  distance: DistancePrecision,
  ui: UIConstants,
} as const;

/**
 * Type exports for TypeScript consumers
 */
export type AppConfigType = typeof AppConfig;
export type LocationConfigType = typeof LocationConfig;
export type AdConfigType = typeof AdConfig;
export type ImageConfigType = typeof ImageConfig;
export type AnimationConfigType = typeof AnimationConfig;
export type CacheConfigType = typeof CacheConfig;
export type GeoConstantsType = typeof GeoConstants;
export type DistancePrecisionType = typeof DistancePrecision;
export type UIConstantsType = typeof UIConstants;
