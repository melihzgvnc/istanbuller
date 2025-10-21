# Large Image Crash Fix

## Problem
The app was crashing silently when selecting Balat or Rumeli Hisarı districts in Expo Go. No error messages were shown in the terminal.

## Root Cause
The crash was caused by **oversized image files** that exceeded Expo Go's memory limits:
- `balathouses.jpg`: 4.5 MB
- `rumelifortress.jpg`: 4.1 MB

When the app tried to render these large images, Expo Go crashed at the native level (expo-image component), which React couldn't catch with error boundaries.

## Solution

### Temporary Workaround (Current)
Added a fallback mechanism in `constants/AttractionImages.ts` that uses a smaller image (Hagia Sophia) for these problematic images:

```typescript
// Temporary workaround: Use fallback for problematic large images
const problematicImages = ['balathouses.jpg', 'rumelifortress.jpg'];
if (problematicImages.includes(filename)) {
  console.warn(`Using fallback for large image: ${filename}`);
  return ATTRACTION_IMAGES['hagiasophia.jpg'];
}
```

### Permanent Solution (Recommended)
Compress the oversized images to under 2MB each:

1. **Using Online Tools:**
   - https://tinyjpg.com/
   - https://squoosh.app/

2. **Using ImageMagick:**
   ```bash
   convert balathouses.jpg -quality 85 -resize 1920x1920\> balathouses_compressed.jpg
   convert rumelifortress.jpg -quality 85 -resize 1920x1920\> rumelifortress_compressed.jpg
   ```

3. **Target Specifications:**
   - Max file size: 2MB
   - Max dimensions: 1920x1920px
   - Quality: 80-85%
   - Format: JPEG

### After Compression
1. Replace the original files with compressed versions
2. Remove the temporary workaround from `AttractionImages.ts`
3. Test in Expo Go to ensure no crashes

## Prevention
To prevent similar issues in the future:

1. **Image Size Guidelines:**
   - Keep all attraction images under 2MB
   - Recommended dimensions: 1200x800px or 1920x1080px
   - Use JPEG format with 80-85% quality

2. **Pre-commit Check:**
   Consider adding a script to check image sizes before committing:
   ```bash
   find assets/images -type f -size +2M
   ```

## Files Modified
- `constants/AttractionImages.ts` - Added temporary fallback logic
- `components/attractions/DistanceBadge.tsx` - Added safety check for undefined distance
- Removed all debug console.log statements added during investigation

## Testing
✅ Balat district now loads without crashing
✅ Rumeli Hisarı district now loads without crashing
✅ Other districts continue to work normally
⚠️ Balat and Rumeli Hisarı currently show Hagia Sophia image (temporary)

## Next Steps
1. Compress `balathouses.jpg` and `rumelifortress.jpg`
2. Replace original files with compressed versions
3. Remove fallback workaround
4. Test in Expo Go
5. Verify correct images display for both districts
