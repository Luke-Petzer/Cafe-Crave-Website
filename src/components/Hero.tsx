import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import cafeImage from '../assets/cafe-crave-hero.webp';

export const Hero = () => {
  return (
    <section
      className="section-dark relative w-full flex items-center overflow-hidden"
      style={{ minHeight: 'calc(100vh - 80px)', maxHeight: '900px' }}
      aria-label="Hero section"
    >
      {/* Background Image & Overlay Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={cafeImage}
          alt="The retro-inspired interior of Café Crave"
          className="w-full h-full object-cover object-[0%_0%] md:object-center"
          width="1600"
          height="1000"
        />
        {/* Dark gradient overlay for better text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16 w-full">
        {/* Responsive Layout: centered on mobile, right-aligned on desktop */}
        <div className="flex justify-center md:justify-end">
          {/* Text Wrapper: centered text on mobile, left-aligned on desktop */}
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-[#F3ECD5] drop-shadow-md">
              Café Crave
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-white/90">
              Great Coffee. Classic Vinyl. Your Local Hangout.
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 font-medium">
              A retro-inspired cafe where memories are made over exceptional
              coffee and board games.
            </p>

            <Link
              to="/menu"
              className="bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md inline-flex items-center justify-center font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 will-change-transform"
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