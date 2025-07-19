#!/bin/bash

# Vedic Astrology Calculator - Android APK Build Script
# This script builds the Vedic astrology calculator Android app

set -e

echo "🪐 Vedic Astrology Calculator - Android APK Builder"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "build.gradle" ]; then
    print_error "This script must be run from the android-app directory"
    exit 1
fi

print_status "Checking prerequisites..."

# Check for Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2)
    print_success "Java found: $JAVA_VERSION"
else
    print_error "Java is required but not installed"
    print_status "Please install Java 8 or later"
    exit 1
fi

# Check for Android SDK
ANDROID_HOME=${ANDROID_HOME:-$ANDROID_SDK_ROOT}
if [ -z "$ANDROID_HOME" ]; then
    print_warning "Android SDK not found in environment variables"
    print_status "Checking common Android SDK locations..."
    
    # Common Android SDK locations
    COMMON_LOCATIONS=(
        "$HOME/Android/Sdk"
        "$HOME/Library/Android/sdk"
        "/usr/local/android-sdk"
        "/opt/android-sdk"
        "/usr/lib/android-sdk"
    )
    
    for location in "${COMMON_LOCATIONS[@]}"; do
        if [ -d "$location" ]; then
            ANDROID_HOME="$location"
            print_success "Found Android SDK at: $ANDROID_HOME"
            break
        fi
    done
    
    if [ -z "$ANDROID_HOME" ]; then
        print_error "Android SDK not found"
        print_status "Please install Android SDK or set ANDROID_HOME environment variable"
        print_status "You can download Android Studio from: https://developer.android.com/studio"
        exit 1
    fi
else
    print_success "Android SDK found at: $ANDROID_HOME"
fi

# Set up environment variables
export ANDROID_HOME
export PATH="$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH"

print_status "Setting up local.properties..."
# Create local.properties file
cat > local.properties << EOF
sdk.dir=$ANDROID_HOME
EOF

print_success "Created local.properties with SDK path"

# Check if gradlew is executable
if [ ! -x "./gradlew" ]; then
    print_status "Making gradlew executable..."
    chmod +x ./gradlew
fi

print_status "Cleaning previous builds..."
./gradlew clean

print_status "Building Vedic Astrology Calculator APK..."

# Build the APK
if ./gradlew assembleRelease; then
    print_success "APK built successfully!"
    
    # Find the APK file
    APK_PATH=$(find app/build/outputs/apk/release -name "*.apk" 2>/dev/null | head -n 1)
    
    if [ -n "$APK_PATH" ]; then
        APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
        print_success "APK created: $APK_PATH (Size: $APK_SIZE)"
        
        # Copy to workspace root for easy access
        cp "$APK_PATH" ../vedic-astrology-calculator.apk
        print_success "APK copied to: ../vedic-astrology-calculator.apk"
        
        echo ""
        echo "🎉 Vedic Astrology Calculator APK is ready!"
        echo "📱 Install on Android device:"
        echo "   adb install ../vedic-astrology-calculator.apk"
        echo ""
        echo "📋 Features included:"
        echo "   ✅ All 9 Vedic planets (Navagrahas)"
        echo "   ✅ Surya Siddhanta calculations"
        echo "   ✅ Lahiri ayanamsa (and 36 other options)"
        echo "   ✅ Precise Lagna calculation"
        echo "   ✅ 14 house systems"
        echo "   ✅ Rashi and Nakshatra calculations"
        echo "   ✅ Location detection"
        echo "   ✅ Offline functionality"
        echo ""
        
    else
        print_error "APK file not found in expected location"
        print_status "Check app/build/outputs/apk/release/ for the APK file"
    fi
else
    print_error "Build failed"
    print_status "Check the error messages above for details"
    exit 1
fi

print_status "Build process completed!"