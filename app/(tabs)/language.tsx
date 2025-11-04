import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createSafeAreaStyle } from '@/utils/styleUtils';

// This is a placeholder screen for the language tab
// The actual language selection is handled by a modal in _layout.tsx
export default function LanguageScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, createSafeAreaStyle(insets)]} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
