# Privacy Policy Setup Guide

## Overview
Google Play Store requires a publicly accessible privacy policy URL for apps that collect location data.

## Steps to Host Your Privacy Policy

### Option 1: Separate Public GitHub Repo (Best for Private Code)

**If your main repo is private, create a separate public repo just for legal documents:**

1. **Create a new public repository**
   - Go to github.com → New repository
   - Name: `istanbuller-privacy` or `istanbuller-legal`
   - Make it PUBLIC
   - Initialize with README

2. **Add your privacy policy**
   - Copy the content from `PRIVACY_POLICY.md`
   - Create a new file in the repo called `PRIVACY_POLICY.md`
   - Paste the content

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

4. **Get your URL**
   - `https://YOUR_USERNAME.github.io/istanbuller-privacy/PRIVACY_POLICY`

5. **Update app.json**
   - Replace the URL with your actual one

### Option 2: Netlify Drop (Super Easy - No Git Required)

1. Go to https://app.netlify.com/drop
2. Drag and drop your `PRIVACY_POLICY.md` file
3. Get instant URL like `https://random-name-123.netlify.app/PRIVACY_POLICY`
4. Update app.json with this URL

### Option 3: GitHub Gist (Quickest)

1. Go to https://gist.github.com
2. Create new gist
   - Filename: `PRIVACY_POLICY.md`
   - Paste your privacy policy content
   - Make it PUBLIC
3. Click "Create public gist"
4. Click "Raw" button to get the direct URL
5. Use the raw URL in app.json

### Option 4: Use Main Repo (Only if Your Code is Already Public)

If your istanbuller repo is already public, you can enable GitHub Pages on it directly.

## Recommendation

**For private code:** Use Option 1 (separate public repo) or Option 2 (Netlify Drop)
**For public code:** Use Option 4 (main repo)

Your code stays private, only the privacy policy is public (which is required by Play Store anyway).

## Before Submitting to Play Store

1. **Update the privacy policy**
   - Replace `[your-email@example.com]` with your actual contact email
   - Review all sections to ensure accuracy

2. **Verify the URL works**
   - Open the URL in a browser
   - Make sure it's publicly accessible (not behind login)

3. **Add to Play Store Console**
   - When creating/editing your app listing
   - Go to "Store presence" → "Privacy policy"
   - Paste your privacy policy URL

## Important Notes

- The privacy policy URL must be publicly accessible
- It must use HTTPS (GitHub Pages provides this automatically)
- Keep the privacy policy updated if you add new features
- Google Play Store will reject your app if the URL is not accessible

## What's Already Done

✅ Privacy policy document created at `PRIVACY_POLICY.md`
✅ Privacy policy URL field added to `app.json`
⏳ You need to: Host it publicly and update the URL

## Play Store Data Safety Section

When filling out the Data Safety form in Play Store Console:

**Location Data:**
- ✅ Collects: Yes
- Type: Approximate location, Precise location
- Purpose: App functionality
- Shared: No
- Optional: No (required for core functionality)
- Ephemeral: Yes (not stored permanently)

**Other Data:**
- Language preference: Stored locally only
