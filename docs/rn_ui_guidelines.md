# React Native UI Design Guidelines for AI Systems

## Purpose
This document defines mandatory design practices for developing React Native applications with consistent UI across Android devices and screen sizes. All generated code MUST comply with these guidelines.

---

## 1. MANDATORY LAYOUT PRINCIPLES

### 1.1 Flexbox-First Approach
- **ALWAYS** use flexbox as the primary layout system
- **NEVER** use fixed pixel values for component dimensions
- **USE** `flex`, percentages, or relative units for all sizing
- **IMPLEMENT** `flex: 1` for components that should fill available space proportionally

### 1.2 Dimension Handling
```javascript
import { Dimensions, PixelRatio, useWindowDimensions } from 'react-native';

// For static calculations
const { width, height } = Dimensions.get('window');

// For dynamic/reactive calculations (PREFERRED)
const { width, height } = useWindowDimensions();

// Scaling utility (base: 375px width)
const DESIGN_WIDTH = 375;
const scale = width / DESIGN_WIDTH;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));
```

### 1.3 Responsive Sizing Rules
- **ALWAYS** use percentage-based widths for containers: `width: '80%'`, `width: '100%'`
- **NEVER** hardcode absolute pixel values like `width: 300`
- **USE** aspect ratios for consistent proportions: `aspectRatio: 16/9`
- **IMPLEMENT** scaling functions for all numeric style values

---

## 2. TYPOGRAPHY REQUIREMENTS

### 2.1 Font Scaling System
```javascript
// REQUIRED: Define normalized font sizes
const typography = {
  h1: normalize(32),
  h2: normalize(28),
  h3: normalize(24),
  h4: normalize(20),
  body: normalize(16),
  bodySmall: normalize(14),
  caption: normalize(12)
};
```

### 2.2 Typography Rules
- **ALWAYS** use the normalized typography scale
- **NEVER** use raw pixel values for fontSize
- **MAINTAIN** consistent visual hierarchy through scaled sizes
- **ENSURE** minimum touch targets of 44x44 dp for interactive text elements

---

## 3. SPACING AND DENSITY

### 3.1 Spacing Scale Definition
```javascript
// REQUIRED: Define consistent spacing system
const spacing = {
  xxs: normalize(2),
  xs: normalize(4),
  sm: normalize(8),
  md: normalize(12),
  lg: normalize(16),
  xl: normalize(24),
  xxl: normalize(32),
  xxxl: normalize(48)
};
```

### 3.2 Spacing Application Rules
- **ALWAYS** use predefined spacing values from the spacing scale
- **NEVER** use arbitrary numbers for margins and padding
- **SCALE** spacing proportionally on different screen sizes
- **MAINTAIN** consistent spacing ratios throughout the application

---

## 4. SAFE AREA HANDLING

### 4.1 CRITICAL: SafeAreaView from react-native is DEPRECATED
React Native's built-in SafeAreaView component has been deprecated as of React Native 0.81. It was iOS-only, had limited functionality, and is incompatible with Android 15's enforced edge-to-edge rendering.

### 4.2 Required Library
**MUST USE**: `react-native-safe-area-context` library

```bash
# Installation
npm install react-native-safe-area-context
# or
yarn add react-native-safe-area-context
```

### 4.3 Setup: SafeAreaProvider (MANDATORY)
```javascript
// App.js or root component
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      {/* Your app content */}
    </SafeAreaProvider>
  );
}
```

### 4.4 Recommended Approach: useSafeAreaInsets Hook
React Navigation recommends using the useSafeAreaInsets hook instead of SafeAreaView component for consistent behavior and to avoid jumpy behavior during animations.

```javascript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function MyScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {/* Content */}
    </View>
  );
}
```

### 4.5 Alternative: SafeAreaView Component
If you prefer a component-based approach, use SafeAreaView from `react-native-safe-area-context`:

```javascript
import { SafeAreaView } from 'react-native-safe-area-context';

function MyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Content */}
    </SafeAreaView>
  );
}
```

### 4.6 Safe Area Rules
- **NEVER** import SafeAreaView from 'react-native' (deprecated)
- **ALWAYS** import from 'react-native-safe-area-context'
- **WRAP** your app root in SafeAreaProvider
- **PREFER** useSafeAreaInsets hook over SafeAreaView component for better animation performance
- **USE** `edges` prop to control which edges need insets: `['top', 'bottom', 'left', 'right']`
- **HANDLE** notches, status bars, navigation bars, and home indicators
- **TEST** on devices with different screen cutouts and edge-to-edge displays

---

## 5. DESIGN SYSTEM ARCHITECTURE

