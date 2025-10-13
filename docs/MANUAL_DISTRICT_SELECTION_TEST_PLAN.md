# Manual District Selection - Test Verification Plan

This document provides a comprehensive test plan for verifying the manual district selection feature implementation.

## Overview

The manual district selection feature allows users to manually choose a district when automatic GPS-based detection fails or when they're outside district boundaries. This test plan covers all scenarios outlined in the requirements.

---

## Test Environment Setup

### Prerequisites
1. Physical device or emulator with location services
2. Ability to mock/change GPS coordinates
3. App installed with latest build
4. Location permissions granted

### Test Data
- **Valid Districts**: Sultanahmet, Beyoğlu, Beşiktaş, Kadıköy, Üsküdar, Ortaköy, Eminönü, Karaköy
- **Test Coordinates**:
  - Inside Sultanahmet: 41.0082, 28.9784
  - Inside Beyoğlu: 41.0370, 28.9850
  - Outside all districts: 41.1000, 29.1000

---

## 9.1 Manual Selection Flow End-to-End

### Test Case 1.1: Manual Selection When Outside Boundaries

**Requirements**: 1.1, 1.2, 1.3

**Steps**:
1. Set device location to coordinates outside all district boundaries (e.g., 41.1000, 29.1000)
2. Launch the app
3. Grant location permissions if prompted
4. Wait for location detection to complete

**Expected Results**:
- ✓ App detects location but no district is found
- ✓ DistrictSelectionPrompt appears with message "We couldn't detect your district"
- ✓ Two buttons are visible: "Choose District Manually" and "Retry Location"
- ✓ No attractions are displayed

**Steps (continued)**:
5. Tap "Choose District Manually"
6. Verify DistrictPicker modal appears
7. Select "Sultanahmet" from the list
8. Verify modal closes

**Expected Results**:
- ✓ DistrictPicker modal opens with smooth animation
- ✓ All 8 districts are listed with descriptions and landmarks
- ✓ Sultanahmet is highlighted after selection
- ✓ Modal closes after selection
- ✓ ManualSelectionIndicator appears in header showing "Sultanahmet (Manual)"
- ✓ Attractions for Sultanahmet are displayed
- ✓ Distances are calculated from Sultanahmet center, not user location

### Test Case 1.2: Distance Calculation with Manual Selection

**Requirements**: 3.2

**Steps**:
1. Continue from Test Case 1.1 (manual selection active)
2. Observe the distance values on attraction cards

**Expected Results**:
- ✓ All distances are calculated from Sultanahmet district center (41.0082, 28.9784)
- ✓ Distances are reasonable for Sultanahmet attractions (should be < 2km for most)
- ✓ Attractions are sorted by distance from district center

**Verification**:
- Compare distances with actual map distances from Sultanahmet center
- Verify sorting order matches distance values

### Test Case 1.3: Manual Selection Persistence

**Requirements**: 1.4

**Steps**:
1. Continue from Test Case 1.1 (Sultanahmet manually selected)
2. Force close the app completely
3. Relaunch the app
4. Wait for app to initialize

**Expected Results**:
- ✓ App remembers manual selection
- ✓ ManualSelectionIndicator shows "Sultanahmet (Manual)"
- ✓ Sultanahmet attractions are displayed immediately
- ✓ No DistrictSelectionPrompt appears
- ✓ Distances still calculated from district center

**Steps (continued)**:
5. Tap the ManualSelectionIndicator to clear selection
6. Verify selection is cleared
7. Force close and relaunch app

**Expected Results**:
- ✓ Manual selection is cleared from storage
- ✓ App returns to auto-detection mode
- ✓ DistrictSelectionPrompt appears again (since still outside boundaries)

---

## 9.2 Auto-Detection Override Notification

### Test Case 2.1: Notification When Entering District

**Requirements**: 3.4

**Steps**:
1. Set device location outside all districts
2. Launch app and manually select "Beyoğlu"
3. Verify manual selection is active
4. Change device location to inside Sultanahmet boundaries (41.0082, 28.9784)
5. Wait for location update (may take 10-30 seconds)

**Expected Results**:
- ✓ Alert/notification appears with message: "You're now in Sultanahmet. Would you like to switch to automatic detection?"
- ✓ Two options are presented: "Keep Manual" and "Switch to Auto"
- ✓ Manual selection (Beyoğlu) remains active until user chooses
- ✓ Notification only appears once per district entry

### Test Case 2.2: Switch to Auto-Detection

