# Newspaper Design System - Implementation Guide

## 📰 Overview
This document provides a complete implementation guide for the "Modern Retro Newspaper" design system for the Cafe Crave website. All specifications are confirmed and ready for implementation.

---

## 🎨 Design Philosophy
The design system creates a nostalgic newspaper aesthetic with:
- High-contrast typography reminiscent of vintage print media
- Warm, aged paper textures
- Subtle procedural noise for authentic paper feel
- "Sliding paper" animations using Framer Motion
- Polaroid/cutout-style image presentation

---

## 📝 Typography System (The "Ink")

### Font Families

| Purpose | Font | Usage | Weight |
|---------|------|-------|--------|
| **Headlines** | Playfair Display | H1, H2, featured titles | 400, 500, 600, 700 |
| **Body Text** | Lora | Paragraphs, descriptions | 400, 500, 600, 700 |
| **Accents** | Oswald | Navigation, labels, buttons | 300, 400, 500, 600, 700 |

### Google Fonts Import

Add this to your `index.html` or `index.css`:

```html
<!-- HTML Head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**OR** CSS Import:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Oswald:wght@300;400;500;600;700&display=swap');
```

---

## 🎨 Color Palette (The "Paper")

### Primary Colors

| Color Name | Hex Code | Usage | CSS Variable |
|------------|----------|-------|--------------|
| **Paper (Background)** | `#FDFBF7` | Main background, card backgrounds | `--color-paper` |
| **Ink (Primary Text)** | `#231F20` | Body text, headlines | `--color-ink` |
| **Stamp (Accent)** | `#8B2E2E` | CTAs, links, highlights | `--color-stamp` |
| **Espresso (Secondary Dark)** | `#1A1614` | Footer, dark sections | `--color-espresso` |

### Tailwind Color Configuration

```javascript
colors: {
  paper: '#FDFBF7',
  ink: '#231F20',
  stamp: '#8B2E2E',
  espresso: '#1A1614',
  // Shades for variations
  'stamp-light': '#A64545',
  'stamp-dark': '#6B2323',
}
```

---

## 🔧 Implementation Code

### 1. Tailwind Config (`tailwind.config.js`)

```javascript
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Typography
      fontFamily: {
        headline: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
        accent: ['Oswald', 'sans-serif'],
        // Legacy support
        serif: ['Playfair Display', 'serif'],
        sans: ['Lora', 'serif'],
      },
      
      // Color Palette
      colors: {
        // Newspaper Design System
        paper: '#FDFBF7',
        ink: '#231F20',
        stamp: '#8B2E2E',
        espresso: '#1A1614',
        'stamp-light': '#A64545',
        'stamp-dark': '#6B2323',
        
        // Legacy colors (keep for backward compatibility)
        primary: "#322C2B",
        secondary: "#83513F",
        accent: "#803D3B",
        light: "#F7F3EE",
        subtextLightBg: "#5A372B",
        subtextDarkBg: "#BFA6A0",
        lightBg: '#F7F3EE',
        lightText: '#5A372B',
        redBg: '#83513F',
        redText: '#F7F3EE',
        darkBg: '#322C2B',
        darkText: '#F7F3EE',
        'dark-walnut': '#2B1F1A',
        'aged-paper': '#FDF5E6',
        'newsprint': '#F5EBD8',
        'ink-black': '#1A1512',
        'sepia-tone': '#704214',
        'vintage-cream': '#FFF8E7',
      },
      
      // Box Shadows for Newspaper/Polaroid effect
      boxShadow: {
        'newspaper': '0 4px 6px -1px rgba(35, 31, 32, 0.1), 0 2px 4px -1px rgba(35, 31, 32, 0.06)',
        'polaroid': '0 10px 30px -5px rgba(35, 31, 32, 0.2), 0 0 0 1px rgba(35, 31, 32, 0.05)',
        'cutout': 'inset 0 0 0 1px rgba(35, 31, 32, 0.1), 0 2px 4px rgba(35, 31, 32, 0.05)',
      },
      
      // Border styles
      borderWidth: {
        'newspaper': '3px',
      },
      
      // Animation timing
      animation: {
        'slide-in': 'slideIn 0.6s ease-out',
        'fade-slide': 'fadeSlide 0.5s ease-out',
      },
      
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeSlide: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

---

### 2. Global CSS (`src/index.css`)

```css
/* PLEASE NOTE: THESE TAILWIND IMPORTS SHOULD NEVER BE DELETED */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
/* DO NOT DELETE THESE TAILWIND IMPORTS, OTHERWISE THE STYLING WILL NOT RENDER AT ALL */

