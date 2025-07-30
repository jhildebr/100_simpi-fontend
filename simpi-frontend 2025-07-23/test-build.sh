#!/bin/bash

echo "🧪 Testing Simpi Frontend Build in Docker..."
echo "This simulates the Azure DevOps build environment"

# Build the Docker image
echo "📦 Building Docker image..."
docker build -f Dockerfile.test -t simpi-build-test .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ BUILD SUCCESSFUL!"
    echo "🎉 The build will work in Azure DevOps"
    echo ""
    echo "You can now safely propose this to your development team."
else
    echo "❌ BUILD FAILED!"
    echo "🔧 Fix the issues before sharing with the team."
fi 