**Requirements**: 3.4

**Steps**:
1. Continue from Test Case 2.1 (notification showing)
2. Tap "Switch to Auto" button

**Expected Results**:
- ✓ Manual selection is cleared
- ✓ ManualSelectionIndicator disappears
- ✓ District changes to "Sultanahmet" (auto-detected)
- ✓ Header subtitle shows "Sultanahmet" without "(Manual)" indicator
- ✓ Distances recalculate based on user's actual location
- ✓ Attractions may reorder based on new distance calculations

### Test Case 2.3: Keep Manual Selection

**Requirements**: 3.4

**Steps**:
1. Repeat Test Case 2.1 setup
2. When notification appears, tap "Keep Manual"

**Expected Results**:
- ✓ Manual selection (Beyoğlu) remains active
- ✓ ManualSelectionIndicator still shows "Beyoğlu (Manual)"
- ✓ Attractions remain Beyoğlu attractions
- ✓ Notification dismisses
- ✓ Notification does NOT appear again for Sultanahmet (until manual selection is cleared and reactivated)

### Test Case 2.4: Notification Persistence

**Requirements**: 3.4

**Steps**:
1. Continue from Test Case 2.3 (kept manual selection)
2. Move to a different district (e.g., Beşiktaş coordinates)
3. Wait for location update

**Expected Results**:
- ✓ New notification appears for Beşiktaş
- ✓ Notification shows: "You're now in Beşiktaş. Would you like to switch to automatic detection?"
- ✓ User can choose to switch or keep manual selection again

---

## 9.3 Explore Tab Functionality

### Test Case 3.1: Browse All Districts

**Requirements**: 4.1, 4.2

**Steps**:
1. Launch app (any location state)
2. Navigate to "Explore" tab
3. Observe the district list

**Expected Results**:
- ✓ Explore tab is accessible from bottom navigation
- ✓ All 8 districts are displayed in a grid/list
- ✓ Each district shows:
  - District name
  - Description
  - Key landmarks or attraction count
  - Visual representation (icon/image)
- ✓ Districts are displayed regardless of user's location
- ✓ Districts are displayed regardless of Home tab state

### Test Case 3.2: Navigate to District Details

**Requirements**: 4.3

**Steps**:
1. From Explore tab, tap on "Kadıköy" district card
2. Observe the district detail view

**Expected Results**:
- ✓ Navigation to district detail view occurs
- ✓ District name "Kadıköy" is displayed prominently
- ✓ District description and landmarks are shown
- ✓ List of attractions for Kadıköy is displayed
- ✓ Attractions show distance from Kadıköy center
- ✓ Can tap on attractions to view details

### Test Case 3.3: View Attractions for Each District

**Requirements**: 4.3

**Steps**:
1. From Explore tab, visit each district one by one
2. For each district, verify attractions are displayed

**Expected Results**:
- ✓ Each district shows its specific attractions
- ✓ Attractions are relevant to the selected district
- ✓ Distance calculations use district center as reference
- ✓ Attraction details are accessible by tapping

### Test Case 3.4: Independence from Home Tab

**Requirements**: 4.4

**Steps**:
1. On Home tab, manually select "Sultanahmet"
2. Navigate to Explore tab
3. Browse and select "Beyoğlu" from Explore
4. Navigate back to Home tab
5. Observe Home tab state

**Expected Results**:
- ✓ Home tab still shows "Sultanahmet (Manual)"
- ✓ Home tab attractions are still Sultanahmet attractions
- ✓ Explore tab selection does NOT affect Home tab
- ✓ Manual selection on Home tab persists
- ✓ Can browse different districts in Explore without changing Home tab

**Steps (continued)**:
6. Return to Explore tab
7. Select different districts
8. Return to Home tab again

**Expected Results**:
- ✓ Home tab state remains unchanged
- ✓ Manual selection indicator still present
- ✓ Complete independence between tabs

---

## 9.4 Error Scenarios

### Test Case 4.1: GPS Timeout

**Requirements**: 5.1, 5.2, 5.3

**Setup**: Simulate GPS timeout (disable GPS, or use airplane mode briefly)

**Steps**:
1. Disable device GPS or put in airplane mode
2. Launch app
3. Grant location permissions
4. Wait for timeout (usually 10-15 seconds)

**Expected Results**:
- ✓ Error message appears: "GPS is taking too long" or similar
- ✓ DistrictSelectionPrompt is displayed
- ✓ "Choose District Manually" button is available
- ✓ "Retry Location" button is available
- ✓ User can proceed with manual selection despite GPS timeout

