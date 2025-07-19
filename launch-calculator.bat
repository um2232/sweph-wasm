@echo off
chcp 65001 >nul

REM Planetary Position Calculator Launcher
REM This script launches a local server to run the offline planetary position calculator

echo 🌌 Planetary Position Calculator
echo ================================
echo.

REM Check if we're in the right directory
if not exist "sweph-wasm-single\sweph-wasm.html" (
    echo ❌ Error: sweph-wasm-single\sweph-wasm.html not found!
    echo Please run this script from the directory containing the sweph-wasm-single folder.
    pause
    exit /b 1
)

REM Check for Python 3
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python found
    set PYTHON_CMD=python
) else (
    python3 --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Python 3 found
        set PYTHON_CMD=python3
    ) else (
        echo ❌ Error: Python not found!
        echo Please install Python 3 to run the local server.
        pause
        exit /b 1
    )
)

REM Check if port 8000 is available
netstat -an | find "8000" | find "LISTENING" >nul
if %errorlevel% equ 0 (
    echo ⚠️  Port 8000 is already in use. Trying port 8001...
    set PORT=8001
) else (
    set PORT=8000
)

echo.
echo 🚀 Starting local server...
echo 📁 Serving files from: %cd%
echo 🌐 Server will be available at: http://localhost:%PORT%
echo.
echo 📱 To access the calculator:
echo    http://localhost:%PORT%/sweph-wasm-single/sweph-wasm.html
echo.
echo 💡 Tips:
echo    - The app works completely offline once loaded
echo    - You can install it as a Progressive Web App
echo    - Press Ctrl+C to stop the server
echo.
echo ⏳ Starting server...

REM Start the server
cd sweph-wasm-single
%PYTHON_CMD% -m http.server %PORT%