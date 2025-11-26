# Menu Page - Complete Code Documentation

This document contains all the code related to the menu functionality of the Cafe Crave website.

## Table of Contents
1. [MenuPage Component (Main Menu Page)](#menupage-component)
2. [MenuPreview Component (Homepage Preview)](#menupreview-component)
3. [Menu Component (Legacy/Alternative)](#menu-component)
4. [Assets Used](#assets-used)

---

## MenuPage Component

**File:** `/src/pages/MenuPage.tsx`

This is the main menu page that displays the full menu with categories, sticky navigation, and expandable sections.

### Imports

```typescript
import { useEffect, useState, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPinIcon, ArrowDownIcon, DownloadIcon, ChevronDownIcon, ChevronUpIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';

// Import menu images
import breakfastImg from '../assets/breakfast.webp';
import burgersImg from '../assets/burgers.webp';
import toastImg from '../assets/Toast.webp';
import wrapImg from '../assets/Wrap.webp';
import coffeeImg from '../assets/coffee.webp';
import illyLogo from '../assets/illy.webp';
import teaImg from '../assets/tea.webp';
import dilmahLogo from '../assets/dilmah.webp';
import beverageImg from '../assets/beverage.webp';
import shakesImg from '../assets/shakes.webp';
```

### Type Definitions

```typescript
type SectionKey = 'breakfast' | 'burgers' | 'sandwiches' | 'wraps' | 'coffee' | 'tea' | 'beverages' | 'signature';
```

### State Management

```typescript
const [activeCategory, setActiveCategory] = useState('breakfast');
const [isNavSticky, setIsNavSticky] = useState(false);
const [showBackToTop, setShowBackToTop] = useState(false);
const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
  breakfast: false,
  burgers: false,
  sandwiches: false,
  wraps: false,
  coffee: false,
  tea: false,
  beverages: false,
  signature: false
});
const [showNavArrows, setShowNavArrows] = useState(false);
const navRef = useRef<HTMLDivElement>(null);
const navScrollRef = useRef<HTMLDivElement>(null);
const sectionRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({
  breakfast: null,
  burgers: null,
  sandwiches: null,
  wraps: null,
  coffee: null,
  tea: null,
  beverages: null,
  signature: null
});
```

### Key Features

#### 1. Sticky Navigation
- Sticky sub-navigation that activates when scrolling
- Positioned below the main header (top: 80px)
- Category-based navigation with scroll-to functionality

#### 2. Intersection Observer for Active Category
- Automatically highlights active category based on scroll position
- Uses IntersectionObserver API for precise detection

#### 3. Mobile Expandable Sections
- Sections collapse on mobile for better UX
- Expand/collapse buttons for each category

#### 4. Menu Categories

**Breakfast Items:**
- Eggs & Toast - R55
- Smashed Avo & Toast - R65
- The Basic Breakfast - R90
- Basic Omelette - R90
- Breakfast Bun - R100
- French Toast - R110
- The Health Breakfast (Vegetarian) - R115
- Spinach & Feta Omelette - R115
- The Crave Breakfast - R135
- Loaded Smashed Avo - R135
- Breakfast Croissant - R135
- The Crave Breakfast Omelette - R145
- The Mighty Crave Breakfast - R205

**Burgers:**
- Basic Chicken Burger - R100
- Basic Beef Burger 100g - R110
- The Crave Chicken Burger - R140
- The Crave Beef Burger (200g) - R150
- Nachos Chicken Burger - R150
- Nachos Beef Burger - R160
- Tropical Island Burger - R165
- Chicken Chilli Cheese Burger - R165
- Double Chicken Burger - R175
- C.H.E.E.F. Burger - R250

**Sandwiches:**
- Cheese & Tomato Toasted Sandwich - R80
- Cheesy Red Onion - R85
- Chicken Mayo Toasted Sandwich - R110
- Tuna Mayo Toasted Sandwich - R110
- Triple Decker - R115
- Spiced Beef Toasted Sandwich - R125
- Crave Chicken & Slaw - R125
- Grilled Chicken Toasted Sandwich - R135
- Fillet Steak Toasted Sandwich - R185
- Loaded Steak Toasted Sandwich - R245

**Wraps & Pitas:**

*Wraps:*
- BBQ Chicken Wrap - R120
- Grilled Chicken Wrap - R120
- Tropical Chicken & Slaw Wrap - R125
- Chicken & Feta Wrap - R125
- Fillet Steak & Feta Wrap - R165

*Pitas:*
- Falafel Pita - R125
- Chicken and Slaw Pita - R125
- Savoury Mince Pita - R135
- Steak & Feta Pita - R165

**Coffee (Illy Brand):**
- Espresso - R30
- Doppio - R45
- Americano - R35
- Cappuccino - R40
- Vienna - R50
- Flat White - R50
- Latte - R50
- Chai Latte - R50
- Mocha / White Mocha - R60
- Vietnamese Iced Coffee - R65

*Flavour Infusions (+R15):*
Butterscotch, Caramel, Creme Brulee, Hazelnut, Tiramisu, Toasted Marshmallow, Toffee Nut

**Tea (Dilmah Brand):**

*Dilmah Speciality Teas - R45:*
Peach, Lemon, Ceylon, Spice Chai, Strawberry, Lime & Orange, Ginger & Honey, Italian Almond, Berry Sensation, English Breakfast, Berry & Pomegranate, Rose with French Vanilla, Arabian Mint with Honey

*Dilmah Rooibos Tea - R40:*
Natural Rooibos, Cinnamon/Turmeric/Ginger/Nutmeg, Caramel/Ginger/Coconut, Cardamom/Ginger/Orange, Holy Basil/Ginger/Lemon/Lemongrass, Raspberry & Coconut

*Green Rooibos Tea - R40:*
Lemongrass & Spearmint, Ginger & Peppermint, Cardamom/Ginger/Orange, Holy Basil/Ginger/Lemon/Lemongrass, Coconut & Mango

*Organic Teas - R50:*
Pure Green, English Breakfast, Berry Explosion, Green Tea with Mint, Green Tea with Ginger, Green Tea with Cinnamon & Turmeric

**Beverages:**

*Smoothies - R75:*
- Very Berry
- Mango-Go-Go
- Sunrise Surprise - R80
- Orange Zest - R80

*Frappes - R75:*
Butterscotch, Caramel, Chai Latte, Chocolate, Coconut Mocha, Coffee, Creme Brulee, Hazelnut, Tiramisu, Toasted Marshmallow, Toffee Nut

*Milkshakes 350ml - R80:*
Lime, Banana, Bubblegum, Chocolate, Strawberry, Chai, Coffee, Milo, Pineapple Coconut, Mango, Lemon Lime & Mint, Strawberry Cheesecake, Oreo, Bar One, Mocha

*Soft Drinks:*
- Bashews - R20 (Cola, Raspberry, Iron Brew, Passionfruit, Pineapple, Cocopine, Cream Soda, Lemonade)
- Sanpellegrino - R40 (Pomegranate, Lemon, Orange, Blood Orange, Grapefruit)
- Fruit Juice - R40 (Ginger Beer, Orange, Strawberry, Mango, Mango & Orange, Pineapple)
- Mocktails - R70 (Pina Colada, Mojito, Strawberry Daiquiri, Mango Daiquiri)

**Signature Drinks:**

*Blizzards - R65:*
- Lemon Crush
- Tropic Thunder
- Summer Crush
- Keep The Doctor Away
- Tropical Escape

*On The Rocks - R60:*
- The Hulk
- Pink Lady

### Functions

```typescript
// Scroll to section functionality
const scrollToSection = (category: string) => {
  const ref = sectionRefs.current[category as SectionKey];
  if (ref) {
    const headerHeight = 80;
    const navHeight = navRef.current?.offsetHeight || 0;
    const totalOffset = navHeight + headerHeight + 20;
    const elementPosition = ref.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - totalOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Navigation scroll (left/right arrows)
const scrollNav = (direction: 'left' | 'right') => {
  if (navScrollRef.current) {
    const scrollAmount = 200;
    const currentScroll = navScrollRef.current.scrollLeft;
    navScrollRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }
};

// Keyboard navigation
const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, category: string) => {
  const categories: SectionKey[] = ['breakfast', 'burgers', 'sandwiches', 'wraps', 'coffee', 'tea', 'beverages', 'signature'];
  const currentIndex = categories.indexOf(category as SectionKey);
  if (e.key === 'ArrowRight' && currentIndex < categories.length - 1) {
    e.preventDefault();
    const nextCategory = categories[currentIndex + 1];
    const nextButton = document.querySelector(`[data-category="${nextCategory}"]`) as HTMLElement;
    if (nextButton) {
      nextButton.focus();
      scrollToSection(nextCategory);
    }
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    e.preventDefault();
    const prevCategory = categories[currentIndex - 1];
    const prevButton = document.querySelector(`[data-category="${prevCategory}"]`) as HTMLElement;
    if (prevButton) {
      prevButton.focus();
      scrollToSection(prevCategory);
    }
  }
};

// Scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Toggle section expansion (mobile)
const toggleSection = (category: SectionKey) => {
  setExpandedSections(prev => ({
    ...prev,
    [category]: !prev[category]
  }));
};
```

### Key CSS Classes Used

- `section-dark` - Dark background section
- `sticky top-[80px]` - Sticky navigation positioning
- `!scroll-mt-[140px]` - Scroll margin for sections
- `aspect-[4/3]` - Image aspect ratio
- `mix-blend-multiply` - Watermark effect
- `will-change-transform` - Performance optimization

---

## MenuPreview Component

**File:** `/src/components/MenuPreview.tsx`

This component displays a preview of featured menu items on the homepage.

### Complete Code

```typescript
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

// Import featured menu images
import cheesecakeImg from '../assets/Pasted_Graphic_4.webp';
import lambChopsImg from '../assets/Pasted_Graphic_5.webp';
import matchaImg from '../assets/Pasted_Graphic_3.webp';

const featuredItems = [
    {
        id: 1,
        name: 'Biscoff Cheesecake',
        category: 'Dessert',
        price: 'R95',
        image: cheesecakeImg,
        imagePosition: '', // Or 'object-center'
    },
    {
        id: 2,
        name: 'Lamb Chops',
        category: 'Lunch',
        price: 'R175',
        image: lambChopsImg,
        imagePosition: '', // Or 'object-center'
    },
    {
        id: 3,
        name: 'Iced Matcha',
        category: 'Beverages',
        price: 'R65',
        image: matchaImg,
        imagePosition: 'object-[50%_25%]'
    },
];

export const MenuPreview: React.FC = () => {
    return (
        <section className="section-animate section-red py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                        Featured Menu Items
                    </h2>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="max-w-2xl mx-auto text-lg">
                        Crafted with care, served with love
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
                    {featuredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-lightBg rounded-lg overflow-hidden shadow-md border border-redText border-opacity-20 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-white">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${item.imagePosition || 'object-center'}`}
                                    width="800"
                                    height="600"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs text-accent font-medium uppercase tracking-wide">
                                    {item.category}
                                </span>
                                <h3 className="text-xl font-bold text-darkBg mt-2 mb-3">
                                    {item.name}
                                </h3>
                                <p className="text-2xl font-bold text-accent">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/menu"
                        className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center justify-center font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 will-change-transform"
                    >
                        View Full Menu
                        <ArrowRightIcon size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
```

### Features

- **Featured Items Display**: Shows 3 featured menu items
- **Responsive Grid**: 1 column on mobile, 3 columns on desktop
- **Hover Effects**: Cards lift on hover with shadow effects
- **Image Positioning**: Custom object-position for each image
- **Aspect Ratio**: 4:3 aspect ratio for consistent card heights
- **CTA Button**: Links to full menu page

---

## Menu Component

**File:** `/src/components/Menu.tsx`

This is an alternative menu preview component with interactive image carousel.

### Complete Code

```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

export const Menu = () => {
  const [activeItem, setActiveItem] = useState(0);
  
  const menuItems = [
    {
      id: 1,
      name: 'Artisan Latte',
      price: 'R50',
      description: 'Single shot espresso, steamed milk, small foam layer',
      image: 'src/assets/breakfast.webp'
    },
    {
      id: 2,
      name: 'The Crave Breakfast',
      price: 'R135',
      description: '2 free range eggs, 2 sausages, 1 slice of spiced beef, sautéed mushrooms, beans and grilled tomato',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 3,
      name: 'The Crave Beef Burger',
      price: 'R150',
      description: '200g beef patty with red onion, lettuce, tomato, cucumber',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1899&q=80'
    },
    {
      id: 4,
      name: 'Vietnamese Iced Coffee',
      price: 'R65',
      description: 'Double shot espresso, condensed milk, milk, ice',
      image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      id: 5,
      name: 'Chicken & Feta Wrap',
      price: 'R125',
      description: 'Fillet chicken strips, tomato, cucumber, feta, spinach',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      id: 6,
      name: 'Tropical Escape',
      price: 'R65',
      description: 'Pineapple, pineapple juice, coconut milk, lime, ice',
      image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80'
    }
  ];

  return (
    <section id="menu" className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-light mb-4">
            Menu Sneak Peek
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-light opacity-80 max-w-2xl mx-auto text-lg">
            A taste of what we offer, from handcrafted coffees to delicious food
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          {/* Featured Item Display */}
          <div className="bg-primary border border-secondary rounded-lg overflow-hidden shadow-xl mb-8">
            <div className="h-64 md:h-80 overflow-hidden">
              <img 
                src={menuItems[activeItem].image} 
                alt={menuItems[activeItem].name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-3">
                <h3 className="text-2xl font-medium text-light">
                  {menuItems[activeItem].name}
                </h3>
                <span className="text-secondary font-bold text-xl">
                  {menuItems[activeItem].price}
                </span>
              </div>
              <p className="text-light opacity-90">
                {menuItems[activeItem].description}
              </p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(index)}
                className={`relative rounded-lg overflow-hidden aspect-square shadow-md transition-all duration-200 will-change-transform ${
                  activeItem === index 
                    ? 'ring-4 ring-accent scale-[1.02]' 
                    : 'hover:scale-[1.02] hover:shadow-lg'
                }`}
                aria-label={`View ${item.name}`}
                aria-current={activeItem === index}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-primary bg-opacity-40 flex items-end">
                  <div className="w-full p-2 bg-primary bg-opacity-80">
                    <p className="text-xs md:text-sm text-light truncate text-center">
                      {item.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/menu" 
            className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors"
          >
            Explore Full Menu
            <ArrowRightIcon size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};
```

### Features

- **Interactive Carousel**: Click thumbnails to view featured item
- **Active State**: Currently selected item has accent ring
- **6 Featured Items**: Showcases variety of menu offerings
- **Hover Effects**: Smooth scale transitions
- **Responsive Layout**: Grid adjusts from 3 to 6 columns

---

## Assets Used

### Menu Section Watermarks
- `breakfast.webp` - Breakfast section background
- `burgers.webp` - Burgers section background
- `Toast.webp` - Sandwiches section background
- `Wrap.webp` - Wraps & Pitas section background
- `coffee.webp` - Coffee section background
- `tea.webp` - Tea section background
- `beverage.webp` - Beverages section background
- `shakes.webp` - Signature drinks section background

### Brand Logos
- `illy.webp` - Illy Coffee logo
- `dilmah.webp` - Dilmah Tea logo

### Featured Items
- `Pasted_Graphic_3.webp` - Matcha image
- `Pasted_Graphic_4.webp` - Cheesecake image
- `Pasted_Graphic_5.webp` - Lamb Chops image

---

## Styling Guide

### Color Scheme (from Tailwind Config)

```javascript
colors: {
  primary: '#3A2A1A',      // Dark brown
  secondary: '#B8860B',    // Goldenrod
  accent: '#D4AF37',       // Gold
  light: '#F9FAFB',        // Light gray
  darkBg: '#1F1610',       // Very dark brown
  lightBg: '#F5F0E5',      // Cream
  darkText: '#2D2418',     // Dark text
  lightText: '#F7F3EE',    // Light text
  subtext: '#6B5D54',      // Muted brown
  redBg: '#8B4513',        // Saddle brown
  redText: '#F7F3EE',      // Light cream
}
```

### Common CSS Patterns

```css
/* Section Styles */
.section-dark {
  background-color: var(--primary);
  color: var(--light);
}

.section-red {
  background-color: var(--redBg);
  color: var(--redText);
}

/* Sticky Navigation */
.sticky.top-[80px] {
  position: sticky;
  top: 80px; /* Height of main header */
}

/* Scroll Margin for Sections */
.!scroll-mt-[140px] {
  scroll-margin-top: 140px; /* Header + Nav height */
}

/* Watermark Effect */
.mix-blend-multiply {
  mix-blend-mode: multiply;
  opacity: 0.1;
}
```

---

## SEO Configuration

The MenuPage includes comprehensive SEO metadata:

```typescript
<SEO
  title="Our Halaal Menu | Crave Café Claremont (Breakfast, Burgers & Coffee)"
  description="Explore the 100% halaal menu at Crave Café. We serve artisan coffee, all-day breakfast, gourmet burgers, grills, and desserts in Claremont."
  keywords="halaal menu claremont, halaal breakfast cape town, halaal burgers claremont, artisan coffee, crave cafe menu"
/>
```

---

## Accessibility Features

1. **Keyboard Navigation**: Arrow keys navigate between menu categories
2. **ARIA Labels**: All interactive elements have proper labels
3. **Focus Management**: Clear focus indicators on all interactive elements
4. **Screen Reader Support**: Proper heading hierarchy and semantic HTML
5. **Skip Links**: Proper landmark regions for navigation

---

## Performance Optimizations

1. **Image Loading**: `loading="lazy"` on images below the fold
2. **Will-Change**: `will-change-transform` on animated elements
3. **Intersection Observer**: Efficient scroll tracking for active sections
4. **Debounced Scroll**: Scroll events are optimized
5. **Code Splitting**: Page-level components for better bundle size

---

## Mobile Responsiveness

### Breakpoints
- **Mobile**: < 768px (default)
- **Tablet**: >= 768px (md:)
- **Desktop**: >= 1024px (lg:)

### Mobile-Specific Features
- Expandable sections with toggle buttons
- Simplified navigation (no sticky nav)
- Single column layout
- Touch-optimized buttons
- Reduced spacing

---

## Future Enhancements

Potential improvements for the menu system:

1. **Search Functionality**: Add menu item search
2. **Dietary Filters**: Filter by dietary requirements (vegan, gluten-free, etc.)
3. **Allergen Information**: Display allergen data
4. **Online Ordering**: Integration with ordering system
5. **Favorites**: Allow users to save favorite items
6. **Nutritional Info**: Add calorie and nutritional data
7. **Seasonal Menu**: Highlight seasonal specials
8. **Dynamic Pricing**: Update prices from CMS/database

---

## Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "lucide-react": "^0.x",
  "tailwindcss": "^3.x"
}
```

---

## File Structure

```
src/
├── pages/
│   └── MenuPage.tsx          # Main menu page (1407 lines)
├── components/
│   ├── Menu.tsx              # Alternative menu preview (95 lines)
│   ├── MenuPreview.tsx       # Featured items preview (117 lines)
│   ├── Header.tsx            # Site header with navigation
│   ├── Footer.tsx            # Site footer
│   └── SEO.tsx               # SEO meta tags component
└── assets/
    ├── breakfast.webp
    ├── burgers.webp
    ├── Toast.webp
    ├── Wrap.webp
    ├── coffee.webp
    ├── tea.webp
    ├── beverage.webp
    ├── shakes.webp
    ├── illy.webp
    ├── dilmah.webp
    ├── Pasted_Graphic_3.webp
    ├── Pasted_Graphic_4.webp
    └── Pasted_Graphic_5.webp
```

---

## License

All code is proprietary to Cafe Crave and should not be distributed without permission.

---

*Last Updated: November 20, 2025*

