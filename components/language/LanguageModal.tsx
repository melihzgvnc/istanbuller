import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Accessibility } from '@/constants/theme';
import * as Haptics from 'expo-haptics';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguageModal({ visible, onClose }: LanguageModalProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = async (lang: Language) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await setLanguage(lang);
    // Close modal after a short delay to show selection
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleBackdropPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <View style={styles.modalContainer}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('tab.language')}</Text>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Language Options */}
              <View style={styles.languageList}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageItem,
                      language === lang.code && styles.languageItemActive,
                    ]}
                    onPress={() => handleLanguageChange(lang.code)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.flag}>{lang.flag}</Text>
                    <View style={styles.languageInfo}>
                      <Text
                        style={[
                          styles.languageName,
                          language === lang.code && styles.languageNameActive,
                        ]}
                      >
                        {lang.nativeName}
                      </Text>
                      <Text
                        style={[
                          styles.languageSubtext,
                          language === lang.code && styles.languageSubtextActive,
                        ]}
                      >
                        {lang.name}
                      </Text>
                    </View>
                    {language === lang.code && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Platform.select({
      ios: Shadows.lg,
      android: { elevation: 8 },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  closeButton: {
    width: Accessibility.minTouchTarget,
    height: Accessibility.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.full,
  },
  closeButtonText: {
    fontSize: Typography.fontSize.xl,
    color: Colors.text.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  languageList: {
    padding: Spacing.base,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: Accessibility.minTouchTarget,
  },
  languageItemActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  flag: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  languageNameActive: {
    color: Colors.primary[700],
  },
  languageSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  languageSubtextActive: {
    color: Colors.primary[600],
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
