# Sweph-Wasm - No Server Required

## 🎉 **Simple Setup - No Web Server Needed!**

This version of Sweph-Wasm works directly from your file system without requiring any web server setup.

## 📥 **How to Use**

### **Step 1: Download**
1. Download the Sweph-Wasm files to your computer
2. Extract the ZIP file to a folder

### **Step 2: Open the Application**
1. Navigate to the folder containing the files
2. **Double-click** `index-no-server.html`
3. The application will open in your default web browser
4. Wait for the Swiss Ephemeris module to load (you'll see a loading spinner)

### **Step 3: Start Calculating**
1. The application will show "✅ Ready!" when loaded
2. Enter your data:
   - **Date**: Choose between 1800-2400
   - **Time**: Enter in Universal Time (UT)
   - **Longitude**: Degrees, minutes, seconds, and direction
   - **Latitude**: Degrees, minutes, seconds, and direction
   - **House System**: Choose Placidus, Porphyrius, or Equal
3. Click **"Calculate"** to see planetary positions

## 🎯 **Example Calculation**

Try this example to test the application:

- **Date**: 2024-01-15
- **Time**: 12:00
- **Longitude**: 9° 9' 34" E
- **Latitude**: 45° 27' 40" N
- **House System**: Placidus

## ✅ **What You'll See**

The application displays:
- **Planetary Positions**: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto
- **Longitude**: Position in degrees, minutes, seconds
- **Latitude**: Distance from ecliptic
- **Distance**: Distance from Earth
- **Speed**: Daily motion
- **Ascendant & MC**: Key astrological points
- **House Cusps**: House positions based on your chosen system

## 🔧 **Troubleshooting**

### **"Module not loaded yet"**
- Wait for the loading spinner to disappear
- Look for the "✅ Ready!" message
- If it doesn't load, refresh the page

### **"Calculation failed"**
- Check that your date is between 1800-2400
- Verify coordinates are valid (longitude: 0-179°, latitude: 0-89°)
- Make sure all fields are filled

### **Page doesn't load properly**
- Make sure all files are in the same folder
- Try a different browser (Chrome, Firefox, Edge recommended)
- Check that JavaScript is enabled

## 🌟 **Features**

- ✅ **No server required** - works directly from file system
- ✅ **Offline functionality** - no internet needed
- ✅ **High precision** - Swiss Ephemeris calculations
- ✅ **User-friendly** - simple interface
- ✅ **Cross-platform** - works on Windows, Mac, Linux

## 📁 **Required Files**

Make sure these files are present in your folder:
- `index-no-server.html` (main application)
- `js/astro.js` (WebAssembly module)
- `js/astro.wasm` (WebAssembly binary)
- `js/astro.data` (ephemeris data)
- `js/calculate-no-server.js` (calculation logic)
- `assets/css/bootstrap.min.css` (styling)
- `assets/js/bootstrap.bundle.min.js` (UI components)
- `assets/js/jquery-3.6.4.min.js` (JavaScript library)
- `assets/js/moment.min.js` (date/time handling)

## 🚀 **Quick Start**

1. **Download** the files
2. **Extract** to a folder
3. **Double-click** `index-no-server.html`
4. **Wait** for loading to complete
5. **Enter** your data and calculate!

That's it! No server setup, no command line, no technical knowledge required.

---

**Note**: This version loads the Swiss Ephemeris module directly in the main browser thread, which may cause a brief pause during loading, but eliminates the need for a web server.