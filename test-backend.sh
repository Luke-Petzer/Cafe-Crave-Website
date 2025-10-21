#!/bin/bash

echo "🧪 BACKEND API TESTING SCRIPT"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if server is running
echo "1️⃣ Testing if backend server is running..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend server is RUNNING${NC}"
    HEALTH=$(curl -s http://localhost:3001/api/health)
    echo "   Response: $HEALTH"
else
    echo -e "${RED}❌ Backend server is NOT running${NC}"
    echo -e "${YELLOW}   Please start it with: npm run dev:server${NC}"
    exit 1
fi

echo ""
echo "2️⃣ Testing configuration endpoint..."
CONFIG=$(curl -s http://localhost:3001/api/test)
echo "   Configuration: $CONFIG"

echo ""
echo "3️⃣ Testing reviews endpoint..."
echo "   Fetching reviews from Google Places API..."
REVIEWS=$(curl -s http://localhost:3001/api/reviews)

# Pretty print the response
echo "   Response:"
echo "$REVIEWS" | python3 -m json.tool 2>/dev/null || echo "$REVIEWS"

# Check if reviews were returned
REVIEW_COUNT=$(echo "$REVIEWS" | grep -o '"id"' | wc -l | tr -d ' ')
RATING=$(echo "$REVIEWS" | grep -o '"rating":[0-9.]*' | head -1 | cut -d':' -f2)

echo ""
echo "📊 Results:"
echo "   - Reviews returned: $REVIEW_COUNT"
echo "   - Overall rating: $RATING"

if [ "$REVIEW_COUNT" -gt "0" ]; then
    echo -e "${GREEN}✅ Backend is working correctly!${NC}"
    echo ""
    echo "If reviews still don't show on the website:"
    echo "   1. Check browser console (F12) for frontend logs"
    echo "   2. Make sure frontend is running on http://localhost:5173"
    echo "   3. Check for CORS errors in browser console"
else
    echo -e "${RED}⚠️  No reviews returned${NC}"
    echo "   Check the backend server terminal for error details"
fi

echo ""
echo "=================================="

