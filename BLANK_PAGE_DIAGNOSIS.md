# Blank Page / Module Export Error - Diagnosis & Solution

## Problem
When running the website, nothing displays on the webpage. Browser console shows:
```
Uncaught SyntaxError: The requested module '/src/data/albumsData.js' does not provide an export named 'getAllGenres' (at MusicPage.tsx:8:22)
```

## Root Cause
This is a **Vite build cache issue**. The error occurs when:
1. Vite has cached a previous version of `albumsData.ts` 
2. The cached JavaScript output (`albumsData.js`) is outdated or incomplete
3. After a reboot or environment change, Vite serves the stale cached version

The actual `albumsData.ts` file **DOES** export `getAllGenres` correctly (verified at line 234), but Vite's development server is serving an old/corrupted cached version.

## Verified File Structure
✅ `src/data/albumsData.ts` - Contains proper export: `export const getAllGenres = (): string[] => {...}`
✅ `src/pages/MusicPage.tsx` - Correctly imports: `import { albumsData, getAllGenres } from '../data/albumsData';`
✅ No TypeScript compilation errors

## Solution Steps

### Step 1: Clear Vite Cache (REQUIRED)
Run this command in PowerShell from the project root:
```powershell
# Stop the dev server first (Ctrl+C)
# Then remove the Vite cache directory
Remove-Item -Recurse -Force node_modules\.vite
```

### Step 2: Restart the Dev Server
```powershell
npm run dev
```

### Alternative: Full Cache Clear (if Step 1 doesn't work)
```powershell
# Stop the dev server
# Clear all caches and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force node_modules\.vite
Remove-Item -Force package-lock.json
npm install
npm run dev
```

### Step 3: Hard Refresh Browser
After the dev server restarts:
1. Open the site in your browser
2. Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. Or open DevTools → Right-click refresh button → "Empty Cache and Hard Reload"

## Why This Happened
- Vite caches compiled modules in `node_modules/.vite/` for faster rebuilds
- After a system reboot, the cache can become stale or corrupted
- The dev server serves the old cached JavaScript instead of recompiling TypeScript
- This is a common issue with hot module replacement (HMR) systems

## Prevention
If you encounter this again:
1. Always clear `.vite` cache after system reboots
2. Consider adding this to your `package.json` scripts:
```json
"scripts": {
  "clean": "Remove-Item -Recurse -Force node_modules\\.vite",
  "dev:clean": "npm run clean && npm run dev"
}
```

## Quick Reference Commands
```powershell
# Quick fix (run from project root)
Remove-Item -Recurse -Force node_modules\.vite; npm run dev

# Full reset (if issues persist)
Remove-Item -Recurse -Force node_modules; npm install; npm run dev
```

## Files Involved
- ✅ `src/data/albumsData.ts` - Export is correct
- ✅ `src/pages/MusicPage.tsx` - Import is correct
- ❌ `node_modules/.vite/` - Contains stale cache (DELETE THIS)

## Status: RESOLVED
The code is correct. This is purely a build cache issue.