### 5.1 Centralized Theme Structure
```javascript
// theme.js - REQUIRED structure
export const theme = {
  spacing: {
    xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48
  },
  typography: {
    h1: 32, h2: 28, h3: 24, h4: 20, body: 16, bodySmall: 14, caption: 12
  },
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    error: '#FF3B30',
    success: '#34C759'
  },
  breakpoints: {
    small: 320,
    medium: 375,
    large: 414,
    tablet: 768
  },
  borderRadius: {
    sm: 4, md: 8, lg: 12, xl: 16, full: 9999
  }
};
```

### 5.2 Theme Usage Rules
- **ALWAYS** reference theme values, never hardcode
- **MAINTAIN** single source of truth for design tokens
- **EXPORT** theme for consumption across all components
- **APPLY** normalize function to all numeric theme values at runtime

---

## 6. RESPONSIVE BREAKPOINTS

### 6.1 Device Categories
```javascript
const getDeviceCategory = (width) => {
  if (width < 375) return 'small';        // Small phones
  if (width < 414) return 'medium';       // Standard phones
  if (width < 768) return 'large';        // Large phones/phablets
  return 'tablet';                        // Tablets
};
```

### 6.2 Conditional Rendering Rules
- **IMPLEMENT** different layouts for tablets vs phones
- **USE** useWindowDimensions hook for reactive sizing
- **HANDLE** orientation changes dynamically
- **TEST** both portrait and landscape orientations

### 6.3 Responsive Component Pattern
```javascript
const ResponsiveComponent = () => {
  const { width, height } = useWindowDimensions();
  const deviceCategory = getDeviceCategory(width);
  const isTablet = deviceCategory === 'tablet';
  const isLandscape = width > height;

  return (
    <View style={[
      styles.container,
      isTablet && styles.containerTablet,
      isLandscape && styles.containerLandscape
    ]}>
      {/* Adaptive content */}
    </View>
  );
};
```

---

## 7. PIXEL DENSITY HANDLING

### 7.1 PixelRatio API Usage
```javascript
import { PixelRatio } from 'react-native';

// Get device pixel density
const pixelDensity = PixelRatio.get();

// Round to nearest pixel for sharp rendering
const roundedValue = PixelRatio.roundToNearestPixel(calculateValue);
```

### 7.2 Density Rules
- **ALWAYS** use PixelRatio.roundToNearestPixel for calculated dimensions
- **TEST** on devices with varying densities (ldpi to xxxhdpi)
- **ENSURE** images are provided in multiple resolutions (@1x, @2x, @3x)
- **AVOID** blurry or pixelated assets by matching density requirements

---

## 8. TOUCH TARGET REQUIREMENTS

### 8.1 Minimum Touch Targets
- **ENFORCE** minimum 44x44 dp touch targets for all interactive elements
- **IMPLEMENT** hitSlop for small visual elements:
```javascript
<TouchableOpacity
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  style={styles.smallButton}
>
  <Icon name="close" size={20} />
</TouchableOpacity>
```

### 8.2 Touch Target Rules
- **NEVER** create interactive elements smaller than 44x44 dp
- **USE** hitSlop to expand touch areas without changing visual size
- **ENSURE** adequate spacing between adjacent touch targets (minimum 8dp)
- **TEST** touch interactions on physical devices

---

## 9. IMAGE AND ASSET HANDLING

### 9.1 Responsive Images
```javascript
// Use resizeMode for consistent scaling
<Image
  source={require('./image.png')}
  style={{ width: '100%', aspectRatio: 16/9 }}
  resizeMode="cover"
/>
```

### 9.2 Asset Rules
- **ALWAYS** use aspectRatio instead of fixed heights for images
- **PROVIDE** multiple resolution assets (@1x, @2x, @3x)
- **USE** resizeMode appropriately: 'cover', 'contain', 'stretch'
- **OPTIMIZE** image sizes for different screen densities

---

## 10. STYLE OPTIMIZATION

### 10.1 StyleSheet.create Usage
```javascript
// MANDATORY: Always use StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: theme.colors.background
  },
  // Never define styles inline
});
```

### 10.2 Styling Rules
- **ALWAYS** use StyleSheet.create for style definitions
- **NEVER** use inline styles except for dynamic values
- **EXTRACT** common styles into shared style objects
- **OPTIMIZE** by avoiding style recalculation on every render

---

## 11. ORIENTATION HANDLING

### 11.1 Orientation Detection
```javascript
const { width, height } = useWindowDimensions();
const isLandscape = width > height;
const isPortrait = height > width;
```

### 11.2 Orientation Rules
- **HANDLE** both portrait and landscape orientations
- **UPDATE** layouts dynamically when orientation changes
- **USE** useWindowDimensions for reactive orientation detection
- **TEST** critical user flows in both orientations

---

## 12. CRITICAL ANTI-PATTERNS TO AVOID

