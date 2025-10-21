# 🚀 Complete Deployment Guide - Split Hosting

## ✅ Backend Fixes Applied

All backend errors have been resolved:
- ✅ Removed unused `api/reviews.js` file
- ✅ Added ESLint configuration for Node.js
- ✅ Created `.gitignore` for backend
- ✅ Updated `package.json` with proper scripts
- ✅ Created Railway deployment configuration
- ✅ Server is ready for production deployment

---

## 📦 Part 1: Deploy Backend to Railway

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Prepared backend for Railway deployment"
git push origin main
```

### Step 2: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### Step 3: Deploy Backend

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `cafe-Crave-Website` repository
4. Click **"Deploy Now"**

### Step 4: Configure Railway

**Set Root Directory:**
1. Go to your service → **Settings**
2. Find **"Root Directory"**
3. Enter: `backend`
4. Click **"Update"**

**Add Environment Variables:**
1. Go to **Variables** tab
2. Add these variables:

```
NODE_ENV=production
GOOGLE_MAPS_API_KEY=AIzaSyAGbH-SRvILXgNPxv_xK12qXPOkJwqRxcw
GOOGLE_PLACE_ID=ChIJt6okC5RDzB0Rsx3m6aJpC5E
FRONTEND_URL=https://yourdomain.com
```

(Replace `yourdomain.com` with your actual Hostinger domain)

### Step 5: Get Your Railway URL

1. After deployment completes (2-3 minutes)
2. Railway will give you a URL like: `https://cafe-crave-api-production-xxxx.up.railway.app`
3. **Save this URL** - you'll need it for the frontend!

### Step 6: Test Your Backend

Visit these URLs to verify:
- `https://your-railway-url.up.railway.app/api/health` → Should return `{"status":"ok"}`
- `https://your-railway-url.up.railway.app/api/reviews` → Should return Google reviews

---

## 🎨 Part 2: Prepare Frontend for Hostinger

### Step 1: Update GoogleReviews Component

Open `src/components/GoogleReviews.tsx` and find this line (around line 27):

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

Replace it with your Railway URL:

```typescript
const API_BASE_URL = 'https://your-railway-url.up.railway.app';
```

**OR** create a `.env.production` file in your root directory:

```bash
VITE_API_URL=https://your-railway-url.up.railway.app
```

### Step 2: Build the Frontend

```bash
npm run build
```

This creates a `/dist` folder with your production-ready files.

### Step 3: Upload to Hostinger

1. **Login to Hostinger hPanel**
2. **Go to File Manager**
3. **Navigate to `public_html`** (or your domain folder)
4. **Delete old files** (backup first if needed!)
5. **Upload ALL contents from `/dist`:**
   - `index.html`
   - `assets/` folder
   - All other files

**Important:** Upload the **contents** of `/dist`, not the folder itself!

### Step 4: Create .htaccess File

In the same folder where you uploaded your files, create `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite everything else to index.html
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Step 5: Update CORS on Railway

Now that you know your Hostinger domain, update Railway:

1. Go to Railway → Variables
2. Update `FRONTEND_URL` to your actual domain: `https://yourdomain.com`
3. Save changes

---

## ✅ Verification Checklist

### Backend (Railway)
- [ ] Railway deployment successful
- [ ] Health endpoint works: `/api/health`
- [ ] Reviews endpoint works: `/api/reviews`
- [ ] Environment variables are set
- [ ] Logs show server running

### Frontend (Hostinger)
- [ ] All files uploaded from `/dist`
- [ ] `.htaccess` file created
- [ ] Homepage loads
- [ ] All routes work (no 404 on refresh)
- [ ] Reviews section loads
- [ ] No console errors

---

## 🔧 Troubleshooting

### Reviews Not Loading

**Check:**
1. Railway backend is running (visit health endpoint)
2. Railway URL is correct in `GoogleReviews.tsx`
3. CORS is configured (`FRONTEND_URL` matches your domain)
4. Browser console for error messages

**Fix:**
```bash
# Rebuild frontend with correct Railway URL
npm run build
# Re-upload /dist contents to Hostinger
```

### 404 Errors on Page Refresh

**Problem:** `.htaccess` not working

**Fix:**
1. Verify `.htaccess` exists in the same folder as `index.html`
2. Check file permissions (should be 644)
3. Contact Hostinger to enable `mod_rewrite`

### CORS Errors in Console

**Problem:** Railway `FRONTEND_URL` doesn't match your domain

**Fix:**
1. Go to Railway → Variables
2. Ensure `FRONTEND_URL=https://yourdomain.com` (exact match, with https://)
3. Redeploy if needed

---

## 💰 Cost Summary

| Service | Plan | Cost |
|---------|------|------|
| Hostinger | Shared Hosting | $3-5/month |
| Railway | Hobby Plan | $0-5/month |
| **Total** | | **$3-10/month** |

Railway free tier includes $5 credit/month, which is usually enough for low-traffic sites.

---

## 🎯 Quick Commands Reference

```bash
# Backend (local testing)
cd backend
npm install
npm start                    # Runs on :3001

# Frontend (local testing)
npm run dev                  # Runs on :5173

# Frontend (production build)
npm run build                # Creates /dist folder

# Deploy updates
git add .
git commit -m "Update"
git push origin main         # Railway auto-deploys
npm run build                # Then re-upload /dist to Hostinger
```

---

## 📝 File Structure After Deployment

**On Railway (Backend):**
```
backend/
├── server.js       ← Running
├── package.json
├── .env           ← Environment variables
└── node_modules/
```

**On Hostinger (Frontend):**
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── .htaccess
```

---

## 🚀 You're Ready!

Your backend is now error-free and ready for Railway deployment. Follow the steps above to deploy both services.

**Questions?** Check Railway docs at [docs.railway.app](https://docs.railway.app)

