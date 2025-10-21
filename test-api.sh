#!/bin/bash

echo "🔍 Google Reviews API Troubleshooting Script"
echo "=============================================="
echo ""

# Check if .env file exists
if [ -f .env ]; then
    echo "✅ .env file exists"
    echo ""
    echo "📋 Checking environment variables..."

    # Check if variables are set (without showing actual values)
    if grep -q "GOOGLE_MAPS_API_KEY=" .env; then
        API_KEY=$(grep "GOOGLE_MAPS_API_KEY=" .env | cut -d '=' -f2)
        if [ "$API_KEY" = "your_google_maps_api_key_here" ] || [ -z "$API_KEY" ]; then
            echo "❌ GOOGLE_MAPS_API_KEY is not configured"
        else
            echo "✅ GOOGLE_MAPS_API_KEY is set"
        fi
    else
        echo "❌ GOOGLE_MAPS_API_KEY not found in .env"
    fi

    if grep -q "GOOGLE_PLACE_ID=" .env; then
        PLACE_ID=$(grep "GOOGLE_PLACE_ID=" .env | cut -d '=' -f2)
        if [ "$PLACE_ID" = "your_google_place_id_here" ] || [ -z "$PLACE_ID" ]; then
            echo "❌ GOOGLE_PLACE_ID is not configured"
        else
            echo "✅ GOOGLE_PLACE_ID is set"
        fi
    else
        echo "❌ GOOGLE_PLACE_ID not found in .env"
    fi
else
    echo "❌ .env file not found!"
    echo "   Please create it by copying .env.example:"
    echo "   cp .env.example .env"
fi

echo ""
echo "🌐 Testing API endpoints..."
echo ""

# Test if server is running
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Backend server is running on port 3001"
    echo ""

    # Test configuration endpoint
    echo "📋 Configuration Test:"
    curl -s http://localhost:3001/api/test | python3 -m json.tool || curl -s http://localhost:3001/api/test

    echo ""
    echo ""
    echo "📝 Reviews Test:"
    curl -s http://localhost:3001/api/reviews | python3 -m json.tool || curl -s http://localhost:3001/api/reviews

else
    echo "❌ Backend server is NOT running!"
    echo "   Please start it with: npm run dev:server"
    echo "   Or run both servers: npm run dev:all"
fi

echo ""
echo "=============================================="
echo "✅ Troubleshooting complete!"
echo ""
echo "Next steps:"
echo "1. Make sure .env has valid credentials"
echo "2. Run: npm run dev:all"
echo "3. Check browser console at http://localhost:5173"
echo "4. Check terminal logs for detailed output"

