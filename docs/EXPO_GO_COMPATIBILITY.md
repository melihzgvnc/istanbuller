# Expo Go Compatibility Fix

## Problems Fixed

### 1. AdMob Module Not Available
The app was crashing in Expo Go because AdMob (`react-native-google-mobile-ads`) requires native code and doesn't work with Expo Go. The app was trying to import AdMob modules at the top level, causing immediate crashes.

### 2. Invalid JSON with require() Statements
The `attractions.json` file was using JavaScript `require()` statements for images, which is invalid JSON syntax and caused Metro bundler errors.

## Solutions

### AdMob Conditional Loading
Updated the code to conditionally import and use AdMob only when it's available:

### Files Changed

1. **app/_layout.tsx**
   - Changed from static import to dynamic `require()` with try-catch
   - AdMob initialization only runs if the module is available
   - Graceful fallback with informative console messages

2. **components/ads/BannerAd.tsx**
   - Conditionally imports `BannerAd` and `BannerAdSize` using try-catch
   - Shows fallback UI when AdMob is not available
   - Returns `null` if `showFallback` is false and AdMob is unavailable

3. **hooks/useInterstitialAd.ts**
   - Conditionally imports `InterstitialAd` and `AdEventType`
   - Automatically disables the hook when AdMob is not available
   - All ad operations are no-ops when running in Expo Go

### Data File Format Fix
Fixed `attractions.json` to use proper JSON format with string paths:
- Kept as `.json` file (not TypeScript)
- Image paths stored as strings (e.g., `"../assets/images/attractions/hagiasophia.jpg"`)
- Created `AttractionImages.ts` with static mapping of filenames to `require()` module IDs
- `attractionService.ts` uses `getAttractionImage()` to convert paths to module IDs
- Follows the same pattern as `districts.json` → `DistrictMetadata.ts`

### Image Loading Fix
Updated code to handle local images properly:
- `attractions.json` stores image paths as strings
- `attractionService.ts` converts paths to `require()` module IDs when loading data
- `Attraction` type accepts `imageUrl: string | number` (string for URLs, number for local images)
- `OptimizedImage` component handles both formats
- Components pass imageUrl directly (not wrapped in `{ uri: ... }`)

### Image Preloading Fix
Updated image preloading to handle local bundled images:
- `imageUtils.ts` now filters out local images (numbers) before preloading
- Only remote images (strings) are preloaded via `Image.prefetch()`
- Local bundled images don't need preloading - they're already in the bundle
- Prevents `uri.trim is not a function` error

## How It Works

### In Expo Go (Development)
- AdMob modules fail to load (caught by try-catch)
- App continues running normally without ads
- Console shows: "AdMob not available - running in Expo Go"
- Banner ads show fallback UI or nothing
- Interstitial ads are silently disabled

### In Custom Dev Build / Production
- AdMob modules load successfully
- Ads work normally as configured
- Full ad functionality is available

## Testing

### Test in Expo Go
```bash
npm start
# Scan QR code with Expo Go app
```
Expected: App runs without crashes, no ads shown

### Test with Custom Dev Build
```bash
eas build --profile development --platform android
# Install the APK and test
```
Expected: App runs with ads working normally

## Benefits

✅ Works in Expo Go for quick testing
✅ Works in custom dev builds with full ad support
✅ No code changes needed when switching between environments
✅ Graceful degradation - app never crashes due to missing AdMob
✅ Clear console messages about AdMob availability

## Notes

- AdMob will NEVER work in Expo Go - this is a platform limitation
- For production builds, AdMob will work normally
- The fallback UI shows "Advertisement" text when ads can't load
- All ad-related errors are caught and logged, never crashing the app
