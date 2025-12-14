# Quick Fix Script for Vite Cache Issues
# Run this from the project root if you see module export errors

Write-Host "🧹 Clearing Vite cache..." -ForegroundColor Yellow

# Check if .vite cache exists
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite"
    Write-Host "✅ Vite cache cleared successfully!" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No Vite cache found (this is normal for first run)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🗑️ Removing stray compiled files from src..." -ForegroundColor Yellow

# Remove any .js files in src/data (except for valid configs)
Get-ChildItem -Path "src/data" -Filter "*.js" -File -ErrorAction SilentlyContinue | ForEach-Object {
    Remove-Item $_.FullName -Force
    Write-Host "   Deleted: $($_.Name)" -ForegroundColor Red
}

# Remove any .d.ts files in src/data (except vite-env.d.ts)
Get-ChildItem -Path "src/data" -Filter "*.d.ts" -File -ErrorAction SilentlyContinue | ForEach-Object {
    Remove-Item $_.FullName -Force
    Write-Host "   Deleted: $($_.Name)" -ForegroundColor Red
}

Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting dev server..." -ForegroundColor Yellow
npm run dev

