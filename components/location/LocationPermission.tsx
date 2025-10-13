import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { requestPermissions } from '@/services/locationService';
import Theme from '@/constants/theme';
import { mediumHaptic, errorHaptic } from '@/utils/haptics';

interface LocationPermissionProps {
  onPermissionGranted: () => void;
  onPermissionDenied: () => void;
}

export default function LocationPermission({
  onPermissionGranted,
  onPermissionDenied,
}: LocationPermissionProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [showSettingsPrompt, setShowSettingsPrompt] = useState(false);

  const handleRequestPermission = async () => {
    mediumHaptic();
    setIsRequesting(true);
    try {
      const granted = await requestPermissions();
      
      if (granted) {
        onPermissionGranted();
      } else {
        // Permission denied, show settings prompt
        errorHaptic();
        setShowSettingsPrompt(true);
        onPermissionDenied();
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      errorHaptic();
      setShowSettingsPrompt(true);
      onPermissionDenied();
    } finally {
      setIsRequesting(false);
    }
  };

  const handleOpenSettings = () => {
    mediumHaptic();
    Linking.openSettings();
  };

  if (showSettingsPrompt) {
    return (
      <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
        <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.iconContainer}>
          <Ionicons name="location-outline" size={80} color={Theme.colors.error[500]} />
        </Animated.View>
        
        <Animated.Text entering={FadeInDown.duration(400).delay(200)} style={styles.title}>
          Location Access Denied
        </Animated.Text>
        
        <Animated.Text entering={FadeInDown.duration(400).delay(300)} style={styles.description}>
          To discover amazing attractions near you, we need access to your location.
          Please enable location permissions in your device settings.
        </Animated.Text>

        <Animated.View entering={FadeInDown.duration(400).delay(400)} style={{ width: '100%' }}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleOpenSettings}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Open Settings"
            accessibilityHint="Opens device settings to enable location permissions"
          >
            <Ionicons name="settings-outline" size={20} color={Theme.colors.text.inverse} />
            <Text style={styles.primaryButtonText}>Open Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleRequestPermission}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Try Again"
            accessibilityHint="Requests location permission again"
          >
            <Text style={styles.secondaryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.iconContainer}>
        <Ionicons name="location" size={80} color={Theme.colors.primary[500]} />
      </Animated.View>
      
      <Animated.Text entering={FadeInDown.duration(400).delay(200)} style={styles.title}>
        Discover Istanbul
      </Animated.Text>
      
      <Animated.Text entering={FadeInDown.duration(400).delay(300)} style={styles.description}>
        We need your location to show you the best attractions in your current district.
        Your location data stays private and is only used to enhance your experience.
      </Animated.Text>

      <Animated.View entering={FadeInDown.duration(400).delay(400)} style={styles.featureList}>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={24} color={Theme.colors.success[500]} />
          <Text style={styles.featureText}>Find nearby attractions</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={24} color={Theme.colors.success[500]} />
          <Text style={styles.featureText}>Calculate walking distances</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={24} color={Theme.colors.success[500]} />
          <Text style={styles.featureText}>Get personalized recommendations</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(400).delay(500)} style={{ width: '100%' }}>
        <TouchableOpacity
          style={[styles.primaryButton, isRequesting && styles.buttonDisabled]}
          onPress={handleRequestPermission}
          disabled={isRequesting}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Enable Location"
          accessibilityHint="Requests permission to access your location"
        >
          <Ionicons name="navigate" size={20} color={Theme.colors.text.inverse} />
          <Text style={styles.primaryButtonText}>
            {isRequesting ? 'Requesting...' : 'Enable Location'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.privacyNote}>
          Your privacy matters. We never share your location data.
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.background,
  },
  iconContainer: {
    marginBottom: Theme.spacing.xl,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.full,
  },
  title: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.base,
    textAlign: 'center',
  },
  description: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.sm,
  },
  featureList: {
    width: '100%',
    marginBottom: Theme.spacing['2xl'],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.base,
    paddingHorizontal: Theme.spacing.sm,
    minHeight: Theme.accessibility.minTouchTarget / 1.5,
  },
  featureText: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.text.primary,
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary[500],
    paddingVertical: Theme.spacing.base,
    paddingHorizontal: Theme.spacing['2xl'],
    borderRadius: Theme.borderRadius.md,
    width: '100%',
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    ...Theme.shadows.md,
  },
  primaryButtonText: {
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semibold,
    marginLeft: Theme.spacing.sm,
  },
  secondaryButton: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.base,
    marginBottom: Theme.spacing.base,
    minHeight: Theme.accessibility.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Theme.colors.primary[500],
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  privacyNote: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
});
