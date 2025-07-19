# Sweph-Wasm Offline Functionality

This document describes the offline capabilities that have been added to the Sweph-Wasm application.

## Features Added

### 1. Service Worker
- **File**: `sw.js`
- **Purpose**: Caches all necessary resources for offline functionality
- **Cached Resources**:
  - HTML files (index.html, offline.html)
  - CSS files (Bootstrap)
  - JavaScript files (jQuery, Moment.js, Bootstrap, application files)
  - WebAssembly files (astro.wasm, astro.js, astro.data)
  - Images and icons
  - Manifest file

### 2. Progressive Web App (PWA) Support
- **File**: `manifest.json`
- **Features**:
  - App can be installed on mobile devices
  - Standalone mode (no browser UI)
  - Custom theme colors
  - App icons

### 3. Offline Status Indicator
- Visual indicator showing online/offline status
- Appears briefly when connection status changes
- Green for online, red for offline

### 4. Offline Notice
- Informational banner when working offline
- Assures users that calculations work without internet

### 5. Install Prompt
- "Install App" button appears when PWA can be installed
- Allows users to add the app to their home screen

### 6. Offline Fallback Page
- **File**: `offline.html`
- Shown when the main app cannot be loaded
- Provides retry functionality

## How It Works

1. **First Visit**: When a user first visits the site, the service worker caches all necessary files
2. **Subsequent Visits**: The app loads from cache, making it much faster
3. **Offline Mode**: Once cached, the app works completely offline
4. **Updates**: The service worker automatically updates cached files when new versions are available

## Browser Support

- **Chrome/Edge**: Full PWA support with install prompt
- **Firefox**: Full PWA support
- **Safari**: Basic offline functionality, limited PWA features
- **Mobile Browsers**: Full support on Android, limited on iOS

## Testing Offline Functionality

1. Load the application in a browser
2. Open Developer Tools (F12)
3. Go to Application tab
4. Check "Offline" checkbox
5. Refresh the page - it should still work
6. Try calculating planetary positions - they should work offline

## Installation

To install the app on a mobile device:

1. Visit the site in Chrome/Edge
2. Look for the install prompt or "Add to Home Screen" option
3. Follow the browser's instructions
4. The app will now appear as a native app on your device

## Technical Details

- **Cache Strategy**: Cache-first with network fallback
- **Cache Version**: `sweph-wasm-v1` (increment for updates)
- **Storage**: Uses browser's Cache API
- **Updates**: Service worker automatically handles cache updates

## Files Modified

- `index.html` - Added PWA meta tags, service worker registration, and offline UI
- `sw.js` - New service worker file
- `manifest.json` - New PWA manifest
- `offline.html` - New offline fallback page

## Benefits

1. **Faster Loading**: Cached resources load instantly
2. **Offline Access**: Works without internet connection
3. **Mobile Friendly**: Can be installed as a native app
4. **Better UX**: Visual feedback for connection status
5. **Reliable**: Graceful fallback when offline