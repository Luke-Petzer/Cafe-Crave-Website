import { useEffect, useState, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPinIcon, ArrowDownIcon, DownloadIcon, ChevronDownIcon, ChevronUpIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';

// Define the section types
type SectionKey = 'breakfast' | 'burgers' | 'sandwiches' | 'wraps' | 'coffee' | 'tea' | 'beverages' | 'signature';

export const MenuPage = () => {
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
        useRef<HTMLDivElement>(null);
        const sectionRefs: Record<SectionKey, React.RefObject<HTMLDivElement>> = {
            breakfast: useRef<HTMLDivElement>(null),
            burgers: useRef<HTMLDivElement>(null),
            sandwiches: useRef<HTMLDivElement>(null),
            wraps: useRef<HTMLDivElement>(null),
            coffee: useRef<HTMLDivElement>(null),
            tea: useRef<HTMLDivElement>(null),
            beverages: useRef<HTMLDivElement>(null),
            signature: useRef<HTMLDivElement>(null)
        };
        // Handle sticky nav and back to top button visibility
        useEffect(() => {
            const handleScroll = () => {
                if (navRef.current) {
                    const navPosition = navRef.current.getBoundingClientRect().top;
                    setIsNavSticky(navPosition <= 60); // Account for fixed header
                }
                // Show back to top button when scrolled down 500px
                setShowBackToTop(window.scrollY > 500);
                // Update active category based on scroll position
                const headerHeight = 60; // Fixed header height
                const navHeight = navRef.current?.offsetHeight || 0;
                const offset = isNavSticky ? navHeight + headerHeight : navHeight + headerHeight + 20;
                const scrollPosition = window.scrollY + offset;
                Object.entries(sectionRefs).forEach(([category, ref]) => {
                    if (ref.current) {
                        const element = ref.current;
                        const offsetTop = element.offsetTop;
                        const offsetHeight = element.offsetHeight;
                        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                            setActiveCategory(category);
                            // No longer auto-expand sections on scroll
                        }
                    }
                });
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [isNavSticky]);
        // Scroll to the selected category section
        const scrollToSection = (category: string) => {
            const ref = sectionRefs[category as SectionKey];
            if (ref.current) {
                const headerHeight = 60; // Fixed header height
                const navHeight = navRef.current?.offsetHeight || 0;
                const totalOffset = navHeight + headerHeight + 20; // Add extra buffer

                // Get the element's position relative to the document
                const elementPosition = ref.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };
        // Scroll the navigation menu left or right
        const scrollNav = (direction: 'left' | 'right') => {
            if (navScrollRef.current) {
                const scrollAmount = 200; // Amount to scroll
                const currentScroll = navScrollRef.current.scrollLeft;
                navScrollRef.current.scrollTo({
                    left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                    behavior: 'smooth'
                });
            }
        };
        // Handle keyboard navigation for the menu categories
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
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        const toggleSection = (category: SectionKey) => {
            setExpandedSections(prev => ({
                ...prev,
                [category]: !prev[category]
            }));
        };
        return (
          <div className="min-h-screen">
            <SEO
              title="Our Menu"
              description="Explore Crave Café's menu featuring artisan coffee, specialty drinks, breakfast, burgers, sandwiches, and more. Fresh ingredients, local suppliers, exceptional taste."
              keywords="café menu, coffee menu, breakfast Cape Town, burgers, sandwiches, specialty coffee, artisan food"
            />
            <ScrollAnimationObserver />
            <Header />
            {/* Hero Section - DARK */}
            <section id="main-content" className="section-animate section-dark main-content relative min-h-[600px] md:min-h-[650px] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Coffee and pastries on a wooden table" className="w-full h-full object-cover brightness-50" loading="lazy" />
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-['Rockwell',serif] font-bold mb-6 leading-tight">
                        Our Menu
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                        From all-day breakfasts to handcrafted drinks — something for
                        everyone.
                    </p>
                    <a href="#menu-categories" className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
                        <ArrowDownIcon size={20} className="mr-2" />
                        Browse Menu
                    </a>
                </div>
            </section>
            {/* Menu Navigation (Sticky Sub-Nav) */}
            <div id="menu-categories" ref={navRef} className={`hidden md:block section-dark py-4 transition-all duration-300 ${isNavSticky ? 'sticky top-[60px] z-40 shadow-md' : ''}`} onMouseEnter={() => setShowNavArrows(true)} onMouseLeave={() => setShowNavArrows(false)} onFocus={() => setShowNavArrows(true)} onBlur={() => setShowNavArrows(false)}>
                <div className="container mx-auto px-4 relative">
                    {/* Left navigation arrow */}
                    <button onClick={() => scrollNav('left')} className={`absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-light p-1 rounded-full z-10 transition-opacity ${showNavArrows ? 'opacity-80' : 'opacity-0'} hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent`} aria-label="Scroll menu categories left">
                        <ChevronLeftIcon size={24} />
                    </button>
                    {/* Scrollable menu navigation */}
                    <div ref={navScrollRef} className="overflow-x-auto menu-scroll-container" tabIndex={-1}>
                        <ul className="flex space-x-4 md:space-x-6 min-w-max scroll-snap-x">
                            {[{
                                id: 'breakfast',
                                label: 'Breakfast'
                            }, {
                                id: 'burgers',
                                label: 'Burgers'
                            }, {
                                id: 'sandwiches',
                                label: 'Sandwiches'
                            }, {
                                id: 'wraps',
                                label: 'Wraps & Pitas'
                            }, {
                                id: 'coffee',
                                label: 'Coffee'
                            }, {
                                id: 'tea',
                                label: 'Tea'
                            }, {
                                id: 'beverages',
                                label: 'Beverages'
                            }, {
                                id: 'signature',
                                label: 'Signature Drinks'
                            }].map(category => <li key={category.id} className="scroll-snap-align-center">
                                <button onClick={() => scrollToSection(category.id)} onKeyDown={e => handleKeyDown(e, category.id)} className={`whitespace-nowrap px-3 py-2 rounded-md transition-colors ${activeCategory === category.id ? 'bg-accent text-light font-medium' : 'text-light hover:text-secondary'}`} data-category={category.id} aria-current={activeCategory === category.id ? 'true' : 'false'}>
                                    {category.label}
                                </button>
                            </li>)}
                        </ul>
                    </div>
                    {/* Right navigation arrow */}
                    <button onClick={() => scrollNav('right')} className={`absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-light p-1 rounded-full z-10 transition-opacity ${showNavArrows ? 'opacity-80' : 'opacity-0'} hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent`} aria-label="Scroll menu categories right">
                        <ChevronRightIcon size={24} />
                    </button>
                </div>
            </div>
            {/* Menu Sections - Main Content */}
            <div className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-6 md:px-10 lg:px-16">
                    {/* Menu Content Container */}
                    <div className="relative overflow-hidden">
                        {/* Decorative Circular Stamp Watermarks */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute -left-20 top-20 w-[400px] h-[400px] rounded-full border-[30px] border-[#F5F0E5] opacity-20"></div>
                            <div className="absolute right-0 top-[600px] w-[300px] h-[300px] rounded-full border-[25px] border-[#F5F0E5] opacity-20"></div>
                            <div className="absolute -left-40 top-[1200px] w-[500px] h-[500px] rounded-full border-[35px] border-[#F5F0E5] opacity-20"></div>
                            <div className="absolute right-0 top-[1800px] w-[400px] h-[400px] rounded-full border-[30px] border-[#F5F0E5] opacity-20"></div>
                            <div className="absolute -right-20 top-[2400px] w-[350px] h-[350px] rounded-full border-[25px] border-[#F5F0E5] opacity-20"></div>
                        </div>
                        {/* Breakfast Section */}
                        <div ref={sectionRefs.breakfast} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Breakfast
                                </h2>
                                <button onClick={() => toggleSection('breakfast')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.breakfast ? 'Collapse Breakfast section' : 'Expand Breakfast section'} aria-expanded={expandedSections.breakfast}>
                                    {expandedSections.breakfast ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>
                            <div className={`grid md:grid-cols-2 gap-10 ${expandedSections.breakfast ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Eggs & Toast
                                            </h4>
                                            <span className="text-accent font-bold">R55</span>
                                        </div>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Smashed Avo & Toast
                                            </h4>
                                            <span className="text-accent font-bold">R65</span>
                                        </div>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Basic Breakfast
                                            </h4>
                                            <span className="text-accent font-bold">R90</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            2 free-range eggs, 2 sausages, 1 slice of toast
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Basic Omelette
                                            </h4>
                                            <span className="text-accent font-bold">R90</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            3 free-range eggs, filled with cheese and onion. Served
                                            with 2 slices of toasted ciabatta
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Breakfast Bun
                                            </h4>
                                            <span className="text-accent font-bold">R100</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Toasted brioche bun, filled with 2 free-range eggs, spiced
                                            beef, lettuce & red onion. Served with chips
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                French Toast
                                            </h4>
                                            <span className="text-accent font-bold">R110</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            3 slices of brioche, dunked in a sweet cinnamon mixture,
                                            topped with syrup and served with a side of cream
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Health Breakfast - Vegetarian
                                            </h4>
                                            <span className="text-accent font-bold">R115</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            2 free-range eggs, sautéed mushrooms, sautéed spinach,
                                            grilled tomato, avo and cucumbers. Served with a slice of
                                            toasted ciabatta without butter
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Spinach & Feta Omelette
                                            </h4>
                                            <span className="text-accent font-bold">R115</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Made with 3 free-range eggs, filled with spinach and feta
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Crave Breakfast
                                            </h4>
                                            <span className="text-accent font-bold">R135</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            2 free range eggs, 2 sausages, 1 slice of spiced beef,
                                            sautéed mushrooms, beans and grilled tomato. Served with 2
                                            slices of toasted ciabatta
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Loaded Smashed Avo
                                            </h4>
                                            <span className="text-accent font-bold">R135</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            1 slice of smashed avo, topped off with 2 free-range eggs,
                                            2 sausages, red onion and sautéed mushrooms
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Breakfast Croissant
                                            </h4>
                                            <span className="text-accent font-bold">R135</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            French croissant lightly toasted, filled with 3 free-range
                                            eggs, scrambled. Side of sautéed mushrooms, fresh tomato,
                                            avo, sautéed spinach and cucumber slices
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Crave Breakfast Omelette
                                            </h4>
                                            <span className="text-accent font-bold">R145</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            The crave breakfast in omelette form, with 3 free-range
                                            eggs
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Mighty Crave Breakfast
                                            </h4>
                                            <span className="text-accent font-bold">R205</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            The crave breakfast with steak and chips added
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Burgers Section */}
                        <div ref={sectionRefs.burgers} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Burgers
                                </h2>
                                <button onClick={() => toggleSection('burgers')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.burgers ? 'Collapse Burgers section' : 'Expand Burgers section'} aria-expanded={expandedSections.burgers}>
                                    {expandedSections.burgers ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>

                            <div className={`grid md:grid-cols-2 gap-10 ${expandedSections.burgers ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Basic Chicken Burger
                                            </h4>
                                            <span className="text-accent font-bold">R100</span>
                                        </div>
                                        <p className="text-subtext text-sm">Red onion & lettuce</p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Basic Beef Burger 100g
                                            </h4>
                                            <span className="text-accent font-bold">R110</span>
                                        </div>
                                        <p className="text-subtext text-sm">Red onion & lettuce</p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Crave Chicken Burger
                                            </h4>
                                            <span className="text-accent font-bold">R140</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Red onion, lettuce, tomato, cucumber
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Tropical Island Burger
                                            </h4>
                                            <span className="text-accent font-bold">R165</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Chicken fillet or beef patty, pineapple ring, lettuce,
                                            tomato, 1000 cravings sauce
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Nachos Chicken Burger
                                            </h4>
                                            <span className="text-accent font-bold">R150</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Grilled fillet chicken, sweet chilli nachos chips and our
                                            famous crave chilli cheese sauce
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Crave Beef Burger (200g)
                                            </h4>
                                            <span className="text-accent font-bold">R150</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Red onion, lettuce, tomato, cucumber
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Nachos Beef Burger
                                            </h4>
                                            <span className="text-accent font-bold">R160</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            1x 200g beef patty, sweet chilli nachos chips and our
                                            famous crave chilli cheese sauce
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Chicken Chilli Cheese Burger
                                            </h4>
                                            <span className="text-accent font-bold">R165</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Red onion, lettuce, tomato, cucumber, crave chilli cheese
                                            sauce
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Double Chicken Burger
                                            </h4>
                                            <span className="text-accent font-bold">R175</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            2x chicken fillets, Red onion, lettuce, tomato, cucumber
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                C.H.E.E.F. Burger
                                            </h4>
                                            <span className="text-accent font-bold">R250</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            1x beef patty (200g), 1x fillet chicken, Avocado, lettuce,
                                            tomato, cucumber, red onion, crave house sauce
                                        </p>
                                    </div>
                                </div>
                                <div className="md:col-span-2 text-center text-sm text-primary italic mt-2">
                                    All burgers are flame grilled & served on our homemade Brioche
                                    roll with 150g chips or salad.
                                </div>
                            </div>
                        </div>
                        {/* Sandwiches Section */}
                        <div ref={sectionRefs.sandwiches} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Sandwiches
                                </h2>
                                <button onClick={() => toggleSection('sandwiches')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.sandwiches ? 'Collapse Sandwiches section' : 'Expand Sandwiches section'} aria-expanded={expandedSections.sandwiches}>
                                    {expandedSections.sandwiches ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>
                            <div className={`grid md:grid-cols-2 gap-10 ${expandedSections.sandwiches ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Cheese & Tomato Toasted Sandwich
                                            </h4>
                                            <span className="text-accent font-bold">R80</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Gouda cheese & roma tomatoes
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Cheesy Red Onion
                                            </h4>
                                            <span className="text-accent font-bold">R85</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Red onion, gouda cheese, garlic, oregano
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Chicken Mayo Toasted Sandwich
                                            </h4>
                                            <span className="text-accent font-bold">R110</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Shredded chicken fillet, in-house mayo, coriander
                                            (plain/spicy - crave sauce)
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Tuna Mayo Toasted Sandwich
                                            </h4>
                                            <span className="text-accent font-bold">R110</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Tuna, in-house mayo, coriander (plain/spicy - crave sauce)
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Triple Decker
                                            </h4>
                                            <span className="text-accent font-bold">R115</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Gouda cheese, mozzarella, feta
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Spiced Beef Toasted Sandwich
                                            </h4>
                                            <span className="text-accent font-bold">R125</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Spiced beef, tomato, feta, gouda cheese
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Crave Chicken & Slaw
                                            </h4>
                                            <span className="text-accent font-bold">R125</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Shredded chicken, home-made slaw, bbq sauce
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Grilled Chicken Toasted Sandwich
                                            </h4>
                                            <span className="text-accent font-bold">R135</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Chicken fillet, red onion, lettuce, roma tomato, cucumber
                                            (bbq/spicy - crave sauce)
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Fillet Steak Toasted Sandwich
                                            </h4>
                                            <span className="text-accent font-bold">R185</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            165g prime cut fillet, red onion, lettuce, roma tomato,
                                            cucumber (bbq/spicy - crave sauce)
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Loaded Steak Toasted Sandwich
                                            </h4>
                                            <span className="text-accent font-bold">R245</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            165g prime cut fillet, 2x free range eggs, avocado, red
                                            onion, lettuce, roma tomato, cucumber (bbq/spicy - crave
                                            sauce)
                                        </p>
                                    </div>
                                </div>
                                <div className="md:col-span-2 text-center text-sm text-primary italic mt-2">
                                    All sandwiches are served on our homemade ciabatta bread with
                                    150g chips or salad
                                </div>
                            </div>
                        </div>
                        {/* Wraps & Pitas Section */}
                        <div ref={sectionRefs.wraps} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Wraps & Pitas
                                </h2>
                                <button onClick={() => toggleSection('wraps')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.wraps ? 'Collapse Wraps section' : 'Expand Wraps section'} aria-expanded={expandedSections.wraps}>
                                    {expandedSections.wraps ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>
                            <div className={`grid md:grid-cols-2 gap-10 ${expandedSections.wraps ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-medium text-primary uppercase tracking-wider mb-6 text-center relative">
                                         <span className="relative inline-block">
                                             Wraps
                                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F5F0E5]"></div>
                                    </span>
                                    </h3>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                BBQ Chicken Wrap
                                            </h4>
                                            <span className="text-accent font-bold">R120</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Fillet chicken strips, bbq sauce, tomato, cucumber,
                                            carrot, spinach
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Grilled Chicken Wrap
                                            </h4>
                                            <span className="text-accent font-bold">R120</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Fillet chicken strips, tomato, cucumber, red onion,
                                            spinach (plain/spicy)
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Tropical Chicken & Slaw Wrap
                                            </h4>
                                            <span className="text-accent font-bold">R125</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Fillet chicken strips, pineapple, carrot, slaw
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Chicken & Feta Wrap
                                            </h4>
                                            <span className="text-accent font-bold">R125</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Fillet chicken strips, tomato, cucumber, feta, spinach
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Fillet Steak & Feta Wrap
                                            </h4>
                                            <span className="text-accent font-bold">R165</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            165g fillet steak, tomato, feta, cucumber
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-medium text-primary uppercase tracking-wider mb-6 text-center relative">
                                     <span className="relative inline-block">
                                    Pitas
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F5F0E5]"></div>
                                    </span>
                                    </h3>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Falafel Pita
                                            </h4>
                                            <span className="text-accent font-bold">R125</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Falafel, cucumber, tomato, onion
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Chicken and Slaw Pita
                                            </h4>
                                            <span className="text-accent font-bold">R125</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Chicken, slaw, crave mayo, cucumber, tomato
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Savoury Mince Pita
                                            </h4>
                                            <span className="text-accent font-bold">R135</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Savoury mince, peppers, feta, relish
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Steak & Feta Pita
                                            </h4>
                                            <span className="text-accent font-bold">R165</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            165g prime cut fillet, red onion, lettuce, roma tomato,
                                            cucumber, feta
                                        </p>
                                    </div>
                                </div>
                                <div className="md:col-span-2 text-center text-sm text-primary italic mt-2">
                                    Served with 150g chips or salad. Pitas are freshly baked
                                    in-house and served with tahini
                                </div>
                            </div>
                        </div>
                        {/* Coffee Section */}
                        <div ref={sectionRefs.coffee} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Coffee
                                </h2>
                                <button onClick={() => toggleSection('coffee')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.coffee ? 'Collapse Coffee section' : 'Expand Coffee section'} aria-expanded={expandedSections.coffee}>
                                    {expandedSections.coffee ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>
                            {/* Coffee Cup Illustration */}
                            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                                <img src="https://cdn-icons-png.flaticon.com/512/2935/2935307.png" alt="" className="w-40 h-40 object-contain" loading="lazy" aria-hidden="true" />
                            </div>
                            <div className={`grid md:grid-cols-2 gap-10 ${expandedSections.coffee ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Espresso
                                            </h4>
                                            <span className="text-accent font-bold">R30</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Single shot of black gold
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Doppio
                                            </h4>
                                            <span className="text-accent font-bold">R45</span>
                                        </div>
                                        <p className="text-subtext text-sm">Double shot espresso</p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Americano
                                            </h4>
                                            <span className="text-accent font-bold">R35</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Single shot espresso, 3 parts hot water (black)
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Cappuccino
                                            </h4>
                                            <span className="text-accent font-bold">R40</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Single shot espresso, steamed milk, foam
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Vienna
                                            </h4>
                                            <span className="text-accent font-bold">R50</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Single shot espresso, condensed milk
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Flat White
                                            </h4>
                                            <span className="text-accent font-bold">R50</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Double shot espresso, steamed milk, small foam layer
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Latte
                                            </h4>
                                            <span className="text-accent font-bold">R50</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Single shot espresso, steamed milk, small foam layer
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Chai Latte
                                            </h4>
                                            <span className="text-accent font-bold">R50</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Spiced black tea, steamed milk, milk foam
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Mocha / White Mocha
                                            </h4>
                                            <span className="text-accent font-bold">R60</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Espresso, nomu hot chocolate, whipped cream
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Vietnamese Iced Coffee
                                            </h4>
                                            <span className="text-accent font-bold">R65</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Double shot espresso, condensed milk, milk, ice
                                        </p>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Flavour Infusions for Lattes - R15
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <p className="text-subtext text-sm">Butterscotch</p>
                                        <p className="text-subtext text-sm">Caramel</p>
                                        <p className="text-subtext text-sm">Creme Brulee</p>
                                        <p className="text-subtext text-sm">Hazelnut</p>
                                        <p className="text-subtext text-sm">Tiramisu</p>
                                        <p className="text-subtext text-sm">Toasted Marshmallow</p>
                                        <p className="text-subtext text-sm">Toffee Nut</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tea Section */}
                        <div ref={sectionRefs.tea} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Tea
                                </h2>
                                <button onClick={() => toggleSection('tea')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.tea ? 'Collapse Tea section' : 'Expand Tea section'} aria-expanded={expandedSections.tea}>
                                    {expandedSections.tea ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>
                            <div className={`grid md:grid-cols-3 gap-10 ${expandedSections.tea ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Dilmah Speciality Teas - R45
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <p className="text-subtext text-sm">Peach</p>
                                        <p className="text-subtext text-sm">Lemon</p>
                                        <p className="text-subtext text-sm">Ceylon</p>
                                        <p className="text-subtext text-sm">Spice Chai</p>
                                        <p className="text-subtext text-sm">Strawberry</p>
                                        <p className="text-subtext text-sm">Lime & Orange</p>
                                        <p className="text-subtext text-sm">Ginger & Honey</p>
                                        <p className="text-subtext text-sm">Italian Almond</p>
                                        <p className="text-subtext text-sm">Berry Sensation</p>
                                        <p className="text-subtext text-sm">English Breakfast</p>
                                        <p className="text-subtext text-sm">Berry & Pomegranate</p>
                                        <p className="text-subtext text-sm">
                                            Rose with French Vanilla
                                        </p>
                                        <p className="text-subtext text-sm">
                                            Arabian Mint with Honey
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Dilmah Rooibos Tea - R40
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <p className="text-subtext text-sm">Natural Rooibos</p>
                                        <p className="text-subtext text-sm">
                                            Cinnamon, Turmeric, Ginger, Nutmeg
                                        </p>
                                        <p className="text-subtext text-sm">
                                            Caramel, Ginger, Coconut
                                        </p>
                                        <p className="text-subtext text-sm">
                                            Cardamom, Ginger, Orange
                                        </p>
                                        <p className="text-subtext text-sm">
                                            Holy Basil, Ginger, Lemon, Lemongrass
                                        </p>
                                        <p className="text-subtext text-sm">Raspberry & Coconut</p>
                                    </div>
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6 mt-8">
                                        Green Rooibos Tea - R40
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <p className="text-subtext text-sm">
                                            Lemongrass & Spearmint
                                        </p>
                                        <p className="text-subtext text-sm">Ginger & Peppermint</p>
                                        <p className="text-subtext text-sm">
                                            Cardamom, Ginger, Orange
                                        </p>
                                        <p className="text-subtext text-sm">
                                            Holy Basil, Ginger, Lemon, Lemongrass
                                        </p>
                                        <p className="text-subtext text-sm">Coconut & Mango</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Organic Teas - R50
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <p className="text-subtext text-sm">Pure Green</p>
                                        <p className="text-subtext text-sm">English Breakfast</p>
                                        <p className="text-subtext text-sm">Berry Explosion</p>
                                        <p className="text-subtext text-sm">Green Tea with Mint</p>
                                        <p className="text-subtext text-sm">
                                            Green Tea with Ginger
                                        </p>
                                        <p className="text-subtext text-sm">
                                            Green Tea with Cinnamon & Turmeric
                                        </p>
                                    </div>
                                    {/* Dilmah Logo */}
                                    <div className="mt-12 flex justify-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Dilmah_logo.svg/1200px-Dilmah_logo.svg.png" alt="Dilmah Tea" className="w-24 h-auto" loading="lazy" />
                                    </div>
                                </div>
                                <div className="md:col-span-3 text-center text-sm text-primary italic mt-4">
                                    All tea is served with 2 tea bags
                                </div>
                            </div>
                        </div>
                        {/* Beverages Section */}
                        <div ref={sectionRefs.beverages} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Beverages
                                </h2>
                                <button onClick={() => toggleSection('beverages')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.beverages ? 'Collapse Beverages section' : 'Expand Beverages section'} aria-expanded={expandedSections.beverages}>
                                    {expandedSections.beverages ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>
                            {/* Milkshake Illustration */}
                            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                                <img src="https://cdn-icons-png.flaticon.com/512/3361/3361447.png" alt="" className="w-40 h-40 object-contain" loading="lazy" aria-hidden="true" />
                            </div>
                            <div className={`grid md:grid-cols-3 gap-10 ${expandedSections.beverages ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-8">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Smoothies - R75
                                    </h3>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Very Berry
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Mixed berries, chia seeds, almond milk, honey
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Mango-Go-Go
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Mango, chia seeds, almond milk, honey
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Sunrise Surprise
                                            </h4>
                                            <span className="text-accent font-bold">R80</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Carrot, banana, mango, pineapple, almond milk, chia seeds
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Orange Zest
                                            </h4>
                                            <span className="text-accent font-bold">R80</span>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Orange, pineapple, carrot, ginger, almond milk, chia seeds
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Frappes - R75
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <p className="text-subtext text-sm">Butterscotch</p>
                                        <p className="text-subtext text-sm">Creme Brulee</p>
                                        <p className="text-subtext text-sm">Caramel</p>
                                        <p className="text-subtext text-sm">Hazelnut</p>
                                        <p className="text-subtext text-sm">Chai Latte</p>
                                        <p className="text-subtext text-sm">Tiramisu</p>
                                        <p className="text-subtext text-sm">Chocolate</p>
                                        <p className="text-subtext text-sm">Toasted Marshmallow</p>
                                        <p className="text-subtext text-sm">Coconut Mocha</p>
                                        <p className="text-subtext text-sm">Toffee Nut</p>
                                        <p className="text-subtext text-sm">Coffee</p>
                                    </div>
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6 mt-8">
                                        Milkshakes 350ml - R80
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <p className="text-subtext text-sm">Lime</p>
                                        <p className="text-subtext text-sm">Pineapple Coconut</p>
                                        <p className="text-subtext text-sm">Banana</p>
                                        <p className="text-subtext text-sm">Mango</p>
                                        <p className="text-subtext text-sm">Bubblegum</p>
                                        <p className="text-subtext text-sm">Lemon Lime & Mint</p>
                                        <p className="text-subtext text-sm">Chocolate</p>
                                        <p className="text-subtext text-sm">
                                            Strawberry Cheesecake
                                        </p>
                                        <p className="text-subtext text-sm">Strawberry</p>
                                        <p className="text-subtext text-sm">Oreo</p>
                                        <p className="text-subtext text-sm">Chai</p>
                                        <p className="text-subtext text-sm">Bar One</p>
                                        <p className="text-subtext text-sm">Coffee</p>
                                        <p className="text-subtext text-sm">Milo</p>
                                        <p className="text-subtext text-sm"></p>
                                        <p className="text-subtext text-sm">Mocha</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Soft Drinks
                                    </h3>
                                    <div className="mb-4">
                                        <h4 className="text-lg font-medium text-primary mb-2">
                                            Bashews - R20
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="text-subtext text-sm">Cola</p>
                                            <p className="text-subtext text-sm">Pineapple</p>
                                            <p className="text-subtext text-sm">Raspberry</p>
                                            <p className="text-subtext text-sm">Cocopine</p>
                                            <p className="text-subtext text-sm">Iron Brew</p>
                                            <p className="text-subtext text-sm">Cream Soda</p>
                                            <p className="text-subtext text-sm">Passionfruit</p>
                                            <p className="text-subtext text-sm">Lemonade</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-lg font-medium text-primary mb-2">
                                            Sanpellegrino - R40
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="text-subtext text-sm">Pomegranate</p>
                                            <p className="text-subtext text-sm">Lemon</p>
                                            <p className="text-subtext text-sm">Orange</p>
                                            <p className="text-subtext text-sm">Blood Orange</p>
                                            <p className="text-subtext text-sm">Grapefruit</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-lg font-medium text-primary mb-2">
                                            Fruit Juice - R40
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="text-subtext text-sm">Ginger Beer</p>
                                            <p className="text-subtext text-sm">Mango</p>
                                            <p className="text-subtext text-sm">Orange</p>
                                            <p className="text-subtext text-sm">Mango & Orange</p>
                                            <p className="text-subtext text-sm">Strawberry</p>
                                            <p className="text-subtext text-sm">Pineapple</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-lg font-medium text-primary mb-2">
                                            Mocktails - R70
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="text-subtext text-sm">Pina Colada</p>
                                            <p className="text-subtext text-sm">Mojito</p>
                                            <p className="text-subtext text-sm">
                                                Strawberry Daiquiri
                                            </p>
                                            <p className="text-subtext text-sm">Mango Daiquiri</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Signature Drinks Section */}
                        <div ref={sectionRefs.signature} className="mb-16 !scroll-mt-[140px] relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-['Rockwell',serif] font-bold text-primary uppercase tracking-wider">
                                    Signature Drinks
                                </h2>
                                <button onClick={() => toggleSection('signature')} className="bg-primary text-light rounded-full p-1 hover:bg-accent transition-colors" aria-label={expandedSections.signature ? 'Collapse Signature Drinks section' : 'Expand Signature Drinks section'} aria-expanded={expandedSections.signature}>
                                    {expandedSections.signature ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-[#F5F0E5] mb-8"></div>
                            <div className={`grid md:grid-cols-2 gap-10 ${expandedSections.signature ? 'block' : 'hidden md:grid'}`}>
                                <div className="space-y-8">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        Blizzards - R65
                                    </h3>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Lemon Crush
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Lemon S.Pellegrino, lime, ice
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Tropic Thunder
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Mango, mango juice, mango puree, passionfruit, kiwi, ice
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Summer Crush
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Passion fruit, lime, lemonade, lemon, ice, mango & orange
                                            juice
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Keep The Doctor Away
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Apple, apple fruugo, apple puree, ginger, honey
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Tropical Escape
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Pineapple, pineapple juice, coconut milk, lime, ice
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <h3 className="text-xl font-medium text-primary uppercase tracking-wider mb-6">
                                        On The Rocks - R60
                                    </h3>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                The Hulk
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Lemonade, lime, mint, ice
                                        </p>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-lg font-medium text-primary uppercase tracking-wider">
                                                Pink Lady
                                            </h4>
                                        </div>
                                        <p className="text-subtext text-sm">
                                            Lemonade, strawberry puree, kiwi, ice
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Download Menu Button */}
                    <div className="text-center mb-16">
                        <a href="/Cafe-MENU.pdf" download="Cafe-Crave-Menu.pdf" className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors hover:shadow-glow">
                            <DownloadIcon size={20} className="mr-2" />
                            Download Full Menu (PDF)
                        </a>
                    </div>
                </div>
            </div>
            {/* Call-to-Action */}
            <section className="bg-primary py-12 md:py-16">
                <div className="container mx-auto px-6 md:px-10 lg:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-['Rockwell',serif] font-bold text-light mb-4">
                            Order, Visit, Enjoy
                        </h2>
                        <p className="text-light text-lg mb-8">
                            Stop by for breakfast, lunch, or coffee with friends.
                        </p>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-light hover:bg-opacity-90 text-accent px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors">
                            <MapPinIcon size={20} className="mr-2" />
                            Get Directions
                        </a>
                    </div>
                </div>
            </section>
            {/* Back to Top Button */}
            <button onClick={scrollToTop} className={`fixed right-6 bottom-6 bg-accent hover:bg-opacity-90 text-light p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`} aria-label="Back to top">
                <ArrowUpIcon size={24} />
            </button>
            <Footer />
        </div>
    );
};
