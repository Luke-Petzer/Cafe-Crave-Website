import { CoffeeIcon, MusicIcon, UsersIcon } from 'lucide-react';

// Import OurVibe images
import coffeeImg from '../assets/cuppacino.webp';
import vinylImg from '../assets/vinyl-wall.webp';
import boardGamesImg from '../assets/board-games.webp';

export const OurVibe = () => {
  return <section id="our-vibe" className="section-animate py-20 md:py-28" style={{ backgroundColor: 'transparent' }}>
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* SCRAPBOOK HEADER - Torn paper style */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="torn-paper p-8 md:p-10">
            <h2 className="vintage-headline text-4xl md:text-5xl mb-4">
              Our Vibe
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ borderTop: '3px double #1A1512' }}></div>
            <p className="typewriter-text text-base md:text-lg">
              Where coffee meets culture in a space designed for connection and
              relaxation.
            </p>
          </div>
        </div>

        {/* SCRAPBOOK GRID - Polaroids resting on dark wood */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto">
          {/* Perfectly Brewed - Polaroid Style */}
          <div className="flex flex-col items-center" tabIndex={0}>
            <div className="polaroid w-full">
              <div className="overflow-hidden aspect-square bg-gray-100">
                <img
                  src={coffeeImg}
                  alt="Artisan latte art at Crave Café"
                  className="w-full h-full object-cover vintage-photo"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-ink-black font-handwriting text-sm" style={{ fontFamily: 'Courier New, monospace', fontStyle: 'italic' }}>
                  Perfectly Brewed ☕
                </p>
              </div>
            </div>
            {/* Text on torn paper below photo */}
            <div className="torn-paper p-5 mt-6 w-full">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-ink-black w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <CoffeeIcon size={20} className="text-aged-paper" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-serif font-bold text-ink-black">
                  Perfectly Brewed
                </h3>
              </div>
              <p className="typewriter-text text-sm text-center">
                We source and brew exceptional coffee beans with care and
                precision. From pour-overs to espresso, every cup tells a story
                of quality and craftsmanship.
              </p>
            </div>
          </div>

          {/* Always Spinning - Polaroid Style */}
          <div className="flex flex-col items-center" tabIndex={0}>
            <div className="polaroid w-full">
              <div className="overflow-hidden aspect-square bg-gray-100">
                <img
                  src={vinylImg}
                  alt="Vinyl records spinning on a turntable at Crave Cafe"
                  className="w-full h-full object-cover vintage-photo"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-ink-black font-handwriting text-sm" style={{ fontFamily: 'Courier New, monospace', fontStyle: 'italic' }}>
                  Always Spinning 🎵
                </p>
              </div>
            </div>
            {/* Text on torn paper below photo */}
            <div className="torn-paper p-5 mt-6 w-full">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-ink-black w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <MusicIcon size={20} className="text-aged-paper" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-serif font-bold text-ink-black">
                  Always Spinning
                </h3>
              </div>
              <p className="typewriter-text text-sm text-center">
                Our vinyl collection spans decades and genres, creating the
                perfect soundtrack for your visit. Feel free to request your
                favorites or discover something new.
              </p>
            </div>
          </div>

          {/* Stay Awhile - Polaroid Style */}
          <div className="flex flex-col items-center" tabIndex={0}>
            <div className="polaroid w-full">
              <div className="overflow-hidden aspect-square bg-gray-100">
                <img
                  src={boardGamesImg}
                  alt="Friends playing board games at Crave Café in Claremont"
                  className="w-full h-full object-cover vintage-photo"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-ink-black font-handwriting text-sm" style={{ fontFamily: 'Courier New, monospace', fontStyle: 'italic' }}>
                  Stay Awhile 🎲
                </p>
              </div>
            </div>
            {/* Text on torn paper below photo */}
            <div className="torn-paper p-5 mt-6 w-full">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-ink-black w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <UsersIcon size={20} className="text-aged-paper" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-serif font-bold text-ink-black">
                  Stay Awhile
                </h3>
              </div>
              <p className="typewriter-text text-sm text-center">
                From board games to community events, we've designed our space
                to be more than just a café. It's a place to connect, play, and
                create memories.
              </p>
            </div>
            <div className="text-xs text-aged-paper opacity-70 mt-2 text-center">
              Photo: Nathan Dumlao via Unsplash
            </div>
          </div>
        </div>
      </div>
    </section>;
};

