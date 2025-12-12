import React from 'react';
import Masthead from '../components/Masthead';
import HeroSection from '../components/HeroSection';
import { TornEdge, Divider } from '../components/NewspaperComponents';
import { EventPreview } from '../components/EventPreview';
import { VinylSection } from '../components/VinylSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

/**
 * NewspaperHomePage - Example implementation of the Newspaper Design System
 * This demonstrates the "Front Page" layout with the new aesthetic
 */
const NewspaperHomePage: React.FC = () => {
  return (
    <div className="bg-grain min-h-screen">
      {/* The Masthead (Header) */}
      <Masthead />

      {/* Hero Section - "The Front Page" */}
      <HeroSection />

      {/* Torn Edge Divider */}
      <TornEdge />

      {/* Vinyl/Music Section - "On The Air" */}
      <VinylSection />

      {/* Torn Edge Divider */}
      <TornEdge />

      {/* Events Section with Newspaper Styling */}
      <section className="bg-paper py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-accent text-rust tracking-widest text-sm uppercase">
              Notice Board
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-ink mt-2 mb-4">
              Community Events
            </h2>
            <Divider variant="accent" className="mb-6" />
            <p className="font-body text-lg text-ink/70 max-w-2xl mx-auto">
              Join us for live music, trivia nights, and special gatherings
            </p>
          </div>

          <EventPreview showHeader={false} showViewAllButton={true} />
        </div>
      </section>

      {/* Torn Edge Divider */}
      <TornEdge />

      {/* Testimonials Section - "Letters to the Editor" */}
      <TestimonialsSection />

      {/* Footer */}
      <footer className="bg-espresso text-paper py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="font-headline text-3xl mb-4">CAFÉ CRAVE</h3>
          <p className="font-accent tracking-widest text-sm text-paper/60">
            EST. 2020 • CAPE TOWN
          </p>
          <div className="mt-6 font-body text-sm text-paper/70">
            <p>Daily: 7am - 4pm</p>
            <p className="mt-2">Coffee • Vinyl • Community</p>
          </div>
          <div className="mt-8 flex justify-center gap-6">
            <a href="/" className="text-paper/60 hover:text-rust transition-colors font-accent text-sm tracking-wider">HOME</a>
            <a href="/menu" className="text-paper/60 hover:text-rust transition-colors font-accent text-sm tracking-wider">MENU</a>
            <a href="/music" className="text-paper/60 hover:text-rust transition-colors font-accent text-sm tracking-wider">MUSIC</a>
            <a href="/events" className="text-paper/60 hover:text-rust transition-colors font-accent text-sm tracking-wider">EVENTS</a>
            <a href="/about" className="text-paper/60 hover:text-rust transition-colors font-accent text-sm tracking-wider">ABOUT</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewspaperHomePage;

