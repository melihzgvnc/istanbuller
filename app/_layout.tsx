import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Keep the splash screen visible while we initialize
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

// Conditionally import AdMob only if available (not in Expo Go)
let mobileAds: any = null;
try {
  mobileAds = require("react-native-google-mobile-ads").default;
} catch (error) {
  console.log("AdMob not available - running in Expo Go or module not installed");
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Initialize app and hide splash screen
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize AdMob SDK only if available
        if (mobileAds) {
          try {
            await mobileAds().initialize();
            console.log("AdMob SDK initialized successfully");
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.warn("AdMob initialization failed:", errorMessage);
          }
        } else {
          console.log("Skipping AdMob initialization - not available in this environment");
        }
      } catch (error) {
        console.error("App initialization error:", error);
      } finally {
        // Hide splash screen after initialization
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <LanguageProvider>
          <AppProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack
                screenOptions={{
                  animation: "slide_from_right",
                  animationDuration: 250,
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="attraction/[id]"
                  options={{
                    headerShown: false,
                    presentation: "card",
                    animation: "slide_from_right",
                  }}
                />
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal", title: "Modal" }}
                />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </AppProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
