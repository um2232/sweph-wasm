# Offline Planetary Position Calculator

## Overview
This is a complete offline-capable web application that calculates planetary positions using the Swiss Ephemeris library compiled to WebAssembly. The application works entirely in the browser without requiring any server or internet connection.

## Features

### 🌟 Core Functionality
- **Planetary Positions**: Calculate positions of all major planets (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)
- **Astrological Houses**: Calculate house cusps using Placidus, Porphyrius, or Equal house systems
- **Ascendant/Midheaven**: Calculate Ascendant (Rising Sign) and Midheaven (MC)
- **Date Range**: Supports calculations from 1800 to 2400 AD
- **High Precision**: Uses Swiss Ephemeris for professional-grade accuracy

### 🚀 Offline Capabilities
- **No Internet Required**: Works completely offline once loaded
- **Progressive Web App**: Can be installed on mobile devices
- **Service Worker**: Caches all resources for instant loading
- **File System Compatible**: Can run directly from file system (with local server)

### 📱 User Interface
- **Modern Design**: Clean, responsive Bootstrap interface
- **Real-time Validation**: Input validation with helpful error messages
- **Loading Indicators**: Visual feedback during calculations
- **Performance Monitoring**: Shows loading times and calculation speed

## Quick Start

### Option 1: Direct File Access (Recommended)
1. Download the `sweph-wasm-single` folder
2. Open `sweph-wasm-single/sweph-wasm.html` in a web browser
3. The application will load and be ready for calculations

### Option 2: Local Server (For Development)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000/sweph-wasm-single/sweph-wasm.html`

## How to Use

### 1. Enter Date and Time
- **Date**: Select any date between 1800-2400 AD
- **Time**: Enter time in Universal Time (UT)
- Default values are set to current date/time

### 2. Enter Location
- **Longitude**: Degrees, minutes, seconds + East/West
- **Latitude**: Degrees, minutes, seconds + North/South
- Default values are set to Milan, Italy (9°9'34"E, 45°27'40"N)

### 3. Select House System
- **Placidus**: Most common house system
- **Porphyrius**: Equal division of houses
- **Equal**: Equal house system

### 4. Calculate
Click the "Calculate" button to get planetary positions, houses, and angles.

## Output Format

The application displays results in a clean table format:

| Planet | Longitude | Latitude | Distance | Speed |
|--------|-----------|----------|----------|-------|
| Sun    | 15°45'23" | 0°00'00" | 0.985 AU | 1°01' |
| Moon   | 120°12'45"| 2°15'30" | 0.002 AU | 13°45' |
| ...    | ...       | ...      | ...      | ...   |

### Additional Outputs:
- **Ascendant (Rising Sign)**: The degree of the zodiac rising on the eastern horizon
- **Midheaven (MC)**: The degree of the zodiac at the highest point
- **House Cusps**: The beginning of each of the 12 houses

## Technical Details

### Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5
- **Date Handling**: Moment.js
- **Backend**: Swiss Ephemeris compiled to WebAssembly
- **Caching**: Service Worker for offline functionality

### Files Structure
```
sweph-wasm-single/
├── sweph-wasm.html          # Main application file
├── manifest.json            # PWA manifest
├── js/
│   ├── astro.wasm          # WebAssembly binary
│   ├── astro.js            # WebAssembly JavaScript glue
│   ├── astro.data          # Ephemeris data files
│   └── calculate-*.js      # Calculation utilities
├── assets/
│   ├── css/
│   │   └── bootstrap.min.css
│   ├── js/
│   │   ├── bootstrap.bundle.min.js
│   │   ├── jquery-3.6.4.min.js
│   │   └── moment.min.js
│   └── img/
│       └── favicon.ico
```

### Performance
- **Initial Load**: ~3-5 seconds (depends on device)
- **Calculations**: <100ms per calculation
- **Memory Usage**: ~50MB total (including ephemeris data)
- **Cache Size**: ~5MB (all resources cached)

## Browser Compatibility

### Full Support
- Chrome 67+
- Edge 79+
- Firefox 60+
- Safari 11.1+

### Limited Support
- Internet Explorer (not recommended)
- Older mobile browsers

## Advanced Usage

### Programmatic Access
The WebAssembly module can be accessed programmatically:

```javascript
// Wait for module to load
if (window.Module && window.Module.ccall) {
    // Calculate planetary positions
    const result = window.Module.ccall(
        "get",
        "string",
        ["number", "number", "number", "number", "number", "number", 
         "number", "number", "number", "string", 
         "number", "number", "number", "string", "string"],
        [2024, 1, 15, 12, 0, 0,    // Date/time
         9, 9, 34, "E",            // Longitude
         45, 27, 40, "N",          // Latitude
         "P"]                       // House system
    );
    
    const data = JSON.parse(result);
    console.log(data.planets);
}
```

### Customization
- **Styling**: Modify CSS in the `<style>` section
- **House Systems**: Add new house systems in the select dropdown
- **Date Range**: Modify validation in the JavaScript code
- **Output Format**: Customize the `createResult()` function

## Troubleshooting

### Common Issues

1. **"Failed to load Swiss Ephemeris module"**
   - Ensure all files are present in the js/ directory
   - Try refreshing the page
   - Check browser console for specific errors

2. **"Invalid date" error**
   - Ensure date is between 1800-2400
   - Check date format (YYYY-MM-DD)

3. **"Invalid longitude/latitude" error**
   - Longitude: 0-179 degrees, 0-59 minutes, 0-59 seconds
   - Latitude: 0-89 degrees, 0-59 minutes, 0-59 seconds

4. **Slow loading**
   - First load includes downloading ~5MB of data
   - Subsequent loads use cached data (much faster)
   - Consider using a local server for development

### Performance Tips
- Use a modern browser for best performance
- Close other tabs/applications to free memory
- For mobile devices, ensure sufficient storage space

## License and Credits

- **Swiss Ephemeris**: © Astrodienst AG, Switzerland
- **WebAssembly Port**: Based on work by @randogoth
- **UI Framework**: Bootstrap (MIT License)
- **Date Library**: Moment.js (MIT License)

## Support and Development

This application is designed to be self-contained and easy to use. For advanced customization or integration into other projects, refer to the Swiss Ephemeris documentation and WebAssembly compilation guides.

---

**Note**: This application provides astrological calculations for educational and entertainment purposes. For professional astrological work, always verify calculations with multiple sources.