### 12.1 Forbidden Practices
❌ **NEVER** use hardcoded pixel values: `width: 300`
❌ **NEVER** design for only one screen size
❌ **NEVER** ignore safe areas and device notches
❌ **NEVER** import SafeAreaView from 'react-native' (DEPRECATED - use react-native-safe-area-context)
❌ **NEVER** use device-specific checks without fallbacks
❌ **NEVER** neglect landscape orientation
❌ **NEVER** create touch targets smaller than 44x44 dp
❌ **NEVER** use inline styles for static values
❌ **NEVER** skip PixelRatio.roundToNearestPixel for calculated values

### 12.2 Required Practices
✅ **ALWAYS** use flexbox for layouts
✅ **ALWAYS** implement scaling functions
✅ **ALWAYS** use react-native-safe-area-context (NOT the deprecated SafeAreaView from react-native)
✅ **ALWAYS** wrap app in SafeAreaProvider
✅ **ALWAYS** reference theme values
✅ **ALWAYS** test on multiple screen sizes
✅ **ALWAYS** use useWindowDimensions for reactive sizing
✅ **ALWAYS** provide multiple asset resolutions
✅ **ALWAYS** use StyleSheet.create

---

## 13. TESTING REQUIREMENTS

### 13.1 Device Testing Matrix
**MUST TEST ON:**
- Small phone (< 375px width)
- Medium phone (375-414px width)
- Large phone (> 414px width)
- Tablet (> 768px width)
- Portrait orientation
- Landscape orientation
- Devices with notches/cutouts
- Various pixel densities (xxhdpi, xxxhdpi)

### 13.2 Testing Checklist
- [ ] UI renders correctly on all device categories
- [ ] Text is readable at all screen sizes
- [ ] Touch targets are accessible and properly sized
- [ ] Safe areas are respected on all devices
- [ ] Layout adapts properly to orientation changes
- [ ] Images scale without distortion
- [ ] No content is cut off or inaccessible
- [ ] Performance is smooth across all devices

---

## 14. CODE GENERATION REQUIREMENTS

When generating React Native code, the AI system MUST:

1. **Import required dependencies:**
```javascript
import { View, Text, StyleSheet, useWindowDimensions, PixelRatio } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
```

2. **Define scaling utility:**
```javascript
const { width } = Dimensions.get('window');
const scale = width / 375;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));
```

3. **Create theme object** with spacing, typography, colors, and breakpoints

4. **Use StyleSheet.create** for all style definitions

5. **Wrap app in SafeAreaProvider** at the root level

6. **Use useSafeAreaInsets hook** for safe area handling (preferred over SafeAreaView component)

7. **Apply normalize function** to all numeric style values

8. **Use useWindowDimensions** for reactive layouts

9. **Include responsive breakpoint logic** when appropriate

10. **Ensure minimum 44x44 dp touch targets** for interactive elements

11. **Provide comments** explaining responsive design decisions

---

## 15. VALIDATION CRITERIA

Before considering any generated code complete, verify:

- ✅ No hardcoded pixel values for dimensions
- ✅ Theme system is implemented and used
- ✅ Scaling functions are defined and applied
- ✅ SafeAreaProvider wraps the app root (from react-native-safe-area-context)
- ✅ useSafeAreaInsets hook is used for safe area handling
- ✅ NO imports of SafeAreaView from 'react-native' (deprecated)
- ✅ Flexbox is used for all layouts
- ✅ Touch targets meet minimum size requirements
- ✅ StyleSheet.create is used for styles
- ✅ useWindowDimensions is used for responsive logic
- ✅ Code includes responsive breakpoint handling
- ✅ Typography uses scaled values from theme

---

## 16. EXAMPLE IMPLEMENTATION

```javascript
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, PixelRatio, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Scaling setup
const DESIGN_WIDTH = 375;
const { width: screenWidth } = Dimensions.get('window');
const scale = screenWidth / DESIGN_WIDTH;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

// Theme definition
const theme = {
  spacing: { xs: normalize(4), sm: normalize(8), md: normalize(16), lg: normalize(24) },
  typography: { h1: normalize(24), body: normalize(16) },
  colors: { primary: '#007AFF', background: '#FFFFFF', text: '#000000' }
};

const ResponsiveScreen = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isTablet = width >= 768;
  const isLandscape = width > height;

  return (
    <View 
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }
      ]}
    >
      <View style={[styles.content, isTablet && styles.contentTablet]}>
        <Text style={styles.title}>Responsive Design</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Action</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ResponsiveScreen />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentTablet: {
    padding: theme.spacing.lg,
    maxWidth: 600,
    alignSelf: 'center'
  },
  title: {
    fontSize: theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.md
  },
  button: {
    minHeight: normalize(44), // Minimum touch target
    minWidth: normalize(44),
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: theme.typography.body,
    color: '#FFFFFF'
  }
});

export default App;
```

---

## COMPLIANCE STATEMENT

All React Native code generated by AI systems MUST fully comply with these guidelines. Non-compliant code should be rejected and regenerated according to these specifications. These guidelines represent industry best practices for responsive React Native development and must be treated as mandatory requirements.