# Menu Update Comparison - Cafe Crave

## Overview
This document compares the current MenuPage.tsx with the new menu content provided. Below is a comprehensive breakdown of all changes needed.

---

## 🔴 MAJOR STRUCTURAL CHANGES

### 1. **New Sections Required**
The new menu introduces several new sections that don't exist in the current code:

- **Desserts** (new section)
- **Bakery** (new section)
- **Kiddies** (new section)
- **Add-ons** (new section)
- **Starters** (new section)
- **Mains** (new section - includes loaded fries, alfredo, pasta, nachos)
- **Steaks** (new section)
- **Platters** (new section)
- **Toasties** (replaces "Sandwiches")

### 2. **Sections to Remove/Rename**
- **"Sandwiches"** → should become **"Toasties"**

### 3. **Updated Navigation**
Current categories need to be updated to:
```typescript
const categories = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'kiddies', label: 'Kiddies' },
  { id: 'starters', label: 'Starters' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'toasties', label: 'Toasties' },
  { id: 'wraps', label: 'Wraps' },
  { id: 'mains', label: 'Mains' },
  { id: 'steaks', label: 'Steaks' },
  { id: 'platters', label: 'Platters' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea', label: 'Tea' },
  { id: 'beverages', label: 'Drinks' },
  { id: 'dessert', label: 'Dessert' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'signature', label: 'Signature' },
];
```

---

## 📋 SECTION-BY-SECTION COMPARISON

### ☕ **COFFEE SECTION**
**Changes:**
- Espresso: R30 ✅ (same)
- **NEW:** Cortado: R45 (double shot espresso, equal parts textured foam)
- Americano: R35 ✅ (same)
- Cappuccino: R40 ✅ (same)
- **NEW:** Vienna: R50 (single shot espresso, condensed milk)
- **REMOVED:** Doppio
- Flat White: R50 ✅ (now "Flat White - Double Shot")
- Latte: R50 ✅ (same)
- **NEW:** Chai Latte: R50 (spiced black tea, steamed milk, milk foam)
- **NEW:** Dirty Chai: (single shot espresso, classic chai mix) - price not specified
- Mocha: R60 ✅ (now "Mocha / White Mocha" with description)
- Vietnamese Iced: R65 ✅ (same)

**Flavor Infusions:**
- **Changed to:** R20 (was R15)
- **New flavors:** Vanilla, Hazelnut, Caramel, Shortbread
- **Removed:** Butterscotch, Creme Brulee, Tiramisu, Toasted Marshmallow

---

### 🍳 **BREAKFAST SECTION**
**Major Changes:**

**REMOVED ITEMS:**
- Eggs & Toast (R55)
- Smashed Avo & Toast (R65)
- The Basic Breakfast (R90)
- Basic Omelette (R90)
- Breakfast Bun (R100)
- French Toast (R110)
- Spinach & Feta Omelette (R115)
- The Crave Breakfast (R135)
- Loaded Smashed Avo (R135)
- Breakfast Croissant (R135)
- Mighty Crave (R205)

**NEW ITEMS:**
1. **Avo on Toast** - R75 (sliced avo + feta, rosa tomato, red onion)
2. **Build-o-Omelette** - R85 (3 eggs and a slice of ciabatta)
   - Add-ons available: chilli (R10), tomato (R10), onions (R10), egg (R15), cheese (R15), feta (R15), mushroom (R15), spinach (R25), avo (R25), spiced beef (R25), sausage (R25), chicken (R35)
3. **Breakfast Muffin** - R90 (english muffin + egg + spiced beef, melted cheese + hash brown)
4. **Eggs Benedict** - R95 (english muffin + 2 poached eggs, hollandaise sauce with choice of: spinach & mushroom OR spiced beef & caramelised onion)
5. **Brioche French Toast** - R95 (with choice of: berry compote & cream OR classic creme brulee)
6. **Loaded Hash Bowl** - R105 (3 scrambled eggs + hash brown + tomato, spinach + mushroom + sriracha + avo + feta)
7. **Vegan Burrito** - R115 (hummus + tzatziki + chickpeas + roast veg)
8. **Crave Signature** - R135 (2 eggs + sauteed mushrooms + 2 sausages, baked beans + fries + fried tomato, 2 slices ciabatta + spiced beef)
9. **Breakfast Wrap** - R145 (scrambled eggs + feta + fillet steak, rosa tomato)
10. **Loaded Avo on Toast** - R135 (avo on toast + 2 sausages + 2 eggs + sauteed mushrooms)
11. **Mighty Crave** - R185 (3 eggs + 120g steak + 2 sausages, sauteed mushrooms + spiced beef + fries, 2 slices ciabatta + fried tomato + baked beans)

