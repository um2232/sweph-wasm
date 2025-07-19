# 🪐 Vedic Astrology Calculator - Android App

A comprehensive Android application for calculating planetary positions using Vedic astrology methods, including Surya Siddhanta calculations and Lahiri ayanamsa.

## 🌟 Features

### Vedic Astrology Calculations
- **All 9 Vedic Planets (Navagrahas)**: Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu
- **Surya Siddhanta Integration**: Ancient Indian astronomical calculations
- **Lahiri Ayanamsa**: Most popular ayanamsa for Vedic astrology
- **Multiple Ayanamsa Options**: 37 different ayanamsa calculations including Raman, Krishnamurti, etc.
- **Precise Lagna Calculation**: Accurate Ascendant calculation
- **House Systems**: Support for 14 different house systems (Placidus, Koch, Equal, etc.)

### Planetary Information
- **Longitude & Latitude**: Precise planetary positions
- **Rashi (Zodiac Signs)**: 12 Vedic zodiac signs
- **Nakshatra**: 27 lunar mansions
- **Planetary Speed**: Daily motion of planets
- **Distance**: Planetary distances from Earth

### Advanced Features
- **Location Detection**: Automatic GPS coordinate detection
- **Offline Functionality**: Works without internet connection
- **Modern UI**: Beautiful, responsive design
- **Multiple House Systems**: Placidus, Koch, Equal, Whole Sign, etc.
- **Ayanamsa Selection**: Choose from 37 different ayanamsa calculations

## 📱 Installation

### Prerequisites
- Android Studio Arctic Fox or later
- Android SDK 21+ (API Level 21)
- Java 8 or later

