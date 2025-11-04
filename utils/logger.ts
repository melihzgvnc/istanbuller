/**
 * Centralized logging utility for the Istanbuller app.
 * 
 * This logger wraps console statements with __DEV__ checks to ensure
 * that debug logs are only output during development and not in production builds.
 * 
 * Usage:
 *   import { logger } from '@/utils/logger';
 *   logger.log('User location updated', coordinates);
 *   logger.warn('Location permission not granted');
 *   logger.error('Failed to load attractions', error);
 *   logger.debug('Debug info', data);
 */

/**
 * Logger interface defining all available logging methods
 */
export interface Logger {
  /**
   * Log general information messages
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  log: (message: string, ...args: any[]) => void;

  /**
   * Log warning messages
   * @param message - The warning message to log
   * @param args - Additional arguments to log
   */
  warn: (message: string, ...args: any[]) => void;

  /**
   * Log error messages
   * @param message - The error message to log
   * @param error - Optional error object or additional arguments
   */
  error: (message: string, error?: any) => void;

  /**
   * Log debug messages (only in development)
   * @param message - The debug message to log
   * @param args - Additional arguments to log
   */
  debug: (message: string, ...args: any[]) => void;
}

/**
 * Log level type for future extensibility
 */
export type LogLevel = 'debug' | 'log' | 'warn' | 'error';

/**
 * Logger configuration interface for future extensibility
 */
export interface LoggerConfig {
  enabled: boolean;
  minLevel: LogLevel;
  includeTimestamp: boolean;
}

/**
 * Development-aware logger implementation
 * All logging is suppressed in production builds via __DEV__ checks
 */
class AppLogger implements Logger {
  /**
   * Log general information messages
   * Only outputs in development builds
   */
  log(message: string, ...args: any[]): void {
    if (__DEV__) {
      console.log(`[LOG] ${message}`, ...args);
    }
  }

  /**
   * Log warning messages
   * Only outputs in development builds
   */
  warn(message: string, ...args: any[]): void {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log error messages
   * Only outputs in development builds
   * In production, you could extend this to send to error tracking service
   */
  error(message: string, error?: any): void {
    if (__DEV__) {
      if (error) {
        console.error(`[ERROR] ${message}`, error);
      } else {
        console.error(`[ERROR] ${message}`);
      }
    }
    // TODO: In production, send to error tracking service (e.g., Sentry)
    // if (!__DEV__) {
    //   errorTrackingService.captureError(message, error);
    // }
  }

  /**
   * Log debug messages
   * Only outputs in development builds
   * Use for verbose debugging information
   */
  debug(message: string, ...args: any[]): void {
    if (__DEV__) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }
}

/**
 * Singleton logger instance
 * Import and use this throughout the application
 */
export const logger: Logger = new AppLogger();

/**
 * Default export for convenience
 */
export default logger;
