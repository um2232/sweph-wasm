# 🪐 Vedic Astrology Calculator - APK Installation Guide

This guide provides multiple methods to install the Vedic Astrology Calculator Android app on your device.

## 📱 Quick Installation (Recommended)

### Method 1: Direct APK Download
1. **Download the APK**: The compiled APK is available in the repository
2. **Enable Unknown Sources**: Go to Settings > Security > Unknown Sources (enable)
3. **Install APK**: Open the downloaded APK file and follow installation prompts
4. **Launch App**: Find "Vedic Astrology Calculator" in your app drawer

### Method 2: ADB Installation (for developers)
```bash
# Connect your Android device via USB with USB debugging enabled
adb install vedic-astrology-calculator.apk
```

## 🔧 Building from Source

### Prerequisites

#### Required Software
- **Java 8 or later** (JDK)
- **Android Studio** (recommended) or **Android SDK**
- **Git** (for cloning the repository)

#### System Requirements
- **Operating System**: Windows, macOS, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space
- **Internet**: Required for downloading dependencies

### Step-by-Step Build Instructions

#### 1. Install Java Development Kit (JDK)
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-11-jdk

# macOS (using Homebrew)
brew install openjdk@11

# Windows
# Download from: https://adoptium.net/
```

#### 2. Install Android Studio (Recommended)
1. **Download Android Studio**: https://developer.android.com/studio
2. **Install Android Studio**: Follow the installation wizard
3. **Install Android SDK**: Open Android Studio > SDK Manager
4. **Set Environment Variables**:
   ```bash
   # Linux/macOS
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   
   # Windows
   set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
   set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
   ```

#### 3. Clone the Repository
```bash
git clone <repository-url>
cd android-app
```

#### 4. Build the APK

##### Option A: Using the Build Script (Recommended)
```bash
# Make the script executable
chmod +x build-vedic-apk.sh

# Run the build script
./build-vedic-apk.sh
```

##### Option B: Using Gradle Directly
```bash
# Clean previous builds
./gradlew clean

# Build release APK
./gradlew assembleRelease

# Find the APK
find app/build/outputs/apk/release -name "*.apk"
```

##### Option C: Using Android Studio
1. **Open Project**: Open Android Studio and select "Open an existing project"
2. **Navigate**: Select the `android-app` folder
3. **Build**: Go to Build > Build Bundle(s) / APK(s) > Build APK(s)
4. **Locate APK**: The APK will be in `app/build/outputs/apk/debug/`

### 5. Install the APK
```bash
# Using ADB
adb install app/build/outputs/apk/release/app-release.apk

# Or manually transfer and install on device
```

## 🚀 Features Overview

### Vedic Astrology Calculations
- ✅ **All 9 Vedic Planets (Navagrahas)**
  - Surya (Sun), Chandra (Moon), Mangal (Mars)
  - Budh (Mercury), Guru (Jupiter), Shukra (Venus)
  - Shani (Saturn), Rahu (North Node), Ketu (South Node)

- ✅ **Surya Siddhanta Integration**
  - Ancient Indian astronomical calculations
  - High-precision planetary positions

- ✅ **Lahiri Ayanamsa (Default)**
  - Most popular ayanamsa in India
  - 36 additional ayanamsa options available

- ✅ **Precise Lagna Calculation**
  - Accurate Ascendant calculation
  - Location-specific calculations

### House Systems
- ✅ **14 House Systems Supported**
  - Placidus (Most Popular)
  - Koch, Equal, Whole Sign
  - Porphyrius, Regiomontanus
  - Campanus, Vehlow, and more

### Planetary Information
- ✅ **Longitude & Latitude**: Precise positions
- ✅ **Rashi (Zodiac Signs)**: 12 Vedic signs
- ✅ **Nakshatra**: 27 lunar mansions
- ✅ **Planetary Speed**: Daily motion
- ✅ **Distance**: From Earth

### Advanced Features
- ✅ **Location Detection**: GPS integration
- ✅ **Offline Functionality**: No internet required
- ✅ **Modern UI**: Beautiful, responsive design
- ✅ **Date Range**: 1800-2400 CE
- ✅ **Global Coverage**: Any location on Earth

## 📋 Usage Instructions

### Basic Usage
1. **Launch the App**
2. **Enter Date & Time**: Select birth date and time in UT
3. **Enter Location**: Input latitude and longitude
4. **Select Options**: Choose house system and ayanamsa
5. **Calculate**: Tap "Calculate Vedic Chart"
6. **View Results**: See planetary positions and houses

### Location Detection
- Tap "📍 Use Current Location" for automatic coordinates
- Requires location permission
- Works offline once set

### Ayanamsa Selection
- **Lahiri (Recommended)**: Standard Indian ayanamsa
- **Raman**: Used by some Vedic astrologers
- **Krishnamurti**: KP system ayanamsa
- **Suryasiddhanta**: Ancient Indian calculation
- **36 more options** for specialized calculations

## 🔒 Permissions Required

### Essential Permissions
- **Location**: For automatic coordinate detection
- **Storage**: For saving calculations (optional)

### Privacy Features
- ✅ **No Data Collection**: All calculations local
- ✅ **Offline Operation**: Works without internet
- ✅ **Local Storage**: Calculations saved locally only

## 🐛 Troubleshooting

### Common Build Issues

#### 1. Android SDK Not Found
```bash
# Error: SDK location not found
# Solution: Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Android/Sdk
```

#### 2. Java Version Issues
```bash
# Check Java version
java -version

