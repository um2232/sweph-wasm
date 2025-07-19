# Planetary Position Calculator - Android App

## Overview
This Android app provides offline planetary position calculations using Swiss Ephemeris WebAssembly, wrapped in a native Android interface. The app works completely offline and provides fast, accurate astrological calculations.

## Features

### 🌟 Core Features
- **Offline Calculations**: Works without internet connection
- **High Precision**: Swiss Ephemeris accuracy (1800-2400 AD)
- **All Planets**: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto
- **Astrological Houses**: Placidus, Porphyrius, Equal house systems
- **Angles**: Ascendant (Rising Sign) and Midheaven (MC)
- **Native Android UI**: Material Design interface

### 📱 Android Features
- **Progressive Web App**: Can be installed as a native app
- **Offline Storage**: All ephemeris data stored locally
- **Fast Performance**: WebAssembly calculations in native speed
- **Responsive Design**: Works on phones and tablets
- **Dark/Light Theme**: Automatic theme switching

## Quick Start

### Option 1: Install APK
1. Download the `planetary-calculator.apk` file
2. Enable "Install from Unknown Sources" in Android settings
3. Install the APK file
4. Launch the app

### Option 2: Build from Source
```bash
# Clone the repository
git clone <repository-url>
cd android-app

# Build the project
./gradlew assembleDebug

# Install on connected device
./gradlew installDebug
```

## How to Use

### 1. Enter Date and Time
- Tap the date field to select any date between 1800-2400 AD
- Use the time picker for Universal Time (UT)
- Default values are current date/time

### 2. Enter Location
- **Longitude**: Degrees, minutes, seconds + East/West
- **Latitude**: Degrees, minutes, seconds + North/South
- Use the location picker for common cities
- Default: Milan, Italy (9°9'34"E, 45°27'40"N)

### 3. Select House System
- **Placidus**: Most common house system
- **Porphyrius**: Equal division of houses
- **Equal**: Equal house system

### 4. Calculate
Tap "Calculate" to get planetary positions, houses, and angles.

## Technical Architecture

### Android Components
- **MainActivity**: Main UI and navigation
- **WebView**: Hosts the WebAssembly calculator
- **LocationService**: Handles GPS and location data
- **StorageManager**: Manages offline data and settings

### WebAssembly Integration
- **astro.wasm**: Swiss Ephemeris compiled for Android
- **astro.js**: JavaScript glue code
- **astro.data**: Ephemeris data files (embedded in APK)

### File Structure
```
android-app/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/planetary/calculator/
│   │   │   │       ├── MainActivity.kt
│   │   │   │       ├── WebViewManager.kt
│   │   │   │       └── LocationService.kt
│   │   │   ├── res/
│   │   │   │   ├── layout/
│   │   │   │   ├── values/
│   │   │   │   └── drawable/
│   │   │   └── assets/
│   │   │       ├── calculator.html
│   │   │       ├── js/
│   │   │       │   ├── astro.wasm
│   │   │       │   ├── astro.js
│   │   │       │   └── astro.data
│   │   │       └── css/
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── gradle/
└── build.gradle
```

## Performance

### Loading Times
- **First Launch**: ~5-10 seconds (includes data extraction)
- **Subsequent Launches**: ~2-3 seconds
- **Calculations**: <100ms per calculation

### Storage Requirements
- **APK Size**: ~8MB (includes all ephemeris data)
- **Runtime Memory**: ~50MB
- **Cache**: ~5MB (WebAssembly cache)

## Android Permissions

### Required Permissions
- **Internet**: For initial data download (optional)
- **Storage**: For caching ephemeris data
- **Location**: For GPS coordinates (optional)

### Optional Permissions
- **Camera**: For QR code location sharing
- **Contacts**: For saving calculation results

## Development Setup

### Prerequisites
- Android Studio 4.0+
- Android SDK API 21+
- Kotlin 1.5+
- Gradle 7.0+

### Build Configuration
```gradle
android {
    compileSdkVersion 33
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 33
        applicationId "com.planetary.calculator"
        versionCode 1
        versionName "1.0.0"
    }
    
    buildFeatures {
        viewBinding true
    }
}
```

### Dependencies
```gradle
dependencies {
    implementation 'androidx.core:core-ktx:1.9.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.8.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.webkit:webkit:1.6.1'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
}
```

## Customization

### UI Customization
- **Themes**: Modify `res/values/themes.xml`
- **Colors**: Update `res/values/colors.xml`
- **Layouts**: Customize `res/layout/` files

### Functionality
- **House Systems**: Add new systems in JavaScript
- **Date Range**: Modify validation in WebAssembly
- **Output Format**: Customize HTML templates

## Troubleshooting

### Common Issues

1. **"WebAssembly not supported"**
   - Ensure Android API level 21+
   - Check WebView version (should be 67+)

2. **"Failed to load ephemeris data"**
   - Verify assets are properly included in APK
   - Check storage permissions

3. **"Slow performance"**
   - Close other apps to free memory
   - Ensure sufficient storage space
   - Update Android WebView

4. **"Location not working"**
   - Grant location permissions
   - Enable GPS in device settings

### Debug Mode
Enable debug logging:
```kotlin
if (BuildConfig.DEBUG) {
    WebView.setWebContentsDebuggingEnabled(true)
}
```

## Distribution

### Google Play Store
1. Build release APK: `./gradlew assembleRelease`
2. Sign with release keystore
3. Upload to Google Play Console
4. Configure app listing and permissions

### Direct Distribution
1. Build debug APK: `./gradlew assembleDebug`
2. Share APK file directly
3. Users enable "Install from Unknown Sources"

## License and Credits

- **Swiss Ephemeris**: © Astrodienst AG, Switzerland
- **WebAssembly Port**: Based on work by @randogoth
- **Android Framework**: Apache License 2.0
- **Material Design**: Google Inc.

---

**Note**: This app provides astrological calculations for educational and entertainment purposes. For professional astrological work, always verify calculations with multiple sources.