/* Google Fonts Import - Newspaper Design System */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Oswald:wght@300;400;500;600;700&display=swap');

/* Legacy Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

/* ============================================
   PROCEDURAL PAPER GRAIN/NOISE TEXTURE
   ============================================ */

/* Base layer - apply to body or main container */
.paper-texture {
  position: relative;
  background-color: #FDFBF7;
}

.paper-texture::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  z-index: 0;
  pointer-events: none;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(35, 31, 32, 0.03) 2px,
      rgba(35, 31, 32, 0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(35, 31, 32, 0.03) 2px,
      rgba(35, 31, 32, 0.03) 4px
    );
}

/* Enhanced grain texture using CSS noise simulation */
.paper-texture::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.015;
  z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Lighter paper texture variant */
.paper-texture-light::before {
  opacity: 0.02;
}

.paper-texture-light::after {
  opacity: 0.01;
}

/* Darker paper texture variant (for aged paper sections) */
.paper-texture-aged {
  background-color: #F5EBD8;
}

.paper-texture-aged::before {
  opacity: 0.05;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(112, 66, 20, 0.04) 2px,
      rgba(112, 66, 20, 0.04) 4px
    );
}

/* ============================================
   NEWSPAPER DESIGN SYSTEM COMPONENTS
   ============================================ */

