import { useEffect, useState, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, ChevronDownIcon, ChevronUpIcon, ArrowUpIcon } from 'lucide-react';
import { SEO } from '../components/SEO';

// --- ASSET IMPORTS ---
import breakfastImg from '../assets/breakfast.webp';
import burgersImg from '../assets/burgers.webp';
import toastImg from '../assets/Toast.webp';
import wrapImg from '../assets/Wrap.webp';
import coffeeImg from '../assets/coffee.webp';
import illyLogo from '../assets/illy.webp';
import teaImg from '../assets/tea.webp';
import dilmahLogo from '../assets/dilmah.webp';
import beverageImg from '../assets/beverage.webp';
import grillImg from '../assets/Grill.webp';
import cakeImg from '../assets/cake.webp';
import lambChopsImg from '../assets/lamb-chops.webp';
import lightMealsImg from '../assets/light_meals.webp';
import cheeseCakeImg from '../assets/cheese-cake.webp';
import halaalIcon from '../assets/halaal.svg';
import menuLogo from '../assets/menu-logo.svg';

type SectionKey = 'breakfast' | 'kiddies' | 'starters' | 'burgers' | 'toasties' | 'wraps' | 'mains' | 'platters' | 'coffee' | 'tea' | 'beverages' | 'dessert' | 'bakery';

