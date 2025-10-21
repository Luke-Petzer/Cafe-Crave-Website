# Google Reviews API Setup Guide

## 🎯 Overview
This backend API securely fetches Google Reviews for your café without exposing your API key to the frontend.

## 📋 Setup Instructions

### Step 1: Install Dependencies
Run this command to install the required packages:
```bash
npm install
```

This will install:
- `express` - Backend server
- `cors` - Enable cross-origin requests
- `dotenv` - Load environment variables
- `concurrently` - Run multiple scripts simultaneously

### Step 2: Get Your Google API Credentials

#### A. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Places API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

#### B. Get Your Google Place ID
1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for "Café Crave" or your café address
3. Copy the Place ID (looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   GOOGLE_PLACE_ID=your_actual_place_id_here
   FRONTEND_URL=http://localhost:5173
   PORT=3001
   ```

⚠️ **IMPORTANT**: Never commit `.env` to Git - it's already in `.gitignore`

### Step 4: Run the Application

#### Development Mode (Recommended)
Run both frontend and backend together:
```bash
npm run dev:all
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

#### Run Separately (Alternative)
Terminal 1 - Backend:
```bash
npm run dev:server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### Step 5: Test the API

#### Test API Health
Open your browser to: http://localhost:3001/api/health

You should see:
```json
{"status":"ok","message":"API server is running"}
```

#### Test Reviews Endpoint
Open: http://localhost:3001/api/reviews

You should see your Google reviews data.

## 📁 File Structure
```
Cafe-Crave-Website/
├── server.js              # Express backend server
├── api/
│   └── reviews.js         # Serverless function (for Vercel deployment)
├── .env                   # Your API keys (DO NOT COMMIT)
├── .env.example           # Template for environment variables
├── vite.config.ts         # Vite config with API proxy
└── src/
    └── components/
        └── GoogleReviews.tsx  # Frontend component
```

## 🚀 Deployment

### For Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_MAPS_API_KEY`
   - `GOOGLE_PLACE_ID`

The `api/reviews.js` file will work automatically as a serverless function.

### For Hostinger or VPS
1. Upload all files including `server.js`
2. Install dependencies: `npm install --production`
3. Set environment variables on your server
4. Start server: `node server.js`
5. Use a process manager like PM2: `pm2 start server.js`

## 🔒 Security Notes
- ✅ API keys are stored server-side only
- ✅ CORS is configured to only allow your domain
- ✅ `.env` file is ignored by Git
- ✅ Rate limiting should be added for production

## 🐛 Troubleshooting

### "API configuration missing" error
- Check your `.env` file exists and has the correct keys
- Restart the server after changing `.env`

### CORS errors
- Make sure both servers are running
- Check `FRONTEND_URL` in `.env` matches your frontend URL

### No reviews showing
- Verify your Place ID is correct
- Check browser console for errors
- Test the API endpoint directly: http://localhost:3001/api/reviews

## 📝 Update Google Reviews Link
In `GoogleReviews.tsx`, update the review link (line 110):
```typescript
href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
```

Replace `YOUR_GOOGLE_PLACE_ID` with your actual Place ID.

## 🎉 You're All Set!
Your Google Reviews should now be loading on your homepage!