@layer components {
  /* Typography Classes */
  .headline-xl {
    @apply font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight;
  }
  
  .headline-lg {
    @apply font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight;
  }
  
  .headline-md {
    @apply font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-ink;
  }
  
  .headline-sm {
    @apply font-headline text-xl md:text-2xl font-semibold text-ink;
  }
  
  .body-text {
    @apply font-body text-base md:text-lg text-ink leading-relaxed;
  }
  
  .body-text-sm {
    @apply font-body text-sm md:text-base text-ink leading-relaxed;
  }
  
  .accent-text {
    @apply font-accent uppercase tracking-wider text-sm md:text-base font-medium;
  }
  
  .accent-text-lg {
    @apply font-accent uppercase tracking-wider text-base md:text-lg font-semibold;
  }

  /* Section Styles */
  .section-newspaper {
    @apply bg-paper text-ink paper-texture;
  }
  
  .section-newsprint {
    @apply bg-[#F5EBD8] text-ink paper-texture-aged;
  }
  
  .section-espresso {
    @apply bg-espresso text-paper;
  }

  /* Card Styles with Newspaper Aesthetic */
  .card-newspaper {
    @apply bg-paper border-2 border-ink rounded-none shadow-newspaper 
           transition-all duration-300 hover:shadow-polaroid hover:-translate-y-1;
  }
  
  .card-polaroid {
    @apply bg-paper border-8 border-paper shadow-polaroid 
           transition-transform duration-300 hover:rotate-1 hover:scale-105;
  }
  
  .card-cutout {
    @apply bg-paper shadow-cutout border border-ink/10 
           transition-all duration-300 hover:shadow-newspaper;
  }

  /* Image Styles */
  .img-newspaper {
    @apply border-2 border-ink shadow-newspaper;
  }
  
  .img-polaroid {
    @apply border-8 border-paper shadow-polaroid;
  }

  /* Button Styles */
  .btn-newspaper {
    @apply bg-stamp text-paper font-accent uppercase tracking-wider px-6 py-3 
           border-2 border-stamp transition-all duration-300 
           hover:bg-paper hover:text-stamp hover:shadow-newspaper;
  }
  
  .btn-newspaper-outline {
    @apply bg-transparent text-stamp font-accent uppercase tracking-wider px-6 py-3 
           border-2 border-stamp transition-all duration-300 
           hover:bg-stamp hover:text-paper;
  }

  /* Decorative Elements */
  .divider-stamp {
    @apply h-1 bg-stamp w-24 mx-auto my-6;
  }
  
  .divider-newspaper {
    @apply border-t-2 border-dashed border-ink/20 my-8;
  }

  /* Legacy Section Styles */
  .section-light {
    @apply bg-[#EBD4B7] text-[#5A372B];
  }

  .section-red {
    @apply bg-[#83513F] text-[#F7F3EE];
  }

  .section-dark {
    @apply bg-[#322C2B] text-[#F7F3EE];
  }

  /* Main content spacing below fixed header */
  .main-content {
    padding-top: 5rem; /* 80px - accounts for fixed header height */
  }

  @media (min-width: 768px) {
    .main-content {
      padding-top: 6rem; /* 96px - more spacing on larger screens */
    }
  }
}

/* ============================================
   CSS VARIABLES
   ============================================ */

:root {
  /* Newspaper Design System Colors */
  --color-paper: #FDFBF7;
  --color-ink: #231F20;
  --color-stamp: #8B2E2E;
  --color-espresso: #1A1614;
  --color-stamp-light: #A64545;
  --color-stamp-dark: #6B2323;
  
  /* Animation Durations */
  --animation-duration-fast: 0.35s;
  --animation-duration-medium: 0.45s;
  --animation-duration-micro: 0.15s;
  
  /* Legacy Colors */
  --color-primary: #322C2B;
  --color-secondary: #5C3A2D;
  --color-accent: #803D3B;
  --color-light: #FFFFFF;
  --color-subtext: #A86A53;
  --color-dark-walnut: #2B1F1A;
  --color-aged-paper: #FDF5E6;
  --color-newsprint: #F5EBD8;
  --color-ink-black: #1A1512;
  --color-sepia-tone: #704214;
  --color-vintage-cream: #FFF8E7;
}

/* ============================================
   UTILITY CLASSES
   ============================================ */

/* Prevent content from being hidden under texture overlays */
.relative-content {
  position: relative;
  z-index: 1;
}

/* Smooth transitions for all interactive elements */
.smooth-transition {
  transition: all 0.3s ease-in-out;
}
```

---

### 3. Framer Motion Setup

#### Install Framer Motion

```bash
npm install framer-motion
```

#### Animation Variants (Create: `src/utils/animations.ts`)

```typescript
/**
 * Newspaper Design System - Framer Motion Animations
 * "Sliding Paper" aesthetic animations
 */

export const newspaperVariants = {
  // Slide in from left (like turning a page)
  slideInLeft: {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      x: -100, 
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  },

  // Slide in from right
  slideInRight: {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Paper dropping in
  paperDrop: {
    hidden: { y: -50, opacity: 0, rotate: -2 },
    visible: { 
      y: 0, 
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
      }
    }
  },

  // Stagger children (for lists/grids)
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  },

  // Individual stagger item
  staggerItem: {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },

  // Fade and slight zoom (for modals/overlays)
  fadeZoom: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      scale: 0.95, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  },

  // Newspaper unfolding effect
  unfold: {
    hidden: { scaleY: 0, originY: 0, opacity: 0 },
    visible: { 
      scaleY: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }
};

// Scroll-triggered animation hooks
export const scrollVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

#### Example Usage Component

```typescript
import { motion } from 'framer-motion';
import { newspaperVariants } from '../utils/animations';

export const NewspaperCard = ({ title, content, image }) => {
  return (
    <motion.div
      variants={newspaperVariants.staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="card-newspaper p-6"
    >
      <motion.img 
        src={image} 
        alt={title}
        className="img-newspaper w-full h-48 object-cover mb-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
      <h3 className="headline-sm mb-3">{title}</h3>
      <p className="body-text-sm">{content}</p>
    </motion.div>
  );
};

// Grid with stagger animation
export const NewspaperGrid = ({ items }) => {
  return (
    <motion.div
      variants={newspaperVariants.staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((item) => (
        <NewspaperCard key={item.id} {...item} />
      ))}
    </motion.div>
  );
};
```

---

## 📦 Tech Stack Confirmation

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **Vite** | 5.2.0 | Build Tool |
| **TypeScript** | 5.5.4 | Type Safety |
| **Tailwind CSS** | 3.4.17 | Styling Framework |
| **Framer Motion** | *To Install* | Animations |
| **React Router** | 6.26.2 | Routing |

---

## 🚀 Installation Steps

### 1. Install Framer Motion

```bash
npm install framer-motion
```

### 2. Update Tailwind Config

Replace the content of `tailwind.config.js` with the code provided in Section "1. Tailwind Config" above.

### 3. Update Global CSS

Replace the content of `src/index.css` with the code provided in Section "2. Global CSS" above.

### 4. Create Animation Utils

Create a new file `src/utils/animations.ts` with the animation variants provided above.

### 5. Test the Paper Texture

Apply the `paper-texture` class to your main container:

```tsx
<div className="paper-texture min-h-screen">
  <div className="relative-content">
    {/* Your content here */}
  </div>
</div>
```

---

## 🎯 Usage Examples

### Example 1: Hero Section with Newspaper Aesthetic

```tsx
import { motion } from 'framer-motion';
import { newspaperVariants } from '../utils/animations';

export const HeroSection = () => {
  return (
    <section className="section-newspaper py-20">
      <div className="container mx-auto px-6 relative-content">
        <motion.div
          variants={newspaperVariants.slideInLeft}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <h1 className="headline-xl mb-6">
            Welcome to Cafe Crave
          </h1>
          <div className="divider-stamp mb-6"></div>
          <p className="body-text mb-8">
            Experience the finest coffee and cuisine in a vintage atmosphere
          </p>
          <button className="btn-newspaper">
            Explore Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
};
```

### Example 2: Event Card with Polaroid Style

```tsx
export const EventCard = ({ event }) => {
  return (
    <motion.div
      variants={newspaperVariants.paperDrop}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="card-polaroid p-4"
    >
      <img 
        src={event.image} 
        alt={event.title}
        className="w-full h-64 object-cover mb-4"
      />
      <div className="text-center">
        <h3 className="headline-sm mb-2">{event.title}</h3>
        <p className="accent-text text-stamp">{event.date}</p>
      </div>
    </motion.div>
  );
};
```

### Example 3: Menu Grid with Stagger Animation

```tsx
import { motion } from 'framer-motion';
import { newspaperVariants } from '../utils/animations';

export const MenuGrid = ({ menuItems }) => {
  return (
    <section className="section-newsprint py-16">
      <div className="container mx-auto px-6 relative-content">
        <h2 className="headline-lg text-center mb-4">Our Menu</h2>
        <div className="divider-stamp mb-12"></div>
        
        <motion.div
          variants={newspaperVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={newspaperVariants.staggerItem}
              className="card-newspaper p-6"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="img-newspaper w-full h-48 object-cover mb-4"
              />
              <h3 className="headline-sm mb-2">{item.name}</h3>
              <p className="body-text-sm mb-3">{item.description}</p>
              <p className="accent-text text-stamp">${item.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
```

---

## 🎨 Design Patterns & Best Practices

### Typography Hierarchy

1. **Headlines**: Use `Playfair Display` with `headline-*` classes
2. **Body Content**: Use `Lora` with `body-text` classes
3. **Navigation/CTAs**: Use `Oswald` with `accent-text` classes

### Color Usage

- **Paper (#FDFBF7)**: Main backgrounds, cards
- **Ink (#231F20)**: All primary text content
- **Stamp (#8B2E2E)**: CTAs, links, highlights, important elements
- **Espresso (#1A1614)**: Footer, dark hero sections

### Image Presentation

Choose one of three styles:
1. **Newspaper**: Simple border + shadow (`img-newspaper`)
2. **Polaroid**: Thick white border + shadow (`img-polaroid`)
3. **Cutout**: Subtle inset border (`shadow-cutout`)

### Animation Guidelines

- Use `slideInLeft` for main content reveals
- Use `staggerContainer` + `staggerItem` for grids
- Use `paperDrop` for cards and modals
- Use `whileInView` with `viewport={{ once: true }}` for scroll animations
- Keep animations subtle (0.3s - 0.7s duration)

---

## 📂 Data Structure Examples

### Menu Items (Local JSON)

```typescript
// src/data/menuItems.ts
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Beverages' | 'Desserts';
  image: string;
  isSpecial?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Breakfast",
    description: "Eggs, bacon, toast, and fresh orange juice",
    price: 12.99,
    category: "Breakfast",
    image: "/assets/breakfast.webp",
    isSpecial: false
  },
  // ... more items
];
```

### Vinyl Records (Local JSON)

```typescript
// src/data/vinylRecords.ts
export interface VinylRecord {
  id: number;
  artist: string;
  album: string;
  year: number;
  genre: string;
  coverImage: string;
}

export const vinylRecords: VinylRecord[] = [
  {
    id: 1,
    artist: "The Beatles",
    album: "Abbey Road",
    year: 1969,
    genre: "Rock",
    coverImage: "/assets/the-beatles-abbey-road.webp"
  },
  // ... more records
];
```

---

## ✅ Implementation Checklist

- [ ] Install Framer Motion: `npm install framer-motion`
- [ ] Replace `tailwind.config.js` with new configuration
- [ ] Replace `src/index.css` with new styles
- [ ] Create `src/utils/animations.ts` file
- [ ] Apply `paper-texture` class to main app container
- [ ] Test procedural noise texture (should see subtle grain)
- [ ] Update fonts in existing components to use new classes
- [ ] Implement at least one component with Framer Motion
- [ ] Test animations on scroll
- [ ] Create data files for Menu and Vinyl sections
- [ ] Update color usage throughout the app

---

## 🐛 Troubleshooting

### Issue: Texture Not Showing

**Solution**: Ensure the `paper-texture` class is applied to a parent container and child content has `relative-content` or `z-index: 1`.

### Issue: Fonts Not Loading

**Solution**: Check that Google Fonts import is at the top of `index.css` and verify network request in browser DevTools.

### Issue: Animations Not Working

**Solution**: 
1. Verify Framer Motion is installed
2. Check that `initial`, `animate`, or `whileInView` props are set
3. Ensure `viewport={{ once: true }}` is used for scroll animations

### Issue: Colors Not Applying

**Solution**: 
1. Run `npm run dev` to rebuild Tailwind
2. Check that color names match Tailwind config exactly
3. Clear browser cache

---

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Google Fonts](https://fonts.google.com/)
- [CSS Noise Generator](https://cssgenerator.org/filter-css-generator.html)

---

## 🎓 Next Steps

1. **Implement Core Components**: Start with Hero, Menu Grid, and Event Cards
2. **Create Reusable Patterns**: Build a component library using the newspaper aesthetic
3. **Optimize Performance**: Lazy load images, use React.memo for heavy components
4. **Accessibility**: Ensure proper contrast ratios (already met with ink on paper)
5. **Responsive Design**: Test on mobile, tablet, and desktop breakpoints
6. **Dark Mode** (Optional): Consider an "evening edition" with inverted colors

---

## 📝 Notes

- All "Proposed" and "Recommended" items from the specification are confirmed and implemented
- The CSS noise texture is generated procedurally - no image file needed
- Color palette ensures WCAG AA compliance for text contrast
- Animation durations are calibrated for the "sliding paper" aesthetic
- Legacy colors are maintained for backward compatibility with existing components

---

**Created**: December 11, 2025  
**Design System**: Newspaper Modern Retro  
**Status**: Ready for Implementation ✅