export const MenuPage = () => {
  // --- STATE MANAGEMENT ---
  const [isNavSticky, setIsNavSticky] = useState(false);
  // All sections collapsed by default on mobile
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    breakfast: false, kiddies: false, starters: false, burgers: false, toasties: false, wraps: false,
    mains: false, platters: false, coffee: false, tea: false, beverages: false, dessert: false, bakery: false
  });

  const sectionRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({
    breakfast: null, kiddies: null, starters: null, burgers: null, toasties: null, wraps: null,
    mains: null, platters: null, coffee: null, tea: null, beverages: null, dessert: null, bakery: null
  });

  // --- SCROLL LOGIC (Simplified - No nav to update) ---
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 80;
      setIsNavSticky(window.scrollY > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (category: SectionKey) => {
    setExpandedSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  // --- SUB-COMPONENTS ---

  // The "Newspaper Row" Item: just the item name + description (no pricing column)
  const MenuItem = ({ name, desc, highlight = false }: { name: string, desc?: string, highlight?: boolean }) => (
    <div className="mb-5 break-inside-avoid relative group">
      <h4 className={`font-bold uppercase tracking-wide text-primary ${highlight ? 'text-xl' : 'text-lg'}`}>
        {name}
      </h4>
      {desc && (
        <p className="text-sm text-subtextLightBg font-sans leading-tight mt-1 italic opacity-90 max-w-[90%]">
          {desc}
        </p>
      )}
    </div>
  );

  // The "Newspaper Section" Box
  const MenuSection = ({ id, title, img, children, subTitle }: { id: SectionKey, title: string, img: string, children: React.ReactNode, subTitle?: string }) => {
    const isExpanded = expandedSections[id];

    return (
      <div
        ref={el => sectionRefs.current[id] = el}
        id={id}
        className="relative border-4 border-primary bg-light mb-10 transition-all duration-500"
      >
        {/* Section Header - Clickable on all mobile screens, not clickable on desktop */}
        <div
          className="bg-primary text-light p-3 flex justify-between items-center cursor-pointer lg:cursor-default select-none"
          onClick={() => {
            // Toggle on all screens below lg breakpoint (below 1024px)
            if (window.innerWidth < 1024) {
              toggleSection(id);
            }
          }}
        >
          <div className="w-full text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold uppercase tracking-widest">{title}</h2>
            {subTitle && <p className="text-xs uppercase tracking-[0.2em] mt-1 text-secondary">{subTitle}</p>}
          </div>
          {/* Show chevron on all mobile screens (below lg) */}
          <div className="lg:hidden absolute right-4">
            {isExpanded ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
          </div>
        </div>

        {/* Section Content - Always visible on desktop (lg+), collapsible on mobile.
            CSS Grid 0fr -> 1fr trick (AUDIT §5): animates a track size, not the
            max-height layout property, so the reveal speed matches the real
            content height instead of an arbitrary oversized max-h target. */}
        <div className={`grid transition-[grid-template-rows,opacity] duration-panel ease-out-strong lg:grid-rows-[1fr] lg:opacity-100 ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}>
          <div className="relative overflow-hidden">
            {/* Background Watermark (Grayscale + Multiply for drawn effect) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover opacity-[0.07] mix-blend-multiply scale-110"
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>

            <div className="relative z-10 p-6 md:p-8">
               {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light text-primary font-sans selection:bg-secondary selection:text-white">
      <SEO title="Menu Gazette | Café Crave" description="Explore our vintage style menu featuring halaal breakfasts, burgers, and artisan coffee." />
      <Header />
      
      {/* --- MENU HEADER DESIGN --- */}
      <section className="pt-28 pb-8 px-4 max-w-6xl mx-auto">
        {/* Top: Cafe Name */}
        <div className="text-center mb-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary uppercase tracking-wide">
            Café Crave
          </h1>
        </div>

        {/* Horizontal Line */}
        <div className="border-t-2 border-primary mb-2"></div>

        {/* EST 2020 and Tagline */}
        <div className="text-center mb-2">
          <p className="text-sm md:text-base font-bold uppercase tracking-wider text-primary">
            EST 2020
          </p>
          <p className="text-xs md:text-sm italic text-subtextLightBg mt-1">
            Where comfort food meets crave-worthy flavour!
          </p>
        </div>

        {/* Horizontal Line */}
        <div className="border-t-2 border-primary mb-6"></div>

        {/* Main Content Row: 3C Icon | MENU | Halal Badge */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Left: Menu Logo Box */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 border-4 border-primary bg-light flex items-center justify-center p-2">
            <img src={menuLogo} alt="Café Crave Logo" className="w-full h-full object-contain" />
          </div>

          {/* Center: MENU Text */}
          <div className="flex-1 text-center">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary uppercase tracking-wider"
                style={{
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  textShadow: '3px 3px 0px rgba(0,0,0,0.1)',
                  letterSpacing: '0.05em'
                }}>
              MENU
            </h2>
          </div>

          {/* Right: Strictly Halal Badge */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 border-4 border-primary bg-light flex flex-col items-center justify-center p-2">
            <img src={halaalIcon} alt="Halal Certified" className="w-10 h-10 md:w-12 md:h-12 mb-1" />
            <span className="text-[8px] md:text-[10px] font-bold uppercase text-primary text-center leading-tight">
              Strictly<br />Halal
            </span>
          </div>
        </div>

        {/* Star Divider */}
        <div className="flex justify-center items-center gap-2 md:gap-3 border-t-2 border-b-2 border-primary py-2">
          {[...Array(9)].map((_, i) => (
            <Star key={i} size={16} fill="#322C2B" className="text-primary" />
          ))}
        </div>
      </section>



      {/* --- MENU CONTENT GRID --- */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* --- LEFT COLUMN --- */}
          <div className="flex flex-col gap-8">

            <MenuSection id="breakfast" title="Morning Edition" subTitle="Served All Day" img={breakfastImg}>
              <MenuItem name="Avo on Toast 🌱" desc="Sliced avo + feta + rosa tomato + red onion" />
              <MenuItem name="Build o-Omlette 🌱" desc="4 eggs and a slice of ciabatta" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add-ons: Chilli, Tomato, Onions, Egg, Cheese, Feta, Mushroom, Spinach, Avo, Spiced Beef, Sausage, Chicken</p>
              </div>
              <MenuItem name="Breakfast Muffin" desc="English muffin + egg + spiced beef, melted cheese + hash brown" />
              <MenuItem name="Eggs Benedict" desc="English muffin + 2 poached eggs, hollandaise sauce with a choice of: spinach & mushroom OR spiced beef & caramelised onion" />
              <MenuItem name="Brioche French Toast 🌱" desc="With a choice of: berry compote & cream OR classic" />
              <MenuItem name="Loaded Hash Bow" desc="3 scrambled eggs + potato rosti + tomato, spinach + mushroom + sriracha + avo + feta" />
              <MenuItem name="Breakfast Croissant" desc="3 scrambled eggs + spiced beef + avo, feta + cherry tomato" />
              <MenuItem name="Crave Signature" highlight desc="2 eggs + sauteed mushrooms + 2 sausages, baked beans + fries + fried tomato, 2 slices ciabatta + spiced beef" />
              <MenuItem name="Breakfast Wrap" desc="Scrambled eggs + feta + 120g fillet steak, rosa tomato" />
              <MenuItem name="Loaded Avo on Toast" desc="Avo on toast + 2 sausages + 2 eggs, sauteed mushrooms" />
              <MenuItem name="Mighty Crave" highlight desc="3 eggs + 120g steak + 2 sausages, sauteed mushrooms + spiced beef + fries, 2 slices ciabatta + fried tomato, baked beans" />
            </MenuSection>

            <MenuSection id="kiddies" title="Kiddies Corner" subTitle="For The Little Ones" img={lightMealsImg}>
              <MenuItem name="Cheese & Tomato Toastie" desc="A classic triangle toastie (crust | no crust)" />
              <MenuItem name="Chicken and Cheese Wrap" desc="No gross greens" />
              <MenuItem name="Kid Sized Nachos" desc="Half portion nachos" />
              <MenuItem name="Crumbed Chicken Strips" desc="Crispy chicken fillet with fries" />
              <MenuItem name="Chicken or Beef Slider" desc="Mini burger for the mini-me" />

              <div className="mt-6 pt-4 border-t-2 border-dashed border-primary/30">
                <p className="font-bold uppercase text-sm mb-2">Add-ons</p>
                <p className="text-xs text-subtextLightBg leading-relaxed">
                  Chilli • Tomato • Onions • Egg • Cheese • Feta • Mushroom • Spinach • Avo • Spiced Beef • Sausage • Chicken
                </p>
                <p className="font-bold uppercase text-sm mt-4 mb-2">Sauces</p>
                <p className="text-xs text-subtextLightBg leading-relaxed">
                  Hot Honey • Garlic Aoli • Mushroom • Tzatzki • Chilli Cheese • Crave Sauce • Gochujang • Ranch
                </p>
              </div>
            </MenuSection>

            <MenuSection id="starters" title="Starters" subTitle="Small Bites" img={grillImg}>
              <MenuItem name="Sweet Corn Cups 🌱" desc="Served with a choice of: (butter – aromat – chives) OR (butter – chilli – lime)" />
              <MenuItem name="Crumbed Mushrooms 🌱" desc="Served with: plain tartare | garlic & herb tartare" />
              <MenuItem name="Mac & Cheese Balls 🌱" desc="Garlic aoli | hot honey" />
              <MenuItem name="Hot Honey Chicken Tenders" desc="Served in a spicy and sweet sauce" />
              <MenuItem name="Jalapeno Stuffed Rings 🌱" desc="4 stuffed onion rings & a sour cream dip" />
              <MenuItem name="Full Chicken Wings" desc="4 wings served with ranch: hot honey | gochujang | crispy plain" />
            </MenuSection>

            <MenuSection id="burgers" title="The Burger Headline" subTitle="Served with Fries" img={burgersImg}>
              <div className="bg-primary text-light text-center p-2 mb-6">
                 <span className="text-xs font-bold uppercase tracking-widest block">Choose your style: beef patties can be replaced with dhanya</span>
                 <span className="text-xs uppercase tracking-wide">Loaded fries sauce available as an add-on</span>
              </div>
              <MenuItem name="El Classico" desc="Choice of chicken or beef + red onion, lettuce + tomato + mayo" />
              <MenuItem name="Cheesy Crave" desc="Thick in-house patty + red onion + lettuce, tomato + cheese + crave sauce" />
              <MenuItem name="Honey Crunch" desc="Hot honey chicken fillet + mozzarella, teriyaki mayo gherkin slaw" />
              <MenuItem name="JCB" desc="Thick in-house patty + jalapeno ring, jcb sauce + gherkins + mozzarella" />
              <MenuItem name="Tropico" desc="Thick in-house patty + grilled pineapple ring, lettuce + tomato + cheese + crave sauce" />
              <MenuItem name="The Nacho" desc="Thick in-house patty + nacho chips, melted cheese + crave sauce + peppers" />
              <MenuItem name="Hunger Buster" highlight desc="2x thick in-house patties + avo, crave sauce + lettuce + red onion + tomato" />
              <MenuItem name="Go Big or Go Home" highlight desc="3x thick in-house patty + layered with cheese + avo + crave sauce + lettuce, red onion + tomato" />
            </MenuSection>

            <MenuSection id="mains" title="Mains" subTitle="Hearty Meals" img={lambChopsImg}>
              <MenuItem name="Loaded Fries 🌱" desc="Fries + melted cheese sauce + jalapenos" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add hot honey chicken • Add steak</p>
              </div>
              <MenuItem name="Alfredo 🌱" desc="Creamy alfredo with mushrooms" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add chicken • Add steak</p>
              </div>
              <MenuItem name="Lemon Chilli Chicken Pasta" desc="Creamy pasta + grilled chicken | feta, lemon zest + hints of chilli | cherry tomato" />
              <MenuItem name="Nachos 🌱" desc="Crispy nacho chips layered with cheese, salsa + guac + sour cream" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add grilled chicken • Add hot honey chicken • Add steak</p>
              </div>
              <MenuItem name="Grilled Chicken Fillet" desc="Chicken breast + 2 jalapeno rings + fries" />

              <div className="mt-6 pt-4 border-t-2 border-dashed border-primary/30">
                <p className="font-bold uppercase text-sm mb-2">Steak Cuts</p>
                <p className="text-xs text-subtextLightBg italic mb-3">Served with onion rings + fries / salad</p>
                <MenuItem name="300g Lamb Chops" />
                <MenuItem name="120g Rump Steak" />
                <MenuItem name="220g Rump Steak" />
                <MenuItem name="120g Fillet Steak" />
                <MenuItem name="220g Fillet Steak" highlight />
              </div>
            </MenuSection>

            <MenuSection id="platters" title="Platters" subTitle="Share & Enjoy" img={grillImg}>
              <MenuItem name="Street Platter" desc="2 sliders + hot honey chicken tenders, loaded fries + 3 jalapeno rings, crumbed mushrooms" />
              <MenuItem name="Sharing Platter" desc="Hot honey chicken + 4 wings + corn cups, 2 jalapeno stuffed rings + loaded fries" />
              <MenuItem name="Family Platter" highlight desc="2 el classico beef + 2 el classico chicken, 8 wings + loaded fries + crumbed mush." />
              <MenuItem name="Grill Platter" highlight desc="400g ribs + 8 wings + hot honey tenders, loaded fries + crumbed mushroom, corn cups" />
            </MenuSection>

          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex flex-col gap-8">

            <MenuSection id="toasties" title="Toasted Gazette" subTitle="Toasties" img={toastImg}>
              <MenuItem name="Cheesy Red Onion 🌱" desc="Red onion + cheese + tomato" />
              <MenuItem name="Chicken Mayo (plain | spicy)" desc="Chicken fillet + in house mayo, spicy (crave sauce)" />
              <MenuItem name="Triple Cheese Melt 🌱" desc="Chedder + mozzarella + feta, caramelized onion + garlic butter" />
              <MenuItem name="Crave Mushroom Melt 🌱" desc="Mushroom + mozzarella + cheddar, caramelized onion + garlic butter + truffle oil" />
              <MenuItem name="Crave Steak" desc="Fillet steak + red onion + lettuce + cheese, crave sauce" />
            </MenuSection>

            <MenuSection id="wraps" title="Wraps" subTitle="Light Meals" img={wrapImg}>
              <MenuItem name="Smashburger Wrap" desc="Beef + cheese + lettuce + avo + crave sauce" />
              <MenuItem name="Chicken Caeser" desc="Feta + lettuce + red onion + avo + croutons, caeser dressing" />
              <MenuItem name="Chicken Quesadilla" desc="Chicken fillet + peppers + cheese + salsa" />
              <MenuItem name="Steak Quesadilla" desc="Fillet steak + peppers + salsa + cheese, sour cream" />
              <MenuItem name="Vegan Smash Wrap 🌱" desc="Falafel + avo + caramelized onion + gherkins, tomato + vegan crave sauce" />
            </MenuSection>

            <MenuSection id="coffee" title="Coffee Press" subTitle="Illy Italian Blend" img={coffeeImg}>
               <div className="absolute top-4 right-4 w-16 opacity-80 mix-blend-multiply">
                 <img src={illyLogo} alt="Illy" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <div>
                    <MenuItem name="Espresso" desc="Single shot of black gold" />
                    <MenuItem name="Cortado" desc="Double shot espresso, equal parts textured foam" />
                    <MenuItem name="Americano" desc="Single shot espresso, 3 parts hot water (black)" />
                    <MenuItem name="Cappuccino" desc="Single shot espresso, steamed milk, foam" />
                  </div>
                  <div>
                    <MenuItem name="Flat White - Double Shot" desc="Double shot espresso, steamed milk, small foam layer" />
                    <MenuItem name="Latte / Chai Latte" desc="Single shot espresso, steamed milk, small foam layer / chai" />
                    <MenuItem name="Iced Coffee" desc="Double shot espresso, milk, ice" />
                    <MenuItem name="Dirty Chai" desc="Single shot espresso, classic chai mix" />
                  </div>
               </div>
               <div className="mt-4">
                 <MenuItem name="Hot Chocolate / White" desc="Option of decedant hot chocolate or white hot chocolate" />
                 <MenuItem name="Mocha / White Mocha" desc="Espresso, hot chocolate" />
                 <MenuItem name="Vietnamese Iced Coffee" desc="Double shot espresso, condensed milk, milk, ice" />
                 <MenuItem name="Coffee Freezo" desc="Espresso, milk, ice, freezo" />
               </div>
            </MenuSection>

             <MenuSection id="beverages" title="Cold Press" subTitle="Refreshments" img={beverageImg}>
              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Milkshakes</h3>
                <p className="text-sm leading-relaxed italic text-subtextLightBg">
                  Lime • Banana • Bubblegum • Chocolate • Strawberry • Chai • Coffee • Bar One • Turkish Delight
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Smoothies</h3>
                <MenuItem name="Red Alert" desc="Strawberry | banana, apple juice | yogurt | honey" />
                <MenuItem name="Bluephoria" desc="Blueberries | banana, almond milk | chia seeds" />
                <MenuItem name="Green Genie" desc="Spinach | avocado | mango, banana | coconut water" />
                <MenuItem name="Mellow Yellow" desc="Mango | pineapple | lime, yogurt | orange juice" />
              </div>

              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Cordials &amp; Mocktails</h3>
                <p className="text-sm leading-relaxed italic text-subtextLightBg">
                  Passion Fruit Cordial • Blueberry Cordial • Lemon &amp; Lime Cordial • Watermelon Spritzer • Apple, Melon &amp; Mint Mocktail • Guava Grapefruit &amp; Pineapple • Mango Daiquiri • Strawberry Daiquiri • Mojito • Pina Colada
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Cold Beverages</h3>
                <MenuItem name="100% Fruit Juice 350ml" desc="Strawberry | pineapple | orange | mango, cranberry | mango & orange | apple" />
                <MenuItem name="Sanpellegrino" desc="Blood orange | grapefruit | gingerbeer, pomegranate | lemon | orange, orange & fig | peach & clementine" />
                <MenuItem name="Kinza" desc="Cola | citrus | lemonade" />
                <MenuItem name="Bashews" desc="Cola | iron brew | pineapple | cocopine, very berry | passion fruit | lemonade" />
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Water</h3>
                <MenuItem name="S. Pellegrino Sparkling 500ml" />
                <MenuItem name="Aqua Panna Still 500ml" />
                <MenuItem name="Aqua Panna Still 1L" />
                <MenuItem name="S. Pellegrino Sparkling 1L" />
              </div>
            </MenuSection>

            <MenuSection id="tea" title="Tea Time" subTitle="Selection by Dilmah" img={teaImg}>
              <div className="flex items-center justify-end mb-4">
                <img src={dilmahLogo} alt="Dilmah" className="h-5 opacity-80" />
              </div>
              <p className="text-center italic text-subtextLightBg">Dilmah tea selection: Please ask the waiter for a list of available teas.</p>
            </MenuSection>

            <MenuSection id="dessert" title="Dessert" subTitle="Sweet Treats" img={cakeImg}>
              <MenuItem name="Churros" desc="Cinnamon dusted, choice of sauce - caramel | chocolate" />
              <MenuItem name="Brownie Sundae" desc="Layered choc brownie + vanilla ice cream" />
            </MenuSection>

            <MenuSection id="bakery" title="Bakery" subTitle="Fresh Daily" img={cheeseCakeImg}>
              <MenuItem name="Gourmet Cheesecake" desc="Burnt basque | cadbury burnt basque | caramel | choc brownie | tiramisu | lemon creme | biscoff" />
              <MenuItem name="Signature Cakes" desc="Choc brownie | cadbury | choc caramel" />
              <MenuItem name="Eclairs (4)" desc="Caramel cream + cadbury chocolate" />
              <MenuItem name="Scone" desc="With butter" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add jam • Add cheese • Add cream</p>
              </div>
              <MenuItem name="Brioche" desc="6 buns" />
              <MenuItem name="Ciabatta Loaf" desc="900g loaf" />
            </MenuSection>

          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-16 border-t-4 border-primary pt-8 w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 px-4 md:px-8">
            <p className="font-bold text-lg md:text-xl uppercase text-primary text-center">
              10% Service fee on tables of 6+
            </p>
          </div>
        </div>

      </main>

      <Footer />
      
      {/* Back to Top Button. The offset "stamped" shadow is press feedback
          (3.2/M2, apple-design §1: feedback belongs on pointer-down, not
          hover) -- it fully flattens on :active. A real pointer additionally
          gets a subtler pre-press hint (6.3: gated behind (hover: hover) so
          touch doesn't latch a half-pressed look after a tap). */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 right-7 bg-primary text-light w-12 h-12 flex items-center justify-center rounded-none shadow-[4px_4px_0px_0px_rgba(131,81,63,1)] hh:shadow-[2px_2px_0px_0px_rgba(131,81,63,1)] hh:translate-y-0.5 active:!translate-y-1 active:!shadow-none transition-[transform,box-shadow] duration-press ease-out z-40 border-2 border-light ${isNavSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
};
