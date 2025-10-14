# Apostrophe Character Fix

## Issue
The Princes' Islands attraction was not showing up in the app even though it existed in `attractions.json`.

## Root Cause
The district name in the JSON file used a **curly/smart apostrophe** (Unicode character 8217: `'`) instead of a **straight apostrophe** (Unicode character 39: `'`).

This caused a mismatch with the TypeScript enum which uses straight apostrophes:
```typescript
PRINCES_ISLANDS = "Princes' Islands"  // Character 39
```

## Fix Applied
Replaced all curly apostrophes with straight apostrophes in `attractions.json`:
- Before: `Princes' Islands` (char 8217)
- After: `Princes' Islands` (char 39)

## Command Used
```powershell
$content = Get-Content attractions.json -Raw -Encoding UTF8
$content = $content -replace [char]8217,[char]39
Set-Content attractions.json $content -NoNewline -Encoding UTF8
```

## Verification
```javascript
const pi = data.attractions.find(a => a.id === 'princes-islands');
console.log([...pi.district].map(c => c.charCodeAt(0)));
// Now shows: 80,114,105,110,99,101,115,39,32,73,115,108,97,110,100,115
//                                      ^^
//                                      39 (correct!)
```

## Prevention
When editing JSON files:
- Use straight quotes/apostrophes (`'` and `"`)
- Avoid copying text from word processors that use smart quotes
- Configure your editor to use straight quotes

## Impact
Princes' Islands attraction now displays correctly in the app when users select that district.
