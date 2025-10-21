# Café Crave Backend - Railway Deployment

Backend API server for Café Crave website.

## 🚀 Quick Deploy to Railway

1. **Push to GitHub**
2. **Connect Railway to your repo**
3. **Set root directory to `/backend`**
4. **Add environment variables** (see below)
5. **Deploy!**

## 📋 Required Environment Variables

Add these in Railway dashboard:

```
NODE_ENV=production
GOOGLE_MAPS_API_KEY=your_actual_api_key
GOOGLE_PLACE_ID=your_actual_place_id
FRONTEND_URL=https://yourdomain.com
```

## 🔗 API Endpoints

- `GET /api/health` - Health check
- `GET /api/reviews` - Fetch Google reviews
- `GET /api/test` - Test configuration

## 📝 Local Development

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3001`
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}

