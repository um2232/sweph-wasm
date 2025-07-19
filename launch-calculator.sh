#!/bin/bash

# Planetary Position Calculator Launcher
# This script launches a local server to run the offline planetary position calculator

echo "🌌 Planetary Position Calculator"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "sweph-wasm-single/sweph-wasm.html" ]; then
    echo "❌ Error: sweph-wasm-single/sweph-wasm.html not found!"
    echo "Please run this script from the directory containing the sweph-wasm-single folder."
    exit 1
fi

# Check for Python 3
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    PYTHON_CMD="python"
else
    echo "❌ Error: Python not found!"
    echo "Please install Python 3 to run the local server."
    exit 1
fi

# Check if port 8000 is available
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 8000 is already in use. Trying port 8001..."
    PORT=8001
else
    PORT=8000
fi

echo ""
echo "🚀 Starting local server..."
echo "📁 Serving files from: $(pwd)"
echo "🌐 Server will be available at: http://localhost:$PORT"
echo ""
echo "📱 To access the calculator:"
echo "   http://localhost:$PORT/sweph-wasm-single/sweph-wasm.html"
echo ""
echo "💡 Tips:"
echo "   - The app works completely offline once loaded"
echo "   - You can install it as a Progressive Web App"
echo "   - Press Ctrl+C to stop the server"
echo ""
echo "⏳ Starting server..."

# Start the server
cd sweph-wasm-single
$PYTHON_CMD -m http.server $PORT