# Play Store Data Safety Declaration Guide

## Overview
This guide helps you fill out the Data Safety section in Google Play Console for Istanbuller.

## Main Questions

### 1. Does your app collect or share any of the required user data types?
**Answer: YES**

### 2. Is all of the user data collected by your app encrypted in transit?
**Answer: YES**
- Location data is processed locally (not transmitted over network)
- Any network communication uses HTTPS encryption
- AdMob uses encrypted connections

---

## Data Types to Declare

### Location Data

**Data Type:** Location
- ✅ Precise location
- ❌ Approximate location (don't check this - when you request fine location, you only declare precise)

**Is this data collected, shared, or both?**
- ✅ Collected

**Is this data processed ephemerally?**
- ✅ YES
- Explanation: Location is used in real-time to determine current district and show nearby attractions. It's not stored permanently.

**Is this data required for your app, or can users choose whether it's collected?**
- ✅ Users can choose whether this data is collected
- Note: Users can deny location permission and manually select districts

**Why is this user data collected?**
- ✅ App functionality
- Explanation: To determine user's current district in Istanbul and show relevant nearby attractions

**Is this data shared with third parties?**
- ❌ NO

---

### App Activity (AdMob)

**Data Type:** App interactions
- ✅ App interactions (ad impressions, clicks)

**Is this data collected, shared, or both?**
- ✅ Collected
- ✅ Shared

**Is this data processed ephemerally?**
- ❌ NO

**Is this data required for your app?**
- ✅ Users can choose whether this data is collected
- Note: This is collected by AdMob SDK

**Why is this user data collected?**
- ✅ Advertising or marketing
- ✅ Analytics

**Is this data shared with third parties?**
- ✅ YES
- Third party: Google AdMob

---

### Device or Other IDs (AdMob)

**Data Type:** Device or other IDs
- ✅ Advertising ID

**Is this data collected, shared, or both?**
- ✅ Collected
- ✅ Shared

**Is this data processed ephemerally?**
- ❌ NO

**Is this data required for your app?**
- ✅ Users can choose whether this data is collected

**Why is this user data collected?**
- ✅ Advertising or marketing

**Is this data shared with third parties?**
- ✅ YES
- Third party: Google AdMob

---

## Summary Table

| Data Type | Collected | Shared | Ephemeral | Required | Purpose |
|-----------|-----------|--------|-----------|----------|---------|
| Location (Precise) | ✅ | ❌ | ✅ | Optional | App functionality |
| App interactions | ✅ | ✅ | ❌ | Optional | Advertising |
| Advertising ID | ✅ | ✅ | ❌ | Optional | Advertising |

---

## Important Notes

1. **Location is ephemeral**: Your app doesn't store location data permanently. It's only used in real-time to determine the current district.

2. **No personal identification**: You don't collect names, emails, phone numbers, or any personal identifiers.

3. **AdMob data**: If you're using AdMob, you must declare the advertising ID and app interactions data.

4. **Users can opt out**: Users can deny location permissions and still use the app with manual district selection.

5. **Encryption**: All data transmitted over network uses HTTPS encryption.

---

## Additional Play Console Settings

### Target Audience
- **Target age group**: All ages (tourist app)
- **Appeals to children**: NO (unless you specifically target children)

### Content Rating
- Fill out the questionnaire honestly
- Likely rating: Everyone or Everyone 10+

### App Access
- **Special access**: None required
- **Restrictions**: None

### Ads
- **Contains ads**: YES (if using AdMob)
- **Ad format**: Banner ads, Interstitial ads (based on your implementation)

---

## Privacy Policy URL

Make sure you've added your privacy policy URL in:
1. Play Console → Store presence → Privacy policy
2. Your app.json file (already done)

---

## Testing Before Submission

Before submitting, verify:
- ✅ Privacy policy URL is accessible
- ✅ Location permission dialog shows correct message
- ✅ App works without location permission (manual selection)
- ✅ AdMob ads display correctly (if implemented)
- ✅ No crashes or critical bugs

---

## Common Mistakes to Avoid

❌ Don't say location data is "required" if users can use manual selection
❌ Don't forget to declare AdMob data collection
❌ Don't say data is encrypted if you're not sure
❌ Don't claim data is ephemeral if you store it in AsyncStorage permanently

✅ Be honest and accurate
✅ Match your privacy policy with your declarations
✅ Test all functionality before submitting
