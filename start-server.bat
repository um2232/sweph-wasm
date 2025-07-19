@echo off
echo Starting Sweph-Wasm Local Server...
echo.
echo This will start a local web server on port 8000
echo Open your browser and go to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 3...
    python -m http.server 8000
    goto :end
)

REM Try Python 2
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 2...
    python2 -m SimpleHTTPServer 8000
    goto :end
)

REM Try Node.js http-server
npx http-server --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Node.js http-server...
    npx http-server -p 8000
    goto :end
)

REM Try PHP
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using PHP...
    php -S localhost:8000
    goto :end
)

echo Error: No suitable web server found!
echo.
echo Please install one of the following:
echo - Python 3: https://www.python.org/downloads/
echo - Node.js: https://nodejs.org/
echo - PHP: https://www.php.net/downloads.php
echo.
echo Or use the manual instructions in DOWNLOAD_GUIDE.md
pause

:end