### Build Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd android-app
   ```

2. **Open in Android Studio**:
   ```bash
   android-studio .
   ```

3. **Build the APK**:
   ```bash
   ./gradlew assembleRelease
   ```

4. **Install on device**:
   ```bash
   adb install app/build/outputs/apk/release/app-release.apk
   ```

### Quick Build Script
```bash
./build-android.sh
```

## 🚀 Usage

### Basic Usage
1. **Launch the app**
2. **Enter Date & Time**: Select birth date and time in UT (Universal Time)
3. **Enter Location**: Input latitude and longitude coordinates
4. **Select Options**: Choose house system and ayanamsa
5. **Calculate**: Tap "Calculate Vedic Chart" button
6. **View Results**: See planetary positions, houses, and Lagna

### Location Detection
- Tap "📍 Use Current Location" to automatically fill coordinates
- Requires location permission
- Works offline once coordinates are set

### Ayanamsa Options
- **Lahiri (Recommended)**: Most popular in India
- **Raman**: Used by some Vedic astrologers
- **Krishnamurti**: KP system ayanamsa
- **Suryasiddhanta**: Ancient Indian calculation
- **And 33 more options** for specialized calculations

### House Systems
- **Placidus**: Most popular house system
- **Koch**: Equal house system
- **Equal**: Whole sign houses
- **Whole Sign**: Traditional Vedic system
- **And 10 more options** for different traditions

## 🔧 Technical Details

### Architecture
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Backend**: Swiss Ephemeris WebAssembly
- **Android**: Kotlin + WebView
- **Location**: Google Play Services

### Dependencies
- **Swiss Ephemeris**: High-precision astronomical calculations
- **WebAssembly**: Fast planetary calculations
- **Material Design**: Modern UI components
- **Location Services**: GPS integration

### File Structure
```
android-app/
├── app/src/main/
│   ├── assets/
│   │   ├── vedic-calculator.html    # Main calculator interface
│   │   └── js/
│   │       ├── astro.js             # Swiss Ephemeris WebAssembly
│   │       ├── astro.wasm           # WebAssembly binary
│   │       ├── astro.data           # Ephemeris data
│   │       └── vedic-calculator.js  # Vedic calculation logic
│   ├── java/com/planetary/calculator/
│   │   ├── MainActivity.kt          # Main Android activity
│   │   ├── WebViewManager.kt        # WebView management
│   │   └── LocationService.kt       # Location services
│   └── res/                         # Android resources
└── build-android.sh                 # Build script
```

## 📊 Calculation Methods

### Planetary Positions
- **Swiss Ephemeris**: High-precision astronomical calculations
- **Surya Siddhanta**: Ancient Indian astronomical methods
- **Ayanamsa Correction**: Sidereal zodiac calculations
- **Real-time Updates**: Current planetary positions

### House Calculations
- **Ascendant (Lagna)**: Rising sign calculation
- **House Cusps**: 12 house boundaries
- **House Systems**: Multiple calculation methods
- **Geographic Correction**: Location-specific calculations

### Vedic Features
- **Rashi Calculation**: 12 zodiac signs
- **Nakshatra Calculation**: 27 lunar mansions
- **Planetary Dignities**: Exaltation, debilitation
- **Aspects**: Planetary relationships

## 🌍 Supported Locations

### Global Coverage
- **Worldwide**: Any location on Earth
- **Date Range**: 1800-2400 CE
- **Time Zones**: Universal Time (UT) input
- **Coordinates**: Decimal degrees or DMS format

### Popular Locations
- **India**: Default coordinates (Mumbai)
- **United States**: All major cities
- **Europe**: European locations
- **Asia**: Asian locations
- **Global**: Any custom coordinates

## 🔒 Permissions

### Required Permissions
- **Location**: For automatic coordinate detection
- **Internet**: For initial setup (optional)
- **Storage**: For saving calculations (optional)

### Privacy
- **No Data Collection**: All calculations local
- **Offline Operation**: Works without internet
- **Local Storage**: Calculations saved locally only

## 🐛 Troubleshooting

### Common Issues

1. **WebAssembly not loading**:
   - Check internet connection for initial load
   - Clear app cache and restart
   - Ensure device supports WebAssembly

2. **Location not working**:
   - Grant location permission
   - Enable GPS on device
   - Check location services

3. **Calculations slow**:
   - First calculation may be slow
   - Subsequent calculations are faster
   - WebAssembly needs to initialize

4. **App crashes**:
   - Update Android version
   - Clear app data
   - Reinstall app

### Performance Tips
- **First Launch**: Allow time for WebAssembly initialization
- **Location**: Use GPS for accurate coordinates
- **Memory**: Close other apps for better performance
- **Updates**: Keep app updated for latest features

## 📈 Future Enhancements

### Planned Features
- **Birth Chart Visualization**: Graphical chart display
- **Transit Calculations**: Current planetary transits
- **Dasha Calculations**: Vedic timing systems
- **Compatibility**: Relationship compatibility
- **Muhurta**: Auspicious timing calculations
- **Export**: PDF chart export
- **Multiple Charts**: Save and compare charts

### Technical Improvements
- **Performance**: Faster calculations
- **UI/UX**: Enhanced user interface
- **Offline**: Complete offline functionality
- **Accuracy**: Improved precision
- **Compatibility**: Support for older devices

## 📚 References

### Vedic Astrology
- **Surya Siddhanta**: Ancient Indian astronomy
- **Lahiri Ayanamsa**: Standard Indian ayanamsa
- **Navagrahas**: Nine Vedic planets
- **Rashis**: 12 zodiac signs
- **Nakshatras**: 27 lunar mansions

### Technical
- **Swiss Ephemeris**: High-precision astronomical calculations
- **WebAssembly**: Fast web technology
- **Android WebView**: Native web integration
- **Material Design**: Modern UI guidelines

## 🤝 Contributing

### Development
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Testing
- Test on multiple Android versions
- Verify calculations accuracy
- Check UI responsiveness
- Test offline functionality

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Swiss Ephemeris**: For high-precision astronomical calculations
- **Vedic Astrology Community**: For traditional knowledge
- **Open Source Community**: For tools and libraries
- **Beta Testers**: For feedback and improvements

## 📞 Support

### Contact
- **Issues**: GitHub Issues
- **Questions**: GitHub Discussions
- **Feedback**: GitHub Issues

### Documentation
- **User Guide**: This README
- **API Documentation**: Code comments
- **Examples**: Sample calculations

---

**Note**: This app is for educational and entertainment purposes. For serious astrological consultations, please consult qualified Vedic astrologers.