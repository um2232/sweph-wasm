#!/bin/bash

echo "Starting Sweph-Wasm Local Server..."
echo ""
echo "This will start a local web server on port 8000"
echo "Open your browser and go to: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try Python 3 first
if command -v python3 &> /dev/null; then
    echo "Using Python 3..."
    python3 -m http.server 8000
    exit 0
fi

# Try Python 2
if command -v python2 &> /dev/null; then
    echo "Using Python 2..."
    python2 -m SimpleHTTPServer 8000
    exit 0
fi

# Try Python (generic)
if command -v python &> /dev/null; then
    echo "Using Python..."
    python -m http.server 8000
    exit 0
fi

# Try Node.js http-server
if command -v npx &> /dev/null; then
    echo "Using Node.js http-server..."
    npx http-server -p 8000
    exit 0
fi

# Try PHP
if command -v php &> /dev/null; then
    echo "Using PHP..."
    php -S localhost:8000
    exit 0
fi

echo "Error: No suitable web server found!"
echo ""
echo "Please install one of the following:"
echo "- Python 3: https://www.python.org/downloads/"
echo "- Node.js: https://nodejs.org/"
echo "- PHP: https://www.php.net/downloads.php"
echo ""
echo "Or use the manual instructions in DOWNLOAD_GUIDE.md"
read -p "Press Enter to continue..."