**Steps (continued)**:
5. Tap "Choose District Manually"
6. Select a district

**Expected Results**:
- ✓ Manual selection works despite GPS timeout
- ✓ Attractions are displayed for selected district
- ✓ App is fully functional without GPS

### Test Case 4.2: Location Services Disabled

**Requirements**: 5.1, 5.2, 5.3

**Setup**: Disable location services in device settings

**Steps**:
1. Go to device Settings → Location → Turn OFF
2. Launch app
3. Observe the error state

**Expected Results**:
- ✓ Error message appears: "Location services are disabled" or similar
- ✓ DistrictSelectionPrompt is displayed
- ✓ Message guides user to enable location services OR use manual selection
- ✓ "Choose District Manually" button is available
- ✓ "Open Settings" or "Retry Location" button is available

**Steps (continued)**:
4. Tap "Choose District Manually"
5. Select a district

**Expected Results**:
- ✓ Manual selection works without location services
- ✓ App provides full functionality via manual selection
- ✓ User can explore attractions without enabling location

### Test Case 4.3: Permission Denied

**Requirements**: 5.1, 5.2, 5.4

**Setup**: Deny location permission when prompted

**Steps**:
1. Fresh install or clear app permissions
2. Launch app
3. When permission prompt appears, tap "Deny" or "Don't Allow"

**Expected Results**:
- ✓ LocationPermission screen appears
- ✓ Clear message explains why permission is needed
- ✓ Option to grant permission is available
- ✓ Option to proceed without permission is available (via manual selection)

**Steps (continued)**:
4. If manual selection option is available, tap it
5. Select a district

**Expected Results**:
- ✓ Manual selection works without location permission
- ✓ User can browse attractions
- ✓ App gracefully handles permission denial

### Test Case 4.4: Retry Location After Error

**Requirements**: 5.2

**Steps**:
1. Trigger any error scenario (GPS timeout, services disabled, etc.)
2. Fix the underlying issue (enable GPS, enable location services)
3. Tap "Retry Location" button

**Expected Results**:
- ✓ App attempts to get location again
- ✓ Loading indicator appears during retry
- ✓ If successful, district is detected and attractions appear
- ✓ If still failing, error message updates appropriately
- ✓ Manual selection option remains available

---

## Additional Verification Checks

### UI/UX Verification

**DistrictPicker Modal**:
- ✓ Smooth slide-up animation
- ✓ Backdrop is semi-transparent
- ✓ Can dismiss by tapping backdrop
- ✓ Can dismiss by tapping X button
- ✓ Drag handle is visible at top
- ✓ All districts are scrollable
- ✓ Selected district is visually highlighted
- ✓ Touch targets are at least 44pt

**ManualSelectionIndicator**:
- ✓ Clearly visible in header
- ✓ Shows district name with "Manual" label
- ✓ Has clear X or close icon
- ✓ Tapping clears selection
- ✓ Provides haptic feedback on tap

**DistrictSelectionPrompt**:
- ✓ Friendly, non-technical language
- ✓ Clear icon (map pin with question mark)
- ✓ Buttons are clearly labeled
- ✓ Buttons have sufficient spacing
- ✓ Centered and visually balanced

### Accessibility Verification

- ✓ All interactive elements have accessibility labels
- ✓ Screen reader announces district names correctly
- ✓ Screen reader announces selection state
- ✓ Keyboard navigation works (if applicable)
- ✓ Color contrast meets WCAG AA standards
- ✓ Text scales with system font size
- ✓ Touch targets meet minimum size requirements

### Performance Verification

- ✓ District picker opens quickly (< 300ms)
- ✓ District selection is responsive
- ✓ No lag when scrolling district list
- ✓ Storage operations don't block UI
- ✓ Location updates don't cause jank
- ✓ Distance calculations are fast

---

## Test Results Template

Use this template to record test results:

```
Test Case: [ID and Name]
Date: [Date]
Tester: [Name]
Device: [Device Model and OS Version]
Build: [App Version]

Status: [ ] Pass [ ] Fail [ ] Blocked

Notes:
- 
- 

Issues Found:
- 
- 

Screenshots/Videos:
- 
```

---

## Sign-Off

Once all test cases pass, the manual district selection feature is verified and ready for release.

**Test Lead**: _____________________ Date: _______

**Product Owner**: _____________________ Date: _______

