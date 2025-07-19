# Sweph-Wasm Download & Usage Guide

## 📥 How to Download

### Option 1: Download from GitHub
1. Visit the Sweph-Wasm repository
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to your desired location

### Option 2: Clone with Git
```bash
git clone https://github.com/[username]/sweph-wasm.git
cd sweph-wasm
```

## 🚀 How to Use

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (required due to CORS restrictions)

### Step 1: Set Up a Local Web Server

#### Option A: Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

#### Option C: Using PHP
```bash
php -S localhost:8000
```

#### Option D: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Step 2: Access the Application
1. Open your web browser
2. Navigate to: `http://localhost:8000`
3. The application should load and be ready to use

## 📱 Using the Application

### Basic Usage
1. **Set Date**: Choose a date between 1800-2400
2. **Set Time**: Enter the time in Universal Time (UT)
3. **Set Location**: Enter longitude and latitude
4. **Choose House System**: Select Placidus, Porphyrius, or Equal
5. **Calculate**: Click the "Calculate" button

### Example Calculation
- **Date**: 2024-01-15
- **Time**: 12:00
- **Longitude**: 9° 9' 34" E
- **Latitude**: 45° 27' 40" N
- **House System**: Placidus

### Understanding the Results
The application displays:
- **Planetary Positions**: Longitude, latitude, distance, and speed
- **Ascendant & MC**: Key astrological points
- **House Cusps**: House positions based on your chosen system

## 🔧 Offline Installation

### Install as PWA (Progressive Web App)

#### On Desktop (Chrome/Edge):
1. Visit the application in your browser
2. Look for the install icon in the address bar
3. Click "Install" or "Add to Desktop"
4. The app will appear in your applications

#### On Mobile (Android):
1. Open Chrome and visit the application
2. Tap the menu (three dots)
3. Select "Add to Home Screen"
4. Follow the prompts to install

#### On Mobile (iOS):
1. Open Safari and visit the application
2. Tap the share button
3. Select "Add to Home Screen"
4. The app will appear on your home screen

### Offline Usage
Once installed or cached:
1. The app works completely offline
2. All calculations function without internet
3. Status indicator shows connection state
4. No need for continuous internet connection

## 🛠️ Advanced Setup

### Customizing Ephemeris Files
If you want to extend the date range beyond 1800-2400:

1. **Add More Ephemeris Files**:
   - Download additional Swiss Ephemeris files
   - Place them in the `lib/src/eph/` directory
   - Files should have `.se1` extension

2. **Recompile**:
   ```bash
   cd lib/src
   make astro
   make install
   ```

### Available Ephemeris Files
- `seas_18.se1` - Asteroids (1800-2400)
- `semo_18.se1` - Moon (1800-2400)
- `sepl_18.se1` - Planets (1800-2400)

### Using emrun (Alternative to Local Server)
If you have Emscripten installed:
```bash
emrun index.html
```

## 🔍 Troubleshooting

### Common Issues

#### "CORS Error" or "File not found"
- **Solution**: Use a local web server (see Step 1 above)
- **Don't**: Open `index.html` directly in browser

#### "Service Worker not registered"
- **Solution**: Ensure you're using HTTPS or localhost
- **Check**: Browser console for specific errors

#### "Calculation not working"
- **Check**: Date is between 1800-2400
- **Verify**: Coordinates are valid
- **Ensure**: All required fields are filled

#### "App won't install"
- **Check**: Browser supports PWA
- **Verify**: Site is served over HTTPS (or localhost)
- **Try**: Different browser (Chrome/Edge recommended)

### Browser Compatibility
- **Chrome/Edge**: Full support with PWA features
- **Firefox**: Full support
- **Safari**: Basic offline support, limited PWA
- **Mobile**: Full support on Android, limited on iOS

## 📊 Performance Tips

1. **First Load**: May take a few seconds to cache files
2. **Subsequent Loads**: Much faster due to caching
3. **Calculations**: Instant results once loaded
4. **Storage**: Uses browser cache (can be cleared if needed)

## 🔒 Privacy & Security

- **No Data Sent**: All calculations happen locally
- **No Tracking**: No analytics or tracking code
- **Offline First**: Works without internet connection
- **Local Storage**: Uses browser's cache API

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Ensure you're using a local web server
3. Verify all files are present in the directory
4. Try a different browser
5. Check the original README.md for technical details

## 🎯 Quick Start Checklist

- [ ] Downloaded/extracted the files
- [ ] Started a local web server
- [ ] Opened `http://localhost:8000` in browser
- [ ] Verified the application loads
- [ ] Tested a calculation
- [ ] (Optional) Installed as PWA for offline use

The application is now ready for offline astrological calculations!