# Review Display Troubleshooting Guide

## ✅ What We Fixed

1. **Updated Frontend API URL**: Changed from `/api/reviews` to `http://localhost:3001/api/reviews`
2. **Added Comprehensive Logging**: Both frontend and backend now log detailed information to console
3. **Backend is Confirmed Working**: Test shows 5 reviews are being fetched successfully

## 🚀 How to Test

### Step 1: Start Both Servers

You need BOTH servers running simultaneously:

```bash
# Terminal 1 - Start Backend Server
npm run dev:server

# Terminal 2 - Start Frontend Server  
npm run dev
```

Or start both at once:
```bash
npm run dev:all
```

### Step 2: Run the Backend Test

```bash
./test-backend.sh
```

This will verify:
- Backend server is running
- Google API credentials are working
- Reviews are being fetched (you should see 5 reviews)

### Step 3: Check Browser Console

1. Open your website: http://localhost:5173
2. Open browser DevTools (F12 or Cmd+Option+I on Mac)
3. Go to the **Console** tab
4. Look for logs starting with 🔄, 📡, 📦, ✅

You should see:
```
🔄 Frontend: Fetching reviews from: http://localhost:3001/api/reviews
📡 Frontend: Response status: 200
📦 Frontend: Raw data received: {...}
   - Reviews count: 5
   - Rating: 4.5
✅ Frontend: Successfully set 5 reviews to state
```

### Step 4: Check Backend Terminal

Look at the terminal where your backend server is running. When the frontend fetches reviews, you should see:

```
🔍 === REVIEWS API CALLED ===
📋 Environment Check:
   - Place ID: ChIJ...
   - API Key: AIza...
🌐 Calling Google Places API...
📊 Google API Response Status: OK
✅ Data received from Google:
   - Place Name: Café Crave
   - Rating: 4.5
   - Number of Reviews: 5
📝 Raw Google Reviews: [detailed review data]
✅ Sending response with 5 reviews
```

## 🔧 Common Issues and Solutions

### Issue 1: Backend Server Not Running
**Symptom**: Frontend shows error "Failed to fetch"
**Solution**: Start backend with `npm run dev:server`

### Issue 2: CORS Error
**Symptom**: Browser console shows "CORS policy" error
**Solution**: Make sure backend server is running and .env has correct FRONTEND_URL

### Issue 3: Reviews Not Displaying but Data is Fetched
**Symptom**: Console shows reviews fetched but page shows "No reviews available yet"
**Solution**: 
- Check if reviews state is being updated (look for console logs)
- Verify the reviews array structure matches the Review interface
- Check browser console for React errors

### Issue 4: Rating Shows but Reviews Don't
**Symptom**: 4.5 rating displays but no review cards
**Solution**: 
- This means API is working but reviews array might be empty
- Check backend logs for the actual reviews being sent
- Verify frontend console shows `Reviews count: 5` or more

## 📊 What the Logs Tell You

### Backend Logs:
- `📥 GET /api/reviews` - Request received
- `✅ Data received from Google` - API call successful
- `📝 Raw Google Reviews` - The actual review data
- `✅ Sending response with X reviews` - Data sent to frontend

### Frontend Logs:
- `🔄 Fetching reviews` - Request started
- `📡 Response status: 200` - Request successful
- `📦 Raw data received` - Shows full response object
- `✅ Successfully set X reviews to state` - State updated, reviews should display

## 🎯 Next Steps

If reviews still don't show after following this guide:

1. **Refresh the page** with both servers running
2. **Clear browser cache** (Cmd+Shift+R or Ctrl+Shift+R)
3. **Check browser console** for any React errors
4. **Share the console logs** - both browser and backend terminal

The backend is confirmed working, so the issue is likely in how the frontend receives or displays the data.

