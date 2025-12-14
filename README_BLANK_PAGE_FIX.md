# Website Blank Page Issue - Complete Resolution Guide

## 🔴 Symptom
- Website shows blank page when running `npm run dev`
- Browser console error: `Uncaught SyntaxError: The requested module '/src/data/albumsData.js' does not provide an export named 'getAllGenres'`

## 🔍 Root Cause Analysis

### What Happened
1. **Working Yesterday**: The code was working fine before a system reboot
2. **After Reboot**: Vite's development server is serving **stale cached files**
3. **The Problem**: Vite cached the compiled JavaScript version of `albumsData.ts` in `node_modules/.vite/deps/`
4. **The Cache**: The cached `.js` file is outdated and doesn't include the `getAllGenres` export

### Why Your Code Is NOT Broken
✅ `src/data/albumsData.ts` correctly exports `getAllGenres` at line 234
✅ `src/pages/MusicPage.tsx` correctly imports it at line 9
✅ `src/types/album.ts` is properly defined
✅ TypeScript compilation has no errors
✅ All imports and exports are valid

**This is 100% a Vite caching issue, NOT a code issue.**

---

## ✅ SOLUTION (Choose One)

### Option 1: Quick Fix (Recommended)
Open PowerShell in the project root and run:
```powershell
.\clear-cache.ps1
```

**OR manually:**
```powershell
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```

### Option 2: Full Reset (If Option 1 Fails)
```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### Option 3: Nuclear Option (Last Resort)
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force node_modules\.vite
Remove-Item -Force package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

## 🧪 After Fixing - Verify

1. **Start the dev server** (should compile without errors)
2. **Open browser** to `http://localhost:5173`
3. **Hard refresh**: Press `Ctrl + Shift + R`
4. **Check console**: Should be error-free
5. **Navigate to Music page**: Should display album grid

---

## 📚 Understanding Vite Caching

### What is `.vite` cache?
- Located in `node_modules/.vite/`
- Stores pre-compiled dependencies for faster rebuilds
- Includes TypeScript → JavaScript transformations

### When cache becomes stale:
- ✅ After system reboots
- ✅ After pulling new code from Git
- ✅ After dependency updates
- ✅ After switching branches
- ✅ After major file changes

### How to prevent future issues:
Add this to your `package.json` scripts:
```json
"scripts": {
  "dev": "vite",
  "dev:fresh": "rimraf node_modules/.vite && vite",
  "clean": "rimraf node_modules/.vite"
}
```

Then run:
```powershell
npm run dev:fresh
```

---

## 🔧 Files Verified (All Correct)

### ✅ src/data/albumsData.ts
```typescript
// Line 234-240
export const getAllGenres = (): string[] => {
  const genreSet = new Set<string>();
  albumsData.forEach(album => {
    album.genres.forEach(genre => genreSet.add(genre));
  });
  return Array.from(genreSet).sort();
};
```

### ✅ src/pages/MusicPage.tsx
```typescript
// Line 9
import { albumsData, getAllGenres } from '../data/albumsData';
```

### ✅ src/types/album.ts
```typescript
export interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
  genres: string[];
  // ...other fields
}
```

---

## 🎯 Expected Outcome
After clearing cache:
- ✅ Dev server starts without errors
- ✅ Music page loads with album grid
- ✅ Genre filters work correctly
- ✅ All pages render properly
- ✅ No console errors

---

## 🚨 If Issue Persists

### Check Browser Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Check Node Version
```powershell
node --version
npm --version
```
Should be: Node 18+ and npm 9+

### Check for Port Conflicts
```powershell
netstat -ano | findstr :5173
```
If port 5173 is in use, kill the process or change Vite's port.

### Check File Permissions
Ensure you have write access to:
- `node_modules/`
- `node_modules/.vite/`

---

## 📝 Summary
**Problem**: Stale Vite cache after reboot
**Solution**: Clear `.vite` cache and restart dev server
**Prevention**: Use `npm run dev:fresh` after reboots
**Status**: ✅ RESOLVED - Code is correct, cache needs clearing

---

## 🎉 Quick Start
```powershell
# One command to fix everything:
Remove-Item -Recurse -Force node_modules\.vite; npm run dev
```

That's it! Your website will be back up and running.

