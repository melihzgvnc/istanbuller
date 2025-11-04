import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Manual Selection Context Type Definition
 * 
 * This context provides a mechanism for cross-component communication
 * to trigger manual district selection clearing without using global variables.
 */
export interface ManualSelectionContextType {
  /**
   * Trigger a clear of manual selection
   * This sets a flag that the home screen can listen to
   */
  triggerClear: () => void;

  /**
   * Register a callback to be called when clear is triggered
   * Returns an unregister function
   */
  onClearTriggered: (callback: () => void) => () => void;
}

/**
 * Create the context with undefined default value
 */
const ManualSelectionContext = createContext<ManualSelectionContextType | undefined>(undefined);

/**
 * Props for the ManualSelectionProvider component
 */
interface ManualSelectionProviderProps {
  children: ReactNode;
}

/**
 * ManualSelectionProvider component that wraps the app and provides
 * manual selection clearing functionality
 * 
 * This replaces the global variable pattern with a proper React Context
 * implementation for type-safe cross-component communication.
 */
export function ManualSelectionProvider({ children }: ManualSelectionProviderProps) {
  // Store registered callbacks
  const [callbacks, setCallbacks] = useState<Set<() => void>>(new Set());

  /**
   * Trigger clear of manual selection
   * Calls all registered callbacks
   */
  const triggerClear = useCallback(() => {
    callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        // Silently handle errors to prevent one callback from breaking others
        if (__DEV__) {
          console.error('Error in manual selection clear callback:', error);
        }
      }
    });
  }, [callbacks]);

  /**
   * Register a callback to be called when clear is triggered
   * Returns an unregister function for cleanup
   */
  const onClearTriggered = useCallback((callback: () => void) => {
    setCallbacks(prev => {
      const next = new Set(prev);
      next.add(callback);
      return next;
    });

    // Return unregister function
    return () => {
      setCallbacks(prev => {
        const next = new Set(prev);
        next.delete(callback);
        return next;
      });
    };
  }, []);

  /**
   * Context value
   */
  const value: ManualSelectionContextType = {
    triggerClear,
    onClearTriggered,
  };

  return (
    <ManualSelectionContext.Provider value={value}>
      {children}
    </ManualSelectionContext.Provider>
  );
}

/**
 * Custom hook to use the manual selection context
 * Throws an error if used outside of ManualSelectionProvider
 * 
 * @example
 * ```tsx
 * // In a component that needs to trigger clear
 * const { triggerClear } = useManualSelection();
 * triggerClear();
 * 
 * // In a component that needs to respond to clear
 * const { onClearTriggered } = useManualSelection();
 * useEffect(() => {
 *   return onClearTriggered(() => {
 *     // Handle clear
 *   });
 * }, [onClearTriggered]);
 * ```
 */
export function useManualSelection(): ManualSelectionContextType {
  const context = useContext(ManualSelectionContext);

  if (context === undefined) {
    throw new Error('useManualSelection must be used within a ManualSelectionProvider');
  }

  return context;
}
