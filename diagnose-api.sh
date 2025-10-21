#!/bin/bash

echo "🔧 COMPREHENSIVE API DIAGNOSTICS"
echo "=================================="
echo ""

# 1. Check .env file
echo "1️⃣ Checking .env configuration..."
if [ -f .env ]; then
    echo "   ✅ .env file exists"

    # Check API Key (without revealing it)
    if grep -q "GOOGLE_MAPS_API_KEY=AIza" .env; then
        echo "   ✅ GOOGLE_MAPS_API_KEY is configured"
    else
        echo "   ❌ GOOGLE_MAPS_API_KEY is NOT properly configured"
    fi

    # Check Place ID
    if grep -q "GOOGLE_PLACE_ID=ChIJ" .env; then
        echo "   ✅ GOOGLE_PLACE_ID is configured"
    else
        echo "   ❌ GOOGLE_PLACE_ID is NOT properly configured"
    fi
else
    echo "   ❌ .env file NOT FOUND!"
fi

echo ""
echo "2️⃣ Testing Google Places API directly..."

# Extract credentials from .env
API_KEY=$(grep "GOOGLE_MAPS_API_KEY=" .env | cut -d '=' -f2)
PLACE_ID=$(grep "GOOGLE_PLACE_ID=" .env | cut -d '=' -f2)

if [ -n "$API_KEY" ] && [ -n "$PLACE_ID" ]; then
    echo "   🌐 Calling Google Places API..."
    RESPONSE=$(curl -s "https://maps.googleapis.com/maps/api/place/details/json?place_id=$PLACE_ID&fields=name,rating,reviews&key=$API_KEY")

    # Check status
    STATUS=$(echo $RESPONSE | grep -o '"status" : "[^"]*"' | cut -d '"' -f4)
    echo "   📊 API Status: $STATUS"

    if [ "$STATUS" = "OK" ]; then
        echo "   ✅ Google API is working!"

        # Extract place name
        NAME=$(echo $RESPONSE | grep -o '"name" : "[^"]*"' | head -1 | cut -d '"' -f4)
        echo "   📍 Place: $NAME"

        # Count reviews
        REVIEW_COUNT=$(echo $RESPONSE | grep -o '"author_name"' | wc -l | tr -d ' ')
        echo "   📝 Reviews found: $REVIEW_COUNT"
    else
        echo "   ❌ Google API Error: $STATUS"
        ERROR_MSG=$(echo $RESPONSE | grep -o '"error_message" : "[^"]*"' | cut -d '"' -f4)
        if [ -n "$ERROR_MSG" ]; then
            echo "   ⚠️  Error message: $ERROR_MSG"
        fi
    fi
else
    echo "   ❌ Cannot test - credentials not found in .env"
fi

echo ""
echo "3️⃣ Checking if backend server is running..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "   ✅ Backend server is RUNNING on port 3001"
else
    echo "   ❌ Backend server is NOT running"
    echo "   💡 Start it with: npm run dev:server"
fi

echo ""
echo "=================================="
echo "✅ Diagnostics complete!"
echo ""
echo "📋 Summary of what to check:"
echo "   1. If Google API test worked, your credentials are correct"
echo "   2. If backend server is NOT running, start it with: npm run dev:all"
echo "   3. Check browser console at http://localhost:5173 for frontend logs"
echo "   4. Check terminal where server runs for backend logs"

