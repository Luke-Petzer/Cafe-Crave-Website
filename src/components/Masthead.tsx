import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Masthead = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-paper border-b-4 border-double border-ink/10">
      {/* Top Bar - The "Dateline" */}
      <div className="w-full border-b border-washed-brown py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs md:text-sm font-accent tracking-widest text-ink/60 uppercase">
          <span>Est. 2020</span>
          <span className="hidden md:inline">Daily: 7am - 4pm</span>
          <span>Cape Town</span>
        </div>
      </div>

      {/* Main Masthead */}
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex justify-between items-center relative">

        {/* Left: Hamburger (Mobile) or "Menu" Text */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center gap-2 font-accent uppercase tracking-widest text-sm hover:text-rust transition-colors"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className="block w-full h-0.5 bg-ink group-hover:bg-rust transition-colors"></span>
            <span className="block w-2/3 h-0.5 bg-ink group-hover:bg-rust transition-colors"></span>
            <span className="block w-full h-0.5 bg-ink group-hover:bg-rust transition-colors"></span>
          </div>
          <span className="hidden md:block">Index</span>
        </button>

        {/* Center: The Massive Brand Name */}
        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-ink">
            CAFÉ CRAVE
          </h1>
          <p className="font-accent text-xs tracking-[0.3em] mt-1 text-rust">
            COFFEE & VINYL
          </p>
        </div>

        {/* Right: CTA */}
        <a href="#book" className="hidden md:block border border-ink px-6 py-2 font-accent text-sm tracking-widest hover:bg-ink hover:text-paper transition-colors">
          BOOK TABLE
        </a>
      </div>

      {/* Navigation Drawer (The "Index" Page) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-paper border-t border-dashed border-ink overflow-hidden"
          >
            <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="font-accent text-rust tracking-widest mb-4">SECTIONS</h3>
                <ul className="space-y-2 text-2xl font-headline">
                  <li><a href="/" className="hover:italic hover:text-rust transition-all">Home</a></li>
                  <li><a href="/menu" className="hover:italic hover:text-rust transition-all">Morning Edition (Menu)</a></li>
                  <li><a href="/music" className="hover:italic hover:text-rust transition-all">On The Air (Music)</a></li>
                  <li><a href="/events" className="hover:italic hover:text-rust transition-all">Notice Board (Events)</a></li>
                  <li><a href="/about" className="hover:italic hover:text-rust transition-all">Classifieds (About)</a></li>
                  <li><a href="/contact" className="hover:italic hover:text-rust transition-all">Correspondence Dept. (Contact)</a></li>
                </ul>
              </div>
              {/* Add more nav columns here later */}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Masthead;

