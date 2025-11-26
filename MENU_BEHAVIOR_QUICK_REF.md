# Quick Reference: Menu Page Behavior

## Current Setup (After Changes)

### 🖥️ Desktop (≥1024px)
```
✅ NO secondary navigation bar
✅ All sections ALWAYS EXPANDED
✅ Headers NOT clickable
✅ NO chevron icons
✅ Large headers (text-5xl)
✅ Natural scrolling experience
```

### 📱 Mobile (<1024px)
```
✅ NO secondary navigation bar
✅ All sections COLLAPSED by default
✅ Headers ARE clickable
✅ Chevron icons VISIBLE (▼ collapsed / ▲ expanded)
✅ Tap header to expand/collapse
✅ Smooth animations
```

---

## Section List (14 Sections)

All sections follow the same pattern:

1. Breakfast
2. Kiddies
3. Starters
4. Burgers
5. Toasties
6. Wraps
7. Mains
8. Steaks
9. Platters
10. Coffee
11. Tea
12. Drinks (Beverages)
13. Dessert
14. Bakery

---

## How It Works

### Mobile Flow
```
Page Load → All Collapsed
      ↓
User Taps Header
      ↓
Section Expands (smooth animation)
      ↓
User Reads Content
      ↓
User Taps Header Again
      ↓
Section Collapses
```

### Desktop Flow
```
Page Load → All Expanded
      ↓
User Scrolls Naturally
      ↓
Reads All Content
      ↓
No Interaction Needed
```

---

## Visual States

### Desktop
```
╔═══════════════════════════╗
║ ═══ BREAKFAST ═══         ║ ← Large header, no chevron
╠═══════════════════════════╣
║ • Avo on Toast      R75   ║
║ • Build-o-Omelette  R85   ║ ← Always visible
║ • Breakfast Muffin  R90   ║
╚═══════════════════════════╝
```

### Mobile (Collapsed)
```
┌───────────────────────────┐
│ BREAKFAST             [▼] │ ← Tap to expand
└───────────────────────────┘
```

### Mobile (Expanded)
```
┌───────────────────────────┐
│ BREAKFAST             [▲] │ ← Tap to collapse
├───────────────────────────┤
│ • Avo on Toast      R75   │
│ • Build-o-Omelette  R85   │
│ • Breakfast Muffin  R90   │
└───────────────────────────┘
```

---

## Key Features

✅ **Simple** - No complex navigation
✅ **Fast** - Less code, better performance
✅ **Clean** - More focus on content
✅ **Responsive** - Different behavior per device
✅ **Intuitive** - Tap to expand on mobile
✅ **Accessible** - Clear visual feedback

---

## Breakpoint

**1024px (lg in Tailwind)**

- Below: Mobile behavior (collapsed, clickable)
- At/Above: Desktop behavior (expanded, not clickable)

---

**Last Updated:** November 22, 2025  
**Status:** ✅ Production Ready

