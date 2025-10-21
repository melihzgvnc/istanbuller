# Building with AdMob

## The Problem

You're seeing this error:
```
TurboModuleRegistry.getEnforcing(...): 'RNGoogleMobileAdsModule' could not be found
```

This happens because **AdMob requires native code** and doesn't work with Expo Go.

## Solutions

### Option 1: Build a Development Client (Recommended)

This creates a custom version of your app with AdMob included.

#### Prerequisites
1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

#### Build for Android
```bash
eas build --profile development --platform android
```

This will:
- Build an APK with AdMob support
- Take 10-20 minutes
- Give you a download link when done

Install the APK on your Android device or emulator, then run:
```bash
npx expo start --dev-client
```

#### Build for iOS
```bash
eas build --profile development --platform ios
```

Requirements:
- Apple Developer account ($99/year)
- iOS device or simulator

### Option 2: Test Without AdMob (Quick)

If you just want to test other features without ads:

1. Comment out AdMob initialization in `app/_layout.tsx`:
```typescript
// useEffect(() => {
//   const initializeAdMob = async () => {
//     ...
//   };
//   initializeAdMob();
// }, []);
```

2. Remove any AdMob components from your screens

3. Run normally:
```bash
npm start
```

### Option 3: Build for Production

When you're ready to publish:

```bash
# Android
eas build --platform android --profile production

# iOS
eas build --platform ios --profile production
```

## Current Status

✅ **AdMob is configured** in your app.json and AdConfig.ts
⚠️ **Native build required** to test ads
🔧 **App won't crash** - AdMob initialization is now wrapped in error handling

## Testing Ads

### In Development Build
- Test ads will show automatically (see ADMOB_CONFIGURATION.md)
- Your real ad unit IDs are configured but won't be used in dev mode

### In Production Build
- Your real ad unit IDs will be used
- Ads may take 24 hours to start showing for new ad units

## Quick Start Commands

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build development client for Android
eas build --profile development --platform android

# After installing the APK, start the dev server
npx expo start --dev-client
```

## Need Help?

- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [AdMob with Expo](https://docs.expo.dev/versions/latest/sdk/admob/)

## What Works Now

Even without a custom build, your app will:
- ✅ Run in Expo Go (without ads)
- ✅ Show all other features
- ✅ Not crash due to missing AdMob module
- ⚠️ Show a warning in console about AdMob not being available
