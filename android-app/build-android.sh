#!/bin/bash

# Planetary Calculator Android Build Script
# This script builds the Android app with WebAssembly support

echo "🌌 Planetary Calculator Android Build"
echo "====================================="
echo ""

# Check if we're in the right directory
if [ ! -f "app/build.gradle" ]; then
    echo "❌ Error: app/build.gradle not found!"
    echo "Please run this script from the android-app directory."
    exit 1
fi

# Check if WebAssembly files exist
if [ ! -f "../sweph-wasm-single/js/astro.wasm" ]; then
    echo "❌ Error: WebAssembly files not found!"
    echo "Please ensure the sweph-wasm-single directory contains the compiled files:"
    echo "  - js/astro.wasm"
    echo "  - js/astro.js"
    echo "  - js/astro.data"
    exit 1
fi

echo "✅ WebAssembly files found"
echo ""

# Create assets directory if it doesn't exist
mkdir -p app/src/main/assets/js

echo "📁 Copying WebAssembly files to assets..."
cp ../sweph-wasm-single/js/astro.wasm app/src/main/assets/js/
cp ../sweph-wasm-single/js/astro.js app/src/main/assets/js/
cp ../sweph-wasm-single/js/astro.data app/src/main/assets/js/

echo "✅ Files copied successfully"
echo ""

# Check if Android SDK is available
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  Warning: ANDROID_HOME not set"
    echo "Please set ANDROID_HOME to your Android SDK location"
    echo "Example: export ANDROID_HOME=/path/to/android-sdk"
    echo ""
fi

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "❌ Error: Java not found!"
    echo "Please install Java 8 or higher"
    exit 1
fi

echo "✅ Java found: $(java -version 2>&1 | head -n 1)"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
./gradlew clean

# Build debug APK
echo "🔨 Building debug APK..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📱 APK location:"
    echo "   app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📋 APK details:"
    ls -lh app/build/outputs/apk/debug/app-debug.apk
    echo ""
    echo "🚀 To install on connected device:"
    echo "   ./gradlew installDebug"
    echo ""
    echo "📊 APK size breakdown:"
    echo "   - WebAssembly binary: $(ls -lh app/src/main/assets/js/astro.wasm | awk '{print $5}')"
    echo "   - Ephemeris data: $(ls -lh app/src/main/assets/js/astro.data | awk '{print $5}')"
    echo "   - JavaScript glue: $(ls -lh app/src/main/assets/js/astro.js | awk '{print $5}')"
    echo ""
else
    echo ""
    echo "❌ Build failed!"
    echo "Please check the error messages above"
    exit 1
fi

# Optional: Build release APK
read -p "🤔 Would you like to build a release APK? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔨 Building release APK..."
    ./gradlew assembleRelease
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Release build successful!"
        echo "📱 Release APK location:"
        echo "   app/build/outputs/apk/release/app-release.apk"
        echo ""
        echo "⚠️  Note: Release APK needs to be signed for distribution"
        echo "   Use Android Studio or the signing tools to sign the APK"
    else
        echo ""
        echo "❌ Release build failed!"
    fi
fi

echo ""
echo "🎉 Build process completed!"
echo ""
echo "📚 Next steps:"
echo "   1. Install the APK on your Android device"
echo "   2. Enable 'Install from Unknown Sources' if needed"
echo "   3. Launch the app and test calculations"
echo "   4. For distribution, sign the release APK"
echo ""