**Add-ons Section:**
chilli (R10), tomato (R10), onions (R10), egg (R15), cheese (R15), mushroom (R15), toast (R15), avo (R25), spiced beef (R25), sausage (R25), fries (R40), spinach & butternut (R45), chicken (R45)

**Sauces (R30):**
hot honey, garlic aioli, mushroom, tzatziki, chilli cheese, crave sauce, gochujang, ranch

---

### 👶 **KIDDIES SECTION** (NEW)
1. **Cheese & Tomato Toastie** - R75 (a classic triangle toastie - crust/no crust)
2. **Chicken and Cheese Wrap** - R75 (no gross greens, kid sized)
3. **Nacho** - R75 (nachos + cheese + cheese sauce)
4. **Crumbed Chicken Strips** - R80 (crispy chicken fillet)
5. **Chicken or Beef Slider** - R80 (mini burger for the mini-me)

---

### 🍔 **BURGERS SECTION**
**Major Restructure:**

**Note:** All burgers now offer choice of: Chicken | Dhanya Beef | Smash Patty

**REMOVED:**
- Basic Chicken (R100)
- Basic Beef (R110)
- Crave Chicken (R140)
- Crave Beef (R150)
- Nachos Chicken (R150)
- Nachos Beef (R160)
- Tropical Island (R165)
- Chilli Cheese (R165)
- C.H.E.E.F. Burger (R250)

**NEW ITEMS:**
1. **El Classico** - R90 (100g patty + red onion + lettuce + tomato, mayo)
2. **Chilli Cheese** - R115 (the classico + cheese + chilli cheese sauce)
3. **Cheesy Crave** - R125 (200g patty + red onion + lettuce + tomato, cheese + crave sauce)
4. **Tropico** - R135 (200g patty + pineapple ring + lettuce + tomato, cheese + crave sauce)
5. **The Nacho** - R145 (200g patty + nacho chips + melted cheese, crave sauce)
6. **Hunger Buster** - R165 (choice of any 2x 200g patties + avo, crave sauce + lettuce + red onion + tomato)
7. **Go Big or Go Home** - (price not listed) (choice of any 3x 200g patties + layered with cheese + avo + crave sauce + lettuce, red onion + tomato)

---

### 🥪 **TOASTIES SECTION** (was "Sandwiches")
**Title Change:** "Toasted Gazette" remains the same

**REMOVED:**
- Cheese & Tomato (R80)
- Chicken / Tuna Mayo (R110)
- Triple Decker (R115)
- Spiced Beef (R125)
- Crave Chicken & Slaw (R125)
- Loaded Steak (R245)

**NEW/KEPT:**
1. **Cheesy Red Onion** - R90 (was R85 - price increased, now: red onion + cheese + tomato)
2. **Chicken Mayo (plain | spicy)** - R100 (chicken fillet + in house mayo, spicy = crave sauce)
3. **Triple Cheese** - R135 (cheddar + mozzarella + feta)
4. **Pulled Lamb Melt** - R155 (lamb + cheese + caramelized onion)
5. **Crave Steak** - R165 (fillet steak + red onion + lettuce + cheese, crave sauce)

---

### 🌯 **WRAPS SECTION**
**REMOVED:**
- BBQ / Grilled Chicken Wrap (R120)
- Tropical Chicken & Slaw Wrap (R125)
- Falafel Pita (R125)
- Savoury Mince Pita (R135)
- Fillet Steak Wrap/Pita (R165)

