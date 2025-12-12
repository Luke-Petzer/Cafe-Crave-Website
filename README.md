# Café Crave Website - Modern Retro Newspaper Design System

## 🎨 Design Philosophy

A React/Vite website featuring a unique "Modern Retro Newspaper" aesthetic that blends editorial design principles with contemporary web technologies. This design system creates an immersive experience that feels like a curated publication rather than a standard website template.

---

## 📋 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Design System Overview](#design-system-overview)
3. [Typography](#typography)
4. [Color Palette](#color-palette)
5. [Core Components](#core-components)
6. [Page-by-Page Design](#page-by-page-design)
7. [Implementation Guide](#implementation-guide)
8. [CSS Utilities](#css-utilities)
9. [Performance Optimizations](#performance-optimizations)
10. [Maintenance](#maintenance)

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with custom extended theme)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM

### Development Environment
- **Node.js:** v18+
- **Package Manager:** npm/yarn
- **IDE:** JetBrains WebStorm (or any modern IDE)

---

## 🎨 Design System Overview

### The Concept
The "Newspaper" design system transforms a digital café website into a living editorial experience. Every element mimics the tactile, organic feel of printed media while maintaining modern web functionality.

### Core Design Principles

1. **Hierarchy Through Typography** - Headlines dominate, body copy flows naturally
2. **White Space as Ink Saver** - Strategic spacing mimics editorial layouts
3. **Texture Over Flatness** - Paper grain, noise, and sepia filters add depth
4. **Asymmetry with Purpose** - Slight rotations and offsets create organic feel
5. **Black & White Foundation** - Color is used sparingly for maximum impact

---

## 📝 Typography

### Font Families

#### 1. Playfair Display (Headlines)
**Purpose:** Main headlines, mastheads, feature titles  
**Weights:** 400 (Regular), 700 (Bold)  
**Character:** High-contrast serifs mimicking vintage newspaper mastheads

```html
<!-- Google Fonts Import -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

**Usage:**
```tsx
className="font-headline text-6xl md:text-8xl font-bold"
```

#### 2. Lora (Body Copy)
**Purpose:** Article text, descriptions, long-form content  
**Weights:** 400 (Regular), 400 Italic, 600 (Semi-Bold)  
**Character:** Highly readable serif optimized for body text

```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

**Usage:**
```tsx
className="font-body text-lg leading-relaxed text-justify"
```

#### 3. Oswald (Accent/Navigation)
**Purpose:** Section headers, navigation, labels  
**Weights:** 500 (Medium)  
**Character:** Condensed sans-serif for uppercase emphasis

```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" rel="stylesheet">
```

**Usage:**
```tsx
className="font-accent text-sm tracking-widest uppercase"
```

#### 4. Courier New (Typewriter)
**Purpose:** Dates, timestamps, testimonials  
**Weights:** System default  
**Character:** Monospace for "typed" authenticity

**Usage:**
```tsx
className="font-typewriter text-sm"
```

### Typography Scale

```javascript
// Headline Sizes
text-6xl  // 3.75rem (60px)
text-7xl  // 4.5rem (72px)
text-8xl  // 6rem (96px)

// Body Sizes
text-base // 1rem (16px)
text-lg   // 1.125rem (18px)
text-xl   // 1.25rem (20px)
```

---

## 🎨 Color Palette

### Primary Colors

#### Paper (Background)
```css
#FDFBF7 /* Warm off-white cream */
```
**Usage:** Primary background for most sections  
**Purpose:** Mimics aged newsprint without harsh white

#### Ink (Primary Text)
```css
#231F20 /* Soft charcoal */
```
**Usage:** All body copy and headlines  
**Purpose:** Softer than pure black, reduces eye strain

#### Rust (Accent)
```css
#8B2E2E /* Deep rust red */
```
**Usage:** Stamps, borders, hover states, CTAs  
**Purpose:** The "editorial red pen" - draws attention

#### Espresso (Dark Sections)
```css
#1A1614 /* Deep brown-black */
```
**Usage:** Footer, dark feature sections  
**Purpose:** Alternative to pure black for contrast

#### Washed Brown (Borders)
```css
#DCCfc6 /* Light tan */
```
**Usage:** Divider lines, subtle borders  
**Purpose:** Gentle separation without harshness

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        paper: '#FDFBF7',
        ink: '#231F20',
        rust: '#8B2E2E',
        espresso: '#1A1614',
        'washed-brown': '#DCCfc6',
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'serif'],
        body: ['"Lora"', 'serif'],
        accent: ['"Oswald"', 'sans-serif'],
        typewriter: ['"Courier New"', 'Courier', 'monospace'],
      },
    },
  },
}
```

---

## 🧩 Core Components

### 1. Masthead (Navigation)

**Location:** `src/components/Masthead.tsx`

**Features:**
- Sticky top navigation with dateline bar
- Centered brand name with massive typography
- Animated hamburger menu (drawer-style)
- "Index" page navigation system

**Key Elements:**
```tsx
// Top dateline
<span className="font-accent tracking-widest text-xs uppercase">
  Est. 2020 | Daily: 7am - 4pm | Cape Town
</span>

// Main brand
<h1 className="font-headline text-6xl font-bold tracking-tight">
  CAFÉ CRAVE
</h1>
```

### 2. TornEdge (Section Divider)

**Location:** `src/components/NewspaperComponents.tsx`

**Purpose:** Creates visual separation between sections with a "torn paper" effect

**Usage:**
```tsx
import { TornEdge } from '../components/NewspaperComponents';

<section>Content Here</section>
<TornEdge />
<section>Next Section</section>
```

### 3. StampBadge

**Location:** `src/components/NewspaperComponents.tsx`

**Purpose:** Circular rotating badges for "Halal", "Best Seller", etc.

**Variants:**
- Rotating animation
- Static with tilt
- With circular text path

**Example:**
```tsx
<StampBadge text="STRICTLY HALAL" size="lg" />
```

### 4. ClassifiedAdCard

**Location:** `src/components/NewspaperComponents.tsx`

**Purpose:** Menu items styled as newspaper classified ads

**Features:**
- Dashed double border
- Newspaper filter on images
- Scissors icon for "coupon" feel
- Hover state transitions

### 5. DottedLeader

**Location:** `src/components/NewspaperComponents.tsx`

**Purpose:** Connects menu item names to prices with dotted line

**Usage:**
```tsx
<div className="flex items-baseline">
  <span>Item Name</span>
  <DottedLeader />
  <span>R90</span>
</div>
```

---

## 📄 Page-by-Page Design

### Home Page

**File:** `src/pages/NewspaperHomePage.tsx`

#### Sections:

1. **Hero: "The Daily Grind"**
   - Split layout (60% text, 40% image)
   - Drop cap on first paragraph
   - Rotating "Strictly Halal" stamp
   - Polaroid-style image frame

2. **Scenes from the Café**
   - Asymmetric 3-column grid
   - Image captions in italics
   - Hover effects with scale

3. **Featured Menu Items**
   - Classified ad card grid
   - Newspaper filter on images
   - Dashed borders (not shadows)

4. **On The Air (Vinyl Section)**
   - Dark espresso background with texture
   - Animated spinning record
   - Numbered chart list

5. **Letters to the Editor (Reviews)**
   - Masonry grid layout
   - Typewriter font for text
   - Ragged edges with CSS clip-path

6. **The Society Pages (Instagram)**
   - Film strip layout on mobile (horizontal scroll)
   - Polaroid frames with rotation
   - Newspaper filter

### About Page

**File:** `src/pages/About.tsx`

#### Sections:

1. **The Lead Story (Hero)**
   - VOL. I dateline
   - Massive headline with italic accent
   - 3-column text, 2-column image split
   - Drop cap on opening paragraph

2. **The Narrative (2-Column Article)**
   - CSS columns with hyphenation
   - Pull quote with top/bottom borders
   - Justified text with proper spacing

3. **The Archive (Timeline)**
   - Vertical dotted line
   - Stamp-style date markers
   - Textured espresso background

4. **The Manifesto (Values Grid)**
   - 2x2 grid with borders
   - Numbered sections (01-04)
   - Icons with hover states

5. **Staff Writers (Team)**
   - Polaroid photo cards
   - Grayscale to color hover
   - "ON SHIFT" stamp badges

### Menu Page

**File:** `src/pages/MenuPage.tsx`

**Layout:** 3-column newspaper grid

**Features:**
- Inverted headers (white text on black)
- Dotted line price leaders
- Decorative "advertisement" filler boxes
- Category dividers with dashed borders

### Music Page

**File:** `src/pages/MusicPage.tsx`

**Concept:** "Radio Chart" or "Top 10 Singles"

**Features:**
- Numbered vinyl records
- Spinning record player visual
- Album cover Polaroids
- Year badges in typewriter font

---

## 🚀 Implementation Guide

### Initial Setup

1. **Install Dependencies**
```bash
npm install framer-motion lucide-react
```

2. **Configure Tailwind**
Copy the color and font configuration from section above into `tailwind.config.js`

3. **Add Google Fonts**
Add to `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Oswald:wght@500&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

4. **Update Global CSS**
Copy all custom classes from `src/index.css` (detailed below)

### File Structure

```
src/
├── components/
│   ├── Masthead.tsx              # Main navigation
│   ├── Footer.tsx                # Site footer
│   ├── SEO.tsx                   # Meta tags component
│   ├── NewspaperComponents.tsx   # TornEdge, Stamp, etc.
│   └── ScrollAnimationObserver.tsx
├── pages/
│   ├── About.tsx                 # About/Origin Story
│   ├── MenuPage.tsx              # Food & Drinks menu
│   ├── MusicPage.tsx             # Vinyl collection
│   ├── EventsPage.tsx            # Events calendar
│   └── ContactPage.tsx           # Contact information
├── assets/
│   └── [images].webp             # Optimized images
├── index.css                     # Global styles + utilities
└── App.tsx                       # Main app component
```

---

## 🎨 CSS Utilities

### Paper Grain Texture

```css
/* Creates procedural noise without image file */
.bg-grain {
  background-color: #FDFBF7;
  position: relative;
}

.bg-grain::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  z-index: 50;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

### Newspaper Image Filter

```css
/* Makes digital photos look like printed press */
.filter-newspaper {
  filter: sepia(0.2) contrast(1.1) brightness(0.95) grayscale(0.1);
  transition: filter 0.3s ease;
}

.filter-newspaper:hover {
  filter: sepia(0) contrast(1) brightness(1) grayscale(0);
}
```

### Two-Column Article Layout

```css
/* Newspaper-style justified columns with hyphenation */
.newspaper-columns {
  column-count: 1;
  column-gap: 3rem;
}

@media (min-width: 768px) {
  .newspaper-columns {
    column-count: 2;
  }
}

.newspaper-columns p {
  text-align: justify;
  hyphens: auto;
  -webkit-hyphens: auto;
  word-spacing: -0.05em; /* Prevents "rivers" in justified text */
}
```

### Textured Espresso Background

```css
/* Adds cardstock feel to dark sections */
.bg-espresso-textured {
  background-color: #1A1614;
  position: relative;
}

.bg-espresso-textured::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* Same noise pattern */
  mix-blend-mode: overlay;
}
```

### Shadow Utilities

```css
/* Newspaper-style shadows */
.shadow-newspaper {
  box-shadow: 
    4px 4px 0px rgba(35, 31, 32, 0.1),
    8px 8px 0px rgba(35, 31, 32, 0.05);
}

/* Polaroid/photo lift effect */
.shadow-polaroid {
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 1px 8px rgba(0, 0, 0, 0.2);
}
```

### Animation Utilities

```css
/* Slow vinyl spin */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
```

---

## ⚡ Performance Optimizations

### Image Optimization

1. **Format:** All images converted to WebP
2. **Lazy Loading:** Use `loading="lazy"` attribute
3. **Responsive:** Serve appropriate sizes with `srcset`

```tsx
<img 
  src="/assets/coffee.webp"
  srcSet="/assets/coffee-400.webp 400w, /assets/coffee-800.webp 800w"
  sizes="(max-width: 768px) 400px, 800px"
  loading="lazy"
  alt="Coffee"
/>
```

### CSS Performance

1. **Tailwind Purge:** Ensure production build removes unused classes
2. **Critical CSS:** Inline above-the-fold styles
3. **Font Display:** Use `font-display: swap` in Google Fonts URL

### JavaScript Optimization

1. **Code Splitting:** Routes are lazy-loaded via React Router
2. **Framer Motion:** Use `whileInView` to trigger animations only when visible
3. **Debounce Scroll:** Limit scroll event listeners

---

## 🔧 Maintenance

### Adding New Pages

1. **Create page file** in `src/pages/`
2. **Import core components:**
   ```tsx
   import Masthead from '../components/Masthead';
   import { Footer } from '../components/Footer';
   import { SEO } from '../components/SEO';
   import { TornEdge } from '../components/NewspaperComponents';
   ```
3. **Wrap in newspaper shell:**
   ```tsx
   <div className="min-h-screen bg-grain font-body">
     <SEO title="Page Title" description="..." />
     <Masthead />
     <main id="main-content">
       {/* Your content */}
     </main>
     <Footer />
   </div>
   ```

### Updating Content

1. **Menu Items:** Edit data arrays in `MenuPage.tsx`
2. **Vinyl Records:** Update `records` array in `VinylSection`
3. **Team Members:** Modify `team` array in `About.tsx`

### Design Consistency Checklist

- [ ] All headlines use `font-headline`
- [ ] Body text uses `font-body` with `text-justify`
- [ ] Accent text uses `font-accent` with `uppercase` and `tracking-widest`
- [ ] Images have `filter-newspaper` class
- [ ] Sections are separated with `<TornEdge />`
- [ ] Dark sections use `bg-espresso-textured`
- [ ] All CTAs have hover states

---

## 📚 Additional Documentation

- `ABOUT_PAGE_FIXES.md` - Recent error fixes and implementation details
- `NEWSPAPER_DESIGN_SYSTEM.md` - Extended design specifications
- `MENU_CODE_DOCUMENTATION.md` - Menu page implementation details

---

## 🎯 Project Status

**Current Version:** 1.0  
**Last Updated:** December 12, 2025  
**Status:** ✅ Production Ready

### Completed Features
✅ Masthead navigation with drawer menu  
✅ Home page with all sections  
✅ About page (The Origin Story)  
✅ Menu page (3-column layout)  
✅ Music page (Vinyl collection)  
✅ Full responsive design  
✅ SEO optimization  
✅ Performance optimization  

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: 14+
- Mobile: iOS Safari 14+, Chrome Android Latest

---

## 🤝 Contributing

When adding new features:

1. Maintain the newspaper aesthetic
2. Use existing design tokens (colors, fonts)
3. Follow component patterns
4. Test on mobile first
5. Run `npm run build` to check bundle size

---

## 📞 Support

For questions or issues:
- Review existing documentation files
- Check component source code comments
- Verify Tailwind configuration is correct

---

**Built with ☕ and 🎵 by Café Crave**

