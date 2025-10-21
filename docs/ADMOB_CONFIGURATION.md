# AdMob Configuration Guide

## Understanding Development vs Production Ad IDs

### Why You See Test Ad IDs in Development

When running your app in development mode (using `npm start` or `expo start`), you will **always** see test ad unit IDs in the logs like:
```
ca-app-pub-3940256099942544/6300978111
```

**This is intentional and correct!** Here's why:

1. **Prevents Invalid Traffic**: Google AdMob prohibits clicking your own ads. Using test IDs in development prevents accidental policy violations.
2. **Protects Your Account**: Invalid traffic can lead to account suspension.
3. **Safe Testing**: Test ads look and behave like real ads but don't affect your revenue or metrics.

### When Your Real Ad IDs Are Used

Your real ad unit IDs (the ones starting with `ca-app-pub-8146248774141593`) will **only** be used when:
- You build a production/release version of your app
- You publish to the App Store or Google Play Store
- Users download and use your published app

## Current Configuration Status

### ✅ Android - Configured
- App ID: `ca-app-pub-8146248774141593~9560062378`
- Banner Ad Unit: `ca-app-pub-8146248774141593/4938678125`
- Interstitial Ad Unit: `ca-app-pub-8146248774141593/2333336710`

### ⚠️ iOS - Needs Your Real IDs
Currently using Google's test IDs. You need to:

1. Go to your [AdMob Console](https://apps.admob.com/)
2. Find your iOS app
3. Copy your iOS App ID and Ad Unit IDs
4. Update these files:
   - `constants/AdConfig.ts` - Update the iOS entries
   - `app.json` - Update the `ios_app_id` field

## How to Update iOS Configuration

### Step 1: Update AdConfig.ts

Replace the iOS IDs in `constants/AdConfig.ts`:

```typescript
export const ADMOB_APP_IDS = {
  ios: "ca-app-pub-YOUR_IOS_APP_ID~XXXXXXXXXX", // Your iOS App ID
  android: "ca-app-pub-8146248774141593~9560062378",
} as const;

export const BANNER_AD_UNIT_IDS = {
  ios: "ca-app-pub-YOUR_IOS_APP_ID/XXXXXXXXXX", // Your iOS Banner Ad Unit ID
  android: "ca-app-pub-8146248774141593/4938678125",
} as const;

export const INTERSTITIAL_AD_UNIT_IDS = {
  ios: "ca-app-pub-YOUR_IOS_APP_ID/XXXXXXXXXX", // Your iOS Interstitial Ad Unit ID
  android: "ca-app-pub-8146248774141593/2333336710",
} as const;
```

### Step 2: Update app.json

Replace the iOS App ID in `app.json`:

```json
{
  "plugins": [
    [
      "react-native-google-mobile-ads",
      {
        "android_app_id": "ca-app-pub-8146248774141593~9560062378",
        "ios_app_id": "ca-app-pub-YOUR_IOS_APP_ID~XXXXXXXXXX",
        "delay_app_measurement_init": true
      }
    ]
  ]
}
```

## Testing Your Configuration

### In Development
```bash
npm start
```
You should see logs like:
```
[AdMob] Using TEST ad unit ID for banner (development mode)
```

### For Production Testing
Build a release version:
```bash
# Android
eas build --platform android --profile production

# iOS
eas build --platform ios --profile production
```

## Troubleshooting

### "I updated the IDs but still see test IDs in logs"
- This is normal in development mode! Test IDs are used intentionally.
- Your real IDs will only be used in production builds.

### "No ads are showing"
- In development: Make sure you're using test ad unit IDs (automatic)
- In production: Verify your real ad unit IDs are correct
- New ad units can take a few hours to become active

### "Invalid ad unit ID error"
- Check that you copied the full ID including the `~` or `/` character
- Verify the ID matches exactly what's in your AdMob console
- Make sure you're using the correct platform's ID (iOS vs Android)

## Important Notes

⚠️ **Never click your own ads in production!** This violates AdMob policies.

✅ **Always test with test ad IDs** during development (handled automatically).

📱 **Platform-specific IDs**: iOS and Android have different ad unit IDs - don't mix them up!

🕐 **New ad units**: Can take up to 24 hours to start serving ads after creation.