**NEW ITEMS:**
1. **Falafel** - R100 (cucumber + red onion + tzatziki + tomato)
2. **Smashburger Wrap** - R115 (beef + cheese + lettuce + avo + crave sauce)
3. **Chicken (grilled | crumbed)** - R135 (feta + mixed leaves + cucumber + avo, sauce choice: garlic mayo | sriracha mayo)
4. **Chicken Quesadilla** - R135 (chicken fillet + peppers + cheese + salsa)
5. **Steak** - R165 (fillet steak + red onion + tomato + fresh greens)

---

### 🍟 **MAINS SECTION** (NEW)
1. **Loaded Fries** - R85 (fries + melted cheese sauce + jalapenos)
   - Add hot honey chicken: R35
   - Add beef smash: R40
   - Add pulled lamb: R50

2. **Alfredo** - R105 (creamy alfredo with mushrooms)
   - Add chicken: R35
   - Add steak: R65

3. **Lemon Chilli Chicken Pasta** - R130 (creamy pasta + grilled chicken, lemon zest + hints of chilli)

4. **Nachos** - R105 (crispy nacho chips layered with cheese, salsa + guac + sour cream)
   - Add grilled chicken: R35
   - Add hot honey chicken: R35
   - Add pulled lamb: R50
   - Add steak: R65

---

### 🥩 **STEAKS SECTION** (NEW)
**Note:** All served with a sauce of choice + onion rings + chips

1. **120g Rump Steak** - R125
2. **220g Rump Steak** - R215
3. **120g Fillet Steak** - R145
4. **220g Fillet Steak** - R250

---

### 🍽️ **PLATTERS SECTION** (NEW)
1. **Street Platter** - R210 (2 sliders + hot honey chicken tenders, loaded fries + 2 veg starters)
2. **Grill Platter** - R240 (2 lamb chops + 120g steak + 2 sausages, fries + crispy onion rings)
3. **Sharing Platter** - R245 (hot honey chicken + 8 chicken wings, jalapeno stuffed rings + corn cups)
4. **Family Platter** - R395 (2 el classico + 2 cheesy crave, 2 sweet corn cups + 2 large fries)

---

### 🥤 **STARTERS SECTION** (NEW)
1. **Sweet Corn Cups** - R55 (served with choice of: butter/aromat/chives OR butter/chilli/lime)
2. **Jalapeno Stuffed Rings** - R65 (4 stuffed onion rings & a sour cream dip)
3. **Crumbed Mushrooms** - R65 (served with tartare sauce in choice of: plain | garlic & herb)
4. **Mac & Cheese Balls** - R65 (garlic aioli, hot honey)
5. **Cheeseburger Spring Rolls** - R70 (choice of dipping sauce)
6. **Full Chicken Wings** - R75 (4 wings served with ranch: hot honey, gochujang | crispy plain, hot honey)
7. **Chicken Tender** - R85 (served as is)

---

### 🥤 **BEVERAGES SECTION**
**Major Changes:**

**REMOVED:**
- Very Berry / Mango-Go (R75)
- Sunrise Surprise (R80)
- Orange Zest (R80)
- All milkshake varieties

**NEW - Milkshakes:**
- Standard flavors (R75): Lime, Banana, Bubblegum, Chocolate, Strawberry, Chai, Coffee, Bar One, Red, Blue, Green, Yellow, Orange

**NEW - Smoothies:**
(No prices listed in new menu)

**NEW - Other Beverages:**
1. **Bashe** - R20 (Cola, Iron Brew, Pineapple, Very Berry, Passion Fruit, Lemonade, Cocopine)
2. **San Pellegrino** - R40 (Blood Orange, Grapefruit, Gingerbeer, Pomegranate, Lemon, Orange, Orange & Fig, Peach & Clementine)
3. **100% Fruit Juice** - R40 (Strawberry, Pineapple, Orange, Mango, Cranberry, Mango & Orange, Apple)
4. **Cordials** - R60 (Passion Fruit, Lemonade, Blueberry, Lemon & Lime)
5. **Mocktails** - R70 (Pina Colada, Strawberry Daiquiri, Mojito, Mango Daiquiri)
6. **Aqua Panna 500ml** - R35
7. **S. Pellegrino 500ml** - R35
8. **Aqua Panna 1L** - R55
9. **S. Pellegrino 1L** - R55

