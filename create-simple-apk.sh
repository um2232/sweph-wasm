#!/bin/bash

# Simple APK Creation Script
# This creates a basic APK structure for the planetary calculator

echo "🌌 Creating Simple APK Structure"
echo "================================="

# Create APK directory structure
mkdir -p planetary-calculator-apk
cd planetary-calculator-apk

# Create basic APK structure
mkdir -p META-INF
mkdir -p res/layout
mkdir -p res/values
mkdir -p res/drawable
mkdir -p assets/js

echo "📁 Creating APK structure..."

# Create AndroidManifest.xml
cat > AndroidManifest.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.planetary.calculator"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
EOF

# Create strings.xml
cat > res/values/strings.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Planetary Calculator</string>
    <string name="loading">Loading...</string>
    <string name="calculate">Calculate</string>
</resources>
EOF

# Create layout file
cat > res/layout/activity_main.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/app_name"
        android:textSize="24sp"
        android:gravity="center"
        android:layout_marginBottom="16dp" />

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
EOF

# Create styles
cat > res/values/styles.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">#9C27B0</item>
        <item name="colorPrimaryDark">#7B1FA2</item>
        <item name="colorAccent">#FF4081</item>
    </style>
</resources>
EOF

# Copy WebAssembly files
echo "📦 Copying WebAssembly files..."
cp ../../sweph-wasm-single/js/astro.wasm assets/js/
cp ../../sweph-wasm-single/js/astro.js assets/js/
cp ../../sweph-wasm-single/js/astro.data assets/js/

