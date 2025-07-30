#!/bin/bash

# Simple server launcher script for portfolio website

echo "Starting local server for portfolio website..."
echo "Press Ctrl+C to stop the server"
echo ""

# Determine if Python 3 is available
if command -v python3 &>/dev/null; then
    echo "Using Python 3 HTTP server"
    python3 -m http.server 8080
# Fall back to Python 2 if necessary
elif command -v python &>/dev/null; then
    echo "Using Python 2 SimpleHTTPServer"
    python -m SimpleHTTPServer 8080
# Try using Node.js http-server if Python is not available
elif command -v npx &>/dev/null; then
    echo "Using Node.js http-server"
    npx http-server -p 8080
else
    echo "Error: Could not find Python or Node.js to start a server."
    echo "Please install Python 3 or Node.js to use this script."
    exit 1
fi

echo "Server stopped"