---

### 🍰 **DESSERT SECTION** (NEW)
1. **Loaded Donuts** - R80 (caramel cream stuffed + cadbury drizzle, peppermint crunch)
2. **Ice Cream Sandwich** - R85 (choc chip cookies + vanilla ice cream)
3. **Churros** - R85 (cinnamon dusted, choice of sauce: caramel/chocolate)
4. **Brownie Sundae** - R90 (layered choc brownie + vanilla ice cream)
5. **Loaded Waffle Bites** - R105 (light waffle bits with choice of: strawberry shortbread | oreo & ice cream | banana & biscoff | death by chocolate)

---

### 🥐 **BAKERY SECTION** (NEW)
1. **Gourmet Cheesecake** - R80 (as per display items)
2. **Signature Cakes** - R75 (as per display items)
3. **Eclairs** - R60 (caramel cream + cadbury chocolate)
4. **Scone** - R40 (with butter, jam +R10, cheese +R15, cream +R15)
5. **Brioche** - R65 (6 buns)
6. **Ciabatta Loaf** - (price not listed) (900g loaf)

---

### 🍵 **TEA SECTION**
**Changed:**
- The new menu says: "Dilmah tea selection: Please ask the waiter for a list of available teas."
- No specific items or prices listed in new menu
- Current menu has specific teas with prices

**Current items should be kept** unless you want to simplify to just the message above.

---

### 🎨 **SIGNATURE SECTION**
**REMOVED:**
- Blizzards (R65)

**KEPT:**
- Mocktails (R70) - but moved to Beverages section in new menu

**NOTE:** Signature section appears empty in new menu or merged with beverages.

---

## 🔧 TECHNICAL CHANGES NEEDED

### TypeScript Type Updates
```typescript
type SectionKey = 
  | 'breakfast' 
  | 'kiddies'
  | 'starters'
  | 'burgers' 
  | 'toasties' 
  | 'wraps' 
  | 'mains'
  | 'steaks'
  | 'platters'
  | 'coffee' 
  | 'tea' 
  | 'beverages' 
  | 'dessert'
  | 'bakery'
  | 'signature';
```

### State Management Updates
Update expandedSections state and sectionRefs to include all new sections.

### Asset Requirements
Check if you need new images for:
- Kiddies section
- Starters section
- Mains section
- Steaks section
- Platters section
- Dessert section
- Bakery section

---

## 📊 PRICING SUMMARY

### Price Increases:
- Coffee flavor infusions: R15 → R20
- Cheesy Red Onion: R85 → R90
- Mighty Crave: R205 → R185 (actually decreased!)

### Major Price Range Changes:
- **Breakfast:** Now R75-R185 (was R55-R205)
- **Burgers:** Now R90-R165+ (was R100-R250)
- **Toasties:** Now R90-R165 (was R80-R245)
- **Wraps:** Now R100-R165 (was R120-R165)

---

## ✅ RECOMMENDATION

This is a **MAJOR MENU OVERHAUL**. Key recommendations:

1. ✅ **Backup current MenuPage.tsx** before making changes
2. ✅ **Update in phases:**
   - Phase 1: Update existing sections (Breakfast, Coffee, Burgers, etc.)
   - Phase 2: Add new sections (Kiddies, Starters, Mains, etc.)
   - Phase 3: Test navigation and layout
   - Phase 4: Add missing images/assets

3. ✅ **Consider creating a two-column layout** for better organization:
   - Left Column: Breakfast, Kiddies, Starters, Burgers, Toasties, Wraps
   - Right Column: Mains, Steaks, Platters, Coffee, Tea, Beverages, Dessert, Bakery

4. ✅ **Review with client** - Some items may have been removed unintentionally

---

## 🚨 ITEMS NEEDING CLARIFICATION

1. **Go Big or Go Home Burger** - No price listed
2. **Dirty Chai** - No price listed
3. **Ciabatta Loaf** - No price listed
4. **Smoothies** - No specific items or prices in new menu
5. **Tea Section** - Simplified to "ask waiter" vs current detailed list
6. **Signature Section** - Appears to be removed/merged

---

**Generated:** November 22, 2025  
**Status:** Ready for Implementation

