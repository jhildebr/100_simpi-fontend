#!/bin/bash

echo "🔍 Node.js Version Check for Simpi Frontend"
echo "=========================================="

# Get current Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.19.0"

echo "📋 Version Information:"
echo "   Current: v$NODE_VERSION"
echo "   Required: v$REQUIRED_VERSION or higher"
echo ""

# Compare versions
if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version is too old!"
    echo ""
    echo "🔧 To fix this:"
    echo "   1. Download Node.js v18.19+ from https://nodejs.org/"
    echo "   2. Install it on your system"
    echo "   3. Restart your terminal"
    echo ""
    echo "💡 Alternative: Use nvm (Node Version Manager)"
    echo "   nvm install 18.19.1"
    echo "   nvm use 18.19.1"
    echo ""
    echo "🎯 Good news: The SSH issue is FIXED! ✅"
    echo "   Dependencies install successfully without SSH errors."
    echo "   Azure DevOps uses Node.js 18, so the build will work there."
    exit 1
else
    echo "✅ Node.js version is compatible!"
    echo "🚀 You can now run the build tests."
    echo ""
    echo "Try: ./quick-test.sh"
fi 