# Quick Test Guide - Manual District Selection

This is a quick reference guide for testing the manual district selection feature. For comprehensive testing, see `MANUAL_DISTRICT_SELECTION_TEST_PLAN.md`.

## Prerequisites

- Device or emulator with location services
- App installed and running
- Ability to change GPS coordinates (for emulator) or move physically (for device)

## Quick Test Scenarios

### ✅ Test 1: Basic Manual Selection (2 minutes)

**Goal:** Verify manual selection works

1. Set location outside all districts (e.g., 41.1000, 29.1000)
2. Launch app
3. See "We couldn't detect your district" message
4. Tap "Choose District Manually"
5. Select "Sultanahmet"
6. Verify attractions appear

**Expected:** ✅ Manual selection works, attractions display

---

### ✅ Test 2: Persistence (1 minute)

**Goal:** Verify selection persists

1. With manual selection active (from Test 1)
2. Force close app (swipe away from recent apps)
3. Relaunch app

**Expected:** ✅ Still shows "Sultanahmet (Manual)" and attractions

---

### ✅ Test 3: Clear Selection (1 minute)

**Goal:** Verify can clear manual selection

1. With manual selection active
2. Tap the "Sultanahmet (Manual)" indicator in header
3. Verify it clears

**Expected:** ✅ Returns to "We couldn't detect your district" prompt

---

### ✅ Test 4: Auto-Detection Notification (2 minutes)

**Goal:** Verify notification when entering district

1. Manually select "Beyoğlu"
2. Change location to inside Sultanahmet (41.0082, 28.9784)
3. Wait 10-30 seconds for location update
4. See alert: "You're now in Sultanahmet..."

**Expected:** ✅ Notification appears with "Switch to Auto" and "Keep Manual" options

---

### ✅ Test 5: Explore Tab (1 minute)

**Goal:** Verify Explore tab works

1. Tap "Explore" tab at bottom
2. See all 8 districts
3. Tap "Kadıköy" card
4. See Kadıköy attractions

**Expected:** ✅ Can browse all districts independently

---

## GPS Coordinates for Testing

Use these coordinates to test different scenarios:

### Outside All Districts
- **Coordinates:** 41.1000, 29.1000
- **Use for:** Testing manual selection prompt

### Inside Sultanahmet
- **Coordinates:** 41.0082, 28.9784
- **Use for:** Testing auto-detection

### Inside Beyoğlu
- **Coordinates:** 41.0370, 28.9850
- **Use for:** Testing district switching

### Inside Beşiktaş
- **Coordinates:** 41.0422, 29.0089
- **Use for:** Testing multiple district notifications

## How to Change GPS on Emulator

### Android Emulator
1. Click the "..." (Extended controls) button
2. Go to "Location"
3. Enter latitude and longitude
4. Click "Send"

### iOS Simulator
1. Debug → Location → Custom Location
2. Enter latitude and longitude
3. Click OK

## Common Issues & Solutions

### Issue: "We couldn't detect your district" doesn't appear
**Solution:** Make sure you're using coordinates outside all districts (41.1000, 29.1000)

### Issue: Manual selection doesn't persist
**Solution:** Check AsyncStorage is working. Try clearing app data and testing again.

### Issue: Notification doesn't appear when entering district
**Solution:** Wait 30-60 seconds for location update. Location updates are throttled to 100m changes.

### Issue: Explore tab doesn't show districts
**Solution:** Check that `DistrictMetadata.ts` is properly imported and `getAllDistricts()` returns data.

## Quick Verification Checklist

Run through this checklist in 5 minutes:

- [ ] Can manually select a district when outside boundaries
- [ ] Manual selection persists after app restart
- [ ] Can clear manual selection
- [ ] Notification appears when entering district with manual selection
- [ ] Explore tab shows all districts
- [ ] Can view attractions for any district from Explore tab
- [ ] Distances show correctly (from district center when manual)
- [ ] UI is responsive and smooth

## Pass/Fail Criteria

**PASS:** All 5 quick tests pass ✅

**FAIL:** Any test fails ❌ → See detailed test plan for debugging

## Next Steps After Quick Test

If quick tests pass:
1. Run full test plan (`MANUAL_DISTRICT_SELECTION_TEST_PLAN.md`)
2. Test error scenarios (GPS timeout, permissions, etc.)
3. Test accessibility features
4. Get user acceptance testing

If quick tests fail:
1. Document the failure
2. Check implementation against checklist
3. Review error logs
4. Fix issues and retest

---

**Estimated Time:** 5-10 minutes for quick tests

**For Detailed Testing:** See `MANUAL_DISTRICT_SELECTION_TEST_PLAN.md`