# Create the calculator HTML
cat > assets/calculator.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planetary Calculator</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #9C27B0; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; }
        .results { margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌌 Planetary Calculator</h1>
        <p>High-precision astrological calculations using Swiss Ephemeris</p>
        
        <form id="calculatorForm">
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" id="date" required>
            </div>
            
            <div class="form-group">
                <label for="time">Time (UT):</label>
                <input type="time" id="time" required>
            </div>
            
            <div class="form-group">
                <label for="longitude">Longitude:</label>
                <input type="number" id="longitude" placeholder="e.g., 9.1611" step="0.0001" required>
            </div>
            
            <div class="form-group">
                <label for="latitude">Latitude:</label>
                <input type="number" id="latitude" placeholder="e.g., 45.4642" step="0.0001" required>
            </div>
            
            <div class="form-group">
                <label for="houseSystem">House System:</label>
                <select id="houseSystem">
                    <option value="P">Placidus</option>
                    <option value="O">Porphyrius</option>
                    <option value="E">Equal</option>
                </select>
            </div>
            
            <button type="submit">Calculate Planetary Positions</button>
        </form>
        
        <div id="loading" style="display: none;">
            <p>Loading Swiss Ephemeris...</p>
        </div>
        
        <div id="results" class="results" style="display: none;">
            <h3>Calculation Results</h3>
            <div id="resultsTable"></div>
        </div>
    </div>

    <script>
        // Set default values
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
        document.getElementById('time').value = new Date().toTimeString().slice(0, 5);
        document.getElementById('longitude').value = '9.1611'; // Milan
        document.getElementById('latitude').value = '45.4642'; // Milan

        // Initialize WebAssembly
        window.Module = {
            locateFile: function(s) { return s; },
            onRuntimeInitialized: function() {
                document.getElementById('loading').style.display = 'none';
                console.log('Swiss Ephemeris loaded successfully!');
            },
            onError: function(error) {
                console.error('Error loading Swiss Ephemeris:', error);
                document.getElementById('loading').style.display = 'none';
                alert('Failed to load Swiss Ephemeris module');
            }
        };

        // Form submission
        document.getElementById('calculatorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!window.Module.ccall) {
                alert('Swiss Ephemeris not loaded yet. Please wait...');
                return;
            }
            
            document.getElementById('loading').style.display = 'block';
            document.getElementById('results').style.display = 'none';
            
            try {
                const date = new Date(document.getElementById('date').value);
                const time = document.getElementById('time').value;
                const [hour, minute] = time.split(':').map(Number);
                const longitude = parseFloat(document.getElementById('longitude').value);
                const latitude = parseFloat(document.getElementById('latitude').value);
                const houseSystem = document.getElementById('houseSystem').value;
                
                // Convert coordinates to degrees, minutes, seconds
                const lonDeg = Math.floor(Math.abs(longitude));
                const lonMin = Math.floor((Math.abs(longitude) - lonDeg) * 60);
                const lonSec = Math.round(((Math.abs(longitude) - lonDeg - lonMin/60) * 3600));
                const lonEW = longitude >= 0 ? 'E' : 'W';
                
                const latDeg = Math.floor(Math.abs(latitude));
                const latMin = Math.floor((Math.abs(latitude) - latDeg) * 60);
                const latSec = Math.round(((Math.abs(latitude) - latDeg - latMin/60) * 3600));
                const latNS = latitude >= 0 ? 'N' : 'S';
                
                // Call WebAssembly function
                const result = window.Module.ccall(
                    'get',
                    'string',
                    ['number', 'number', 'number', 'number', 'number', 'number',
                     'number', 'number', 'number', 'string',
                     'number', 'number', 'number', 'string', 'string'],
                    [date.getFullYear(), date.getMonth() + 1, date.getDate(),
                     hour, minute, 0,
                     lonDeg, lonMin, lonSec, lonEW,
                     latDeg, latMin, latSec, latNS,
                     houseSystem]
                );
                
                // Display results
                const data = JSON.parse(result);
                displayResults(data);
                
            } catch (error) {
                console.error('Calculation error:', error);
                alert('Calculation failed: ' + error.message);
            } finally {
                document.getElementById('loading').style.display = 'none';
            }
        });
        
        function displayResults(data) {
            const tableDiv = document.getElementById('resultsTable');
            let html = '<table><thead><tr><th>Planet</th><th>Longitude</th><th>Latitude</th><th>Distance</th><th>Speed</th></tr></thead><tbody>';
            
            // Planets
            data.planets.forEach(planet => {
                html += `<tr><td>${planet.name}</td><td>${planet.long_s}</td><td>${planet.lat}</td><td>${planet.distance}</td><td>${planet.speed}</td></tr>`;
            });
            
            html += '<tr><td colspan="5"></td></tr>';
            
            // Angles
            data.ascmc.forEach(angle => {
                html += `<tr><td>${angle.name}</td><td>${angle.long_s}</td><td></td><td></td><td></td></tr>`;
            });
            
            html += '<tr><td colspan="5"></td></tr>';
            
            // Houses
            data.house.forEach(house => {
                html += `<tr><td>House ${house.name}</td><td>${house.long_s}</td><td></td><td></td><td></td></tr>`;
            });
            
            html += '</tbody></table>';
            
            tableDiv.innerHTML = html;
            document.getElementById('results').style.display = 'block';
        }
    </script>
    
    <script src="js/astro.js"></script>
</body>
</html>
EOF

# Create a simple README
cat > README.txt << 'EOF'
Planetary Calculator APK
=======================

This is a simple APK structure for the Planetary Calculator app.

To use this APK:

1. Install on Android device (5.0+)
2. Grant location permissions when prompted
3. The app will load the Swiss Ephemeris WebAssembly module
4. Enter date, time, and coordinates
5. Tap "Calculate Planetary Positions"

Features:
- High-precision planetary calculations
- Swiss Ephemeris accuracy (1800-2400 AD)
- All major planets and astrological houses
- Works completely offline

Note: This is a simplified APK structure for demonstration purposes.
For a full Android app, use the complete Android Studio project.
EOF

echo "✅ APK structure created successfully!"
echo ""
echo "📁 Files created:"
echo "   - AndroidManifest.xml"
echo "   - res/layout/activity_main.xml"
echo "   - res/values/strings.xml"
echo "   - res/values/styles.xml"
echo "   - assets/calculator.html"
echo "   - assets/js/astro.wasm"
echo "   - assets/js/astro.js"
echo "   - assets/js/astro.data"
echo "   - README.txt"
echo ""
echo "📱 To create a proper APK:"
echo "   1. Use Android Studio to open this project"
echo "   2. Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "   3. Or use the command line with Android SDK installed"
echo ""
echo "🎉 APK structure ready for building!"