# Should be Java 8 or later
# If not, install correct version
```

#### 3. Gradle Build Failures
```bash
# Clean and rebuild
./gradlew clean
./gradlew assembleRelease

# Check for specific error messages
./gradlew assembleRelease --stacktrace
```

#### 4. Memory Issues
```bash
# Increase Gradle memory
export GRADLE_OPTS="-Xmx2048m -XX:MaxPermSize=512m"
```

### Installation Issues

#### 1. "App not installed" Error
- Enable "Unknown Sources" in device settings
- Check if APK is corrupted (re-download)
- Ensure sufficient storage space

#### 2. Location Not Working
- Grant location permission to app
- Enable GPS on device
- Check location services

#### 3. App Crashes
- Clear app data and cache
- Restart device
- Check Android version compatibility (requires API 21+)

### Performance Issues

#### 1. Slow Calculations
- First calculation may be slow (WebAssembly initialization)
- Subsequent calculations are faster
- Close other apps for better performance

#### 2. WebAssembly Not Loading
- Check internet connection for initial load
- Clear app cache
- Ensure device supports WebAssembly

## 📱 Device Compatibility

### Minimum Requirements
- **Android Version**: 5.0 (API Level 21) or later
- **RAM**: 2GB minimum (4GB recommended)
- **Storage**: 100MB free space
- **Screen**: 320dp minimum width

### Recommended Requirements
- **Android Version**: 8.0 (API Level 26) or later
- **RAM**: 4GB or more
- **Storage**: 500MB free space
- **Screen**: 360dp or larger

### Supported Devices
- ✅ **Smartphones**: All Android phones 5.0+
- ✅ **Tablets**: All Android tablets 5.0+
- ✅ **Emulators**: Android Studio emulators
- ✅ **Chrome OS**: Android apps on Chromebooks

## 🔄 Updates and Maintenance

### Updating the App
1. **Check for Updates**: Monitor repository for new releases
2. **Download New APK**: Get latest version
3. **Install Update**: Install over existing version
4. **Data Preservation**: Settings and saved data preserved

### Maintenance
- **Clear Cache**: Periodically clear app cache
- **Update Dependencies**: Keep build tools updated
- **Backup Data**: Export important calculations

## 📞 Support and Community

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check README files
- **Community**: Join Vedic astrology forums

### Contributing
1. **Fork Repository**: Create your own copy
2. **Make Changes**: Implement improvements
3. **Test Thoroughly**: Ensure everything works
4. **Submit Pull Request**: Share your contributions

## 📚 Additional Resources

### Vedic Astrology References
- **Surya Siddhanta**: Ancient Indian astronomy
- **Lahiri Ayanamsa**: Standard Indian ayanamsa
- **Navagrahas**: Nine Vedic planets
- **Rashis**: 12 zodiac signs
- **Nakshatras**: 27 lunar mansions

### Technical Resources
- **Swiss Ephemeris**: High-precision calculations
- **WebAssembly**: Fast web technology
- **Android Development**: Official documentation
- **Material Design**: UI guidelines

## ⚖️ Legal and Disclaimer

### License
This project is licensed under the MIT License.

### Disclaimer
This app is for educational and entertainment purposes. For serious astrological consultations, please consult qualified Vedic astrologers.

### Privacy
- No personal data is collected
- All calculations are performed locally
- No data is transmitted to external servers

---

**🎉 Congratulations!** You now have a comprehensive Vedic astrology calculator on your Android device. Enjoy exploring the ancient wisdom of Vedic astrology with modern technology!