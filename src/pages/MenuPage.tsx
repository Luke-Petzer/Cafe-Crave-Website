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

type SectionKey = 'breakfast' | 'kiddies' | 'starters' | 'burgers' | 'toasties' | 'wraps' | 'mains' | 'steaks' | 'platters' | 'coffee' | 'tea' | 'beverages' | 'dessert' | 'bakery';

export const MenuPage = () => {
  // --- STATE MANAGEMENT ---
  const [isNavSticky, setIsNavSticky] = useState(false);
  // All sections collapsed by default on mobile
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    breakfast: false, kiddies: false, starters: false, burgers: false, toasties: false, wraps: false,
    mains: false, steaks: false, platters: false, coffee: false, tea: false, beverages: false, dessert: false, bakery: false
  });
  
  const sectionRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({
    breakfast: null, kiddies: null, starters: null, burgers: null, toasties: null, wraps: null,
    mains: null, steaks: null, platters: null, coffee: null, tea: null, beverages: null, dessert: null, bakery: null
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

  // The "Newspaper Row" Item:  Burger ...... R100
  const MenuItem = ({ name, price, desc, highlight = false }: { name: string, price: string, desc?: string, highlight?: boolean }) => (
    <div className="mb-5 break-inside-avoid relative group">
      <div className="flex justify-between items-baseline w-full">
        <h4 className={`font-bold uppercase tracking-wide text-primary ${highlight ? 'text-xl' : 'text-lg'}`}>
          {name}
        </h4>
        {/* The Dotted Leader Line */}
        <div className="flex-grow mx-2 border-b-2 border-dotted border-primary/40 relative -top-1"></div>
        <span className={`font-serif font-bold text-primary ${highlight ? 'text-2xl' : 'text-xl'}`}>
          {price}
        </span>
      </div>
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

        {/* Section Content - Always visible on desktop (lg+), collapsible on mobile */}
        <div className={`relative overflow-hidden transition-all duration-500 lg:max-h-none lg:opacity-100 ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
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
    );
  };

  return (
    <div className="min-h-screen bg-light text-primary font-sans selection:bg-secondary selection:text-white">
      <SEO title="Menu Gazette | Cafe Crave" description="Explore our vintage style menu featuring halaal breakfasts, burgers, and artisan coffee." />
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
            <img src={menuLogo} alt="Cafe Crave Logo" className="w-full h-full object-contain" />
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
              <MenuItem name="Avo on Toast" price="R75" desc="Sliced avo + feta, rosa tomato, red onion" />
              <MenuItem name="Build-o-Omelette" price="R85" desc="3 eggs and a slice of ciabatta" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add-ons: Chilli (R10), Tomato (R10), Onions (R10), Egg (R15), Cheese (R15), Feta (R15), Mushroom (R15), Spinach (R25), Avo (R25), Spiced Beef (R25), Sausage (R25), Chicken (R35)</p>
              </div>
              <MenuItem name="Breakfast Muffin" price="R90" desc="English muffin + egg + spiced beef, melted cheese + hash brown" />
              <MenuItem name="Eggs Benedict" price="R95" desc="English muffin + 2 poached eggs, hollandaise sauce with choice of: spinach & mushroom OR spiced beef & caramelised onion" />
              <MenuItem name="Brioche French Toast" price="R95" desc="With choice of: berry compote & cream OR classic creme brulee" />
              <MenuItem name="Loaded Hash Bowl" price="R105" desc="3 scrambled eggs + hash brown + tomato, spinach + mushroom + sriracha + avo + feta" />
              <MenuItem name="Vegan Burrito" price="R115" desc="Hummus + tzatziki + chickpeas + roast veg" />
              <MenuItem name="Crave Signature" price="R135" highlight desc="2 eggs + sauteed mushrooms + 2 sausages, baked beans + fries + fried tomato, 2 slices ciabatta + spiced beef" />
              <MenuItem name="Loaded Avo on Toast" price="R135" desc="Avo on toast + 2 sausages + 2 eggs + sauteed mushrooms" />
              <MenuItem name="Breakfast Wrap" price="R145" desc="Scrambled eggs + feta + fillet steak, rosa tomato" />
              <MenuItem name="Mighty Crave" price="R185" highlight desc="3 eggs + 120g steak + 2 sausages, sauteed mushrooms + spiced beef + fries, 2 slices ciabatta + fried tomato + baked beans" />

              <div className="mt-6 pt-4 border-t-2 border-dashed border-primary/30">
                <p className="font-bold uppercase text-sm mb-2">Add-ons</p>
                <p className="text-xs text-subtextLightBg leading-relaxed">
                  Chilli (R10) • Tomato (R10) • Onions (R10) • Egg (R15) • Cheese (R15) • Mushroom (R15) • Toast (R15) • Avo (R25) • Spiced Beef (R25) • Sausage (R25) • Fries (R40) • Spinach & Butternut (R45) • Chicken (R45)
                </p>
                <p className="font-bold uppercase text-sm mt-4 mb-2">Sauces (R30)</p>
                <p className="text-xs text-subtextLightBg leading-relaxed">
                  Hot Honey • Garlic Aioli • Mushroom • Tzatziki • Chilli Cheese • Crave Sauce • Gochujang • Ranch
                </p>
              </div>
            </MenuSection>

            <MenuSection id="kiddies" title="Kiddies Corner" subTitle="For The Little Ones" img={lightMealsImg}>
              <MenuItem name="Cheese & Tomato Toastie" price="R75" desc="A classic triangle toastie (crust / no crust)" />
              <MenuItem name="Chicken and Cheese Wrap" price="R75" desc="No gross greens, kid sized" />
              <MenuItem name="Nacho" price="R75" desc="Nachos + cheese + cheese sauce" />
              <MenuItem name="Crumbed Chicken Strips" price="R80" desc="Crispy chicken fillet" />
              <MenuItem name="Chicken or Beef Slider" price="R80" desc="Mini burger for the mini-me" />
            </MenuSection>

            <MenuSection id="starters" title="Starters" subTitle="Small Bites" img={grillImg}>
              <MenuItem name="Sweet Corn Cups" price="R55" desc="Served with choice of: (butter, aromat, chives) OR (butter, chilli, lime)" />
              <MenuItem name="Jalapeno Stuffed Rings" price="R65" desc="4 stuffed onion rings & a sour cream dip" />
              <MenuItem name="Crumbed Mushrooms" price="R65" desc="Served with tartare sauce in choice of: plain | garlic & herb" />
              <MenuItem name="Mac & Cheese Balls" price="R65" desc="Garlic aioli, hot honey" />
              <MenuItem name="Cheeseburger Spring Rolls" price="R70" desc="Choice of dipping sauce" />
              <MenuItem name="Full Chicken Wings" price="R75" desc="4 wings served with ranch: hot honey, gochujang | crispy plain, hot honey" />
              <MenuItem name="Chicken Tender" price="R85" desc="Served as is" />
            </MenuSection>

            <MenuSection id="coffee" title="Coffee Press" subTitle="Illy Italian Blend" img={coffeeImg}>
               <div className="absolute top-4 right-4 w-16 opacity-80 mix-blend-multiply">
                 <img src={illyLogo} alt="Illy" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <div>
                    <MenuItem name="Espresso" price="R30" desc="Single shot of black gold" />
                    <MenuItem name="Americano" price="R35" desc="Single shot espresso, 3 parts hot water (black)" />
                    <MenuItem name="Cappuccino" price="R40" desc="Single shot espresso, steamed milk, foam" />
                    <MenuItem name="Cortado" price="R45" desc="Double shot espresso, equal parts textured foam" />
                  </div>
                  <div>
                    <MenuItem name="Vienna" price="R50" desc="Single shot espresso, condensed milk" />
                    <MenuItem name="Flat White - Double Shot" price="R50" desc="Double shot espresso, steamed milk, small foam layer" />
                    <MenuItem name="Latte" price="R50" desc="Single shot espresso, steamed milk, small foam layer" />
                    <MenuItem name="Chai Latte" price="R50" desc="Spiced black tea, steamed milk, milk foam" />
                  </div>
               </div>
               <div className="mt-4">
                 <MenuItem name="Dirty Chai" price="R60" desc="Single shot espresso, classic chai mix" />
                 <MenuItem name="Mocha / White Mocha" price="R60" desc="Espresso, Nomu hot chocolate, whipped cream" />
                 <MenuItem name="Vietnamese Iced Coffee" price="R65" desc="Double shot espresso, condensed milk, milk, ice" />
               </div>
               <div className="mt-6 pt-4 border-t-2 border-dashed border-primary/30 text-center">
                 <p className="font-bold uppercase text-sm mb-2">Flavour Infusions (+R20)</p>
                 <p className="text-xs italic text-subtextLightBg">
                   Vanilla • Hazelnut • Caramel • Shortbread
                 </p>
               </div>
            </MenuSection>
            
             <MenuSection id="beverages" title="Cold Press" subTitle="Refreshments" img={beverageImg}>
              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Milkshakes</h3>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold uppercase">All Flavours</span>
                  <span className="font-serif font-bold text-xl">R75</span>
                </div>
                <p className="text-sm leading-relaxed italic text-subtextLightBg">
                  Lime • Banana • Bubblegum • Chocolate • Strawberry • Chai • Coffee • Bar One • Red • Blue • Green • Yellow • Orange
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Beverages</h3>
                <MenuItem name="Bashe" price="R20" desc="Cola, Iron Brew, Pineapple, Very Berry, Passion Fruit, Lemonade, Cocopine" />
                <MenuItem name="San Pellegrino" price="R40" desc="Blood Orange, Grapefruit, Gingerbeer, Pomegranate, Lemon, Orange, Orange & Fig, Peach & Clementine" />
                <MenuItem name="100% Fruit Juice" price="R40" desc="Strawberry, Pineapple, Orange, Mango, Cranberry, Mango & Orange, Apple" />
                <MenuItem name="Cordials" price="R60" desc="Passion Fruit, Lemonade, Blueberry, Lemon & Lime" />
              </div>

              <div className="mb-6">
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Water</h3>
                <MenuItem name="Aqua Panna 500ml" price="R35" />
                <MenuItem name="S. Pellegrino 500ml" price="R35" />
                <MenuItem name="Aqua Panna 1L" price="R55" />
                <MenuItem name="S. Pellegrino 1L" price="R55" />
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl underline decoration-dotted decoration-2 mb-4">Mocktails</h3>
                <MenuItem name="Mocktails" price="R70" desc="Pina Colada • Strawberry Daiquiri • Mojito • Mango Daiquiri" />
              </div>
            </MenuSection>

            <MenuSection id="wraps" title="Wraps" subTitle="Light Meals" img={wrapImg}>
              <MenuItem name="Falafel" price="R100" desc="Cucumber + red onion + tzatziki + tomato" />
              <MenuItem name="Smashburger Wrap" price="R115" desc="Beef + cheese + lettuce + avo + crave sauce" />
              <MenuItem name="Chicken (grilled | crumbed)" price="R135" desc="Feta + mixed leaves + cucumber + avo, sauce choice: garlic mayo | sriracha mayo" />
              <MenuItem name="Chicken Quesadilla" price="R135" desc="Chicken fillet + peppers + cheese + salsa" />
              <MenuItem name="Steak" price="R165" desc="Fillet steak + red onion + tomato + fresh greens" />
            </MenuSection>

          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex flex-col gap-8">

            <MenuSection id="burgers" title="The Burger Headline" subTitle="Served with Chips" img={burgersImg}>
              <div className="bg-primary text-light text-center p-2 mb-6">
                 <span className="text-xs font-bold uppercase tracking-widest block mb-1">All Burgers Served on Home-Made Brioche Bun</span>
                 <span className="text-xs uppercase tracking-wide">Choose your style: Chicken | Dhanya Beef | Smash Patty</span>
              </div>
              <MenuItem name="El Classico" price="R90" desc="100g patty + red onion + lettuce + tomato, mayo" />
              <MenuItem name="Chilli Cheese" price="R115" desc="The classico + cheese + chilli cheese sauce" />
              <MenuItem name="Cheesy Crave" price="R125" desc="200g patty + red onion + lettuce + tomato, cheese + crave sauce" />
              <MenuItem name="Tropico" price="R135" desc="200g patty + pineapple ring + lettuce + tomato, cheese + crave sauce" />
              <MenuItem name="The Nacho" price="R145" desc="200g patty + nacho chips + melted cheese, crave sauce" />
              <MenuItem name="Hunger Buster" price="R165" highlight desc="Choice of any 2x 200g patties + avo, crave sauce + lettuce + red onion + tomato" />
              <MenuItem name="Go Big or Go Home" price="R185" highlight desc="Choice of any 3x 200g patties + layered with cheese + avo + crave sauce + lettuce, red onion + tomato" />
            </MenuSection>

            <MenuSection id="toasties" title="Toasted Gazette" subTitle="Toasties" img={toastImg}>
              <MenuItem name="Cheesy Red Onion" price="R90" desc="Red onion + cheese + tomato" />
              <MenuItem name="Chicken Mayo (plain | spicy)" price="R100" desc="Chicken fillet + in house mayo, spicy = crave sauce" />
              <MenuItem name="Triple Cheese" price="R135" desc="Cheddar + mozzarella + feta" />
              <MenuItem name="Pulled Lamb Melt" price="R155" highlight desc="Lamb + cheese + caramelized onion" />
              <MenuItem name="Crave Steak" price="R165" highlight desc="Fillet steak + red onion + lettuce + cheese, crave sauce" />
            </MenuSection>

            <MenuSection id="mains" title="Mains" subTitle="Hearty Meals" img={grillImg}>
              <MenuItem name="Loaded Fries" price="R85" desc="Fries + melted cheese sauce + jalapenos" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add hot honey chicken (+R35) • Add beef smash (+R40) • Add pulled lamb (+R50)</p>
              </div>
              <MenuItem name="Alfredo" price="R105" desc="Creamy alfredo with mushrooms" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add chicken (+R35) • Add steak (+R65)</p>
              </div>
              <MenuItem name="Lemon Chilli Chicken Pasta" price="R130" desc="Creamy pasta + grilled chicken, lemon zest + hints of chilli" />
              <MenuItem name="Nachos" price="R105" desc="Crispy nacho chips layered with cheese, salsa + guac + sour cream" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add grilled chicken (+R35) • Add hot honey chicken (+R35) • Add pulled lamb (+R50) • Add steak (+R65)</p>
              </div>
            </MenuSection>

            <MenuSection id="steaks" title="Steaks" subTitle="Premium Cuts" img={lambChopsImg}>
              <div className="bg-primary text-light text-center p-1 mb-6">
                 <span className="text-xs font-bold uppercase tracking-widest">Served with a sauce of choice + onion rings + chips</span>
              </div>
              <MenuItem name="120g Rump Steak" price="R125" />
              <MenuItem name="220g Rump Steak" price="R215" />
              <MenuItem name="120g Fillet Steak" price="R145" />
              <MenuItem name="220g Fillet Steak" price="R250" highlight />
            </MenuSection>

            <MenuSection id="platters" title="Platters" subTitle="Share & Enjoy" img={grillImg}>
              <MenuItem name="Street Platter" price="R210" desc="2 sliders + hot honey chicken tenders, loaded fries + 2 veg starters" />
              <MenuItem name="Grill Platter" price="R240" highlight desc="2 lamb chops + 120g steak + 2 sausages, fries + crispy onion rings" />
              <MenuItem name="Sharing Platter" price="R245" desc="Hot honey chicken + 8 chicken wings, jalapeno stuffed rings + corn cups" />
              <MenuItem name="Family Platter" price="R395" highlight desc="2 el classico + 2 cheesy crave, 2 sweet corn cups + 2 large fries" />
            </MenuSection>

            <MenuSection id="tea" title="Tea Time" subTitle="Selection by Dilmah" img={teaImg}>
              <div className="flex items-center justify-end mb-4">
                <img src={dilmahLogo} alt="Dilmah" className="h-5 opacity-80" />
              </div>
              <p className="text-center italic text-subtextLightBg mb-4">Dilmah tea selection: Please ask the waiter for a list of available teas.</p>
              <MenuItem name="Dilmah Speciality" price="R45" desc="Peach, Lemon, Ceylon, Spice Chai, Strawberry, Lime & Orange, Ginger & Honey" />
              <MenuItem name="Rooibos Selection" price="R40" desc="Natural, Cinnamon/Turmeric, Caramel/Ginger, Cardamom" />
              <MenuItem name="Organic Teas" price="R50" desc="Pure Green, English Breakfast, Berry Explosion" />
            </MenuSection>

            <MenuSection id="dessert" title="Dessert" subTitle="Sweet Treats" img={cakeImg}>
              <MenuItem name="Loaded Donuts" price="R80" desc="Caramel cream stuffed + Cadbury drizzle, peppermint crunch" />
              <MenuItem name="Ice Cream Sandwich" price="R85" desc="Choc chip cookies + vanilla ice cream" />
              <MenuItem name="Churros" price="R85" desc="Cinnamon dusted, choice of sauce: caramel / chocolate" />
              <MenuItem name="Brownie Sundae" price="R90" desc="Layered choc brownie + vanilla ice cream" />
              <MenuItem name="Loaded Waffle Bites" price="R105" highlight desc="Light waffle bits with choice of: strawberry shortbread | oreo & ice cream | banana & biscoff | death by chocolate" />
            </MenuSection>

            <MenuSection id="bakery" title="Bakery" subTitle="Fresh Daily" img={cheeseCakeImg}>
              <MenuItem name="Gourmet Cheesecake" price="R80" desc="As per display items" />
              <MenuItem name="Signature Cakes" price="R75" desc="As per display items" />
              <MenuItem name="Eclairs" price="R60" desc="Caramel cream + Cadbury chocolate" />
              <MenuItem name="Scone" price="R40" desc="With butter" />
              <div className="ml-4 mb-4 text-xs text-subtextLightBg italic">
                <p>Add jam (+R10) • Add cheese (+R15) • Add cream (+R15)</p>
              </div>
              <MenuItem name="Brioche" price="R65" desc="6 buns" />
              <MenuItem name="Ciabatta Loaf" price="R60" desc="900g loaf" />
            </MenuSection>

          </div>
        </div>
        
        {/* Footer Disclaimer */}
        <div className="mt-16 border-t-4 border-primary pt-8 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 px-4 md:px-8">
            <p className="font-bold text-lg md:text-xl uppercase text-primary text-center md:text-left">
              10% Service fee on tables of 6+
            </p>
            <p className="text-sm md:text-base italic text-subtextLightBg text-center md:text-right">
              Prices subject to change without prior notice. E&OE.
            </p>
          </div>
        </div>

      </main>

      <Footer />
      
      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-primary text-light w-12 h-12 flex items-center justify-center rounded-none shadow-[4px_4px_0px_0px_rgba(131,81,63,1)] hover:translate-y-1 hover:shadow-none transition-all z-50 border-2 border-light ${isNavSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ArrowUpIcon />
      </button>
    </div>
  );
};
