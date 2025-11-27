import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import cafeImage from '../assets/cafe-crave-hero.webp';

export const Hero = () => {
  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: 'calc(100vh - 80px)', maxHeight: '900px' }}
      aria-label="Hero section"
    >
      {/* Background Image with Vintage Filter */}
      <div className="absolute inset-0 z-0">
        <img
          src={cafeImage}
          alt="The retro-inspired interior of Crave Café"
          className="w-full h-full object-cover object-[0%_0%] md:object-center vintage-photo"
          width="1600"
          height="1000"
        />
        {/* VINTAGE ECLECTIC: Grainy overlay to blend with dark wood background */}
        <div className="hero-grainy-overlay"></div>
      </div>

      {/* Content Container - Newspaper-style text on aged paper */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16 w-full">
        {/* Responsive Layout: centered on mobile, right-aligned on desktop */}
        <div className="flex justify-center md:justify-end">
          {/* Text Wrapper: Aged paper container sitting on dark wood */}
          <div className="max-w-2xl text-center md:text-left paper-container p-8 md:p-10 rounded-sm">
            <h1 className="vintage-headline text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Crave Café
            </h1>
            <div className="w-32 h-1 bg-ink-black mx-auto md:mx-0 mb-6" style={{ borderTop: '3px double #1A1512' }}></div>
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-ink-black font-semibold">
              Great Coffee. Classic Vinyl. Your Local Hangout.
            </h2>
            <p className="typewriter-text text-base md:text-lg mb-8">
              A retro-inspired cafe where memories are made over exceptional
              coffee and board games.
            </p>

            <Link
              to="/menu"
              className="bg-sepia-tone hover:bg-opacity-90 text-vintage-cream px-8 py-4 rounded-sm inline-flex items-center justify-center font-bold transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-sepia-tone focus:ring-opacity-50 will-change-transform uppercase tracking-wide border-2 border-ink-black"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              View Our Menu
              <ArrowRightIcon size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};