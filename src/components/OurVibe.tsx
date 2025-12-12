import { CoffeeIcon, MusicIcon, UsersIcon } from 'lucide-react';

// Import OurVibe images
import coffeeImg from '../assets/cuppacino.webp';
import vinylImg from '../assets/vinyl-wall.webp';
import boardGamesImg from '../assets/board-games.webp';

export const OurVibe = () => {
  return (
    <section id="our-vibe" className="section-animate py-20 md:py-28 bg-paper">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* Photo Feature Header */}
        <div className="text-center mb-16">
          <span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-4">
            Photo Feature
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-ink mb-4">
            Scenes from the Café
          </h2>
          <div className="w-24 h-1 bg-rust mx-auto mb-6"></div>
          <p className="font-body text-lg text-ink/70 max-w-2xl mx-auto italic">
            A glimpse into the daily life at Crave — where community meets culture
          </p>
        </div>

        {/* Photo Collage with Captions */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Image 1 - Morning Rituals */}
          <div className="relative group">
            <div className="overflow-hidden border-2 border-ink/20 shadow-newspaper hover:shadow-polaroid transition-all duration-300">
              <img
                src={coffeeImg}
                alt="Artisan latte art at Crave Café"
                className="w-full h-64 object-cover filter-newspaper group-hover:filter-none transition-all duration-500"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            <p className="font-body italic text-sm text-ink/70 mt-3 text-center">
              Fig. 1 — Morning Rituals
            </p>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-rust/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <CoffeeIcon size={16} className="text-rust" />
                </div>
                <h3 className="font-headline text-lg font-bold text-ink">
                  Coffee Craftsmanship
                </h3>
              </div>
              <p className="font-body text-sm text-ink/70">
                Exceptional coffee beans brewed with care and precision
              </p>
            </div>
          </div>

          {/* Image 2 - The Soundtrack (Larger, centered) */}
          <div className="relative group md:scale-110 md:-translate-y-4">
            <div className="overflow-hidden border-2 border-ink/20 shadow-newspaper hover:shadow-polaroid transition-all duration-300">
              <img
                src={vinylImg}
                alt="Vinyl records spinning on a turntable"
                className="w-full h-64 object-cover filter-newspaper group-hover:filter-none transition-all duration-500"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            <p className="font-body italic text-sm text-ink/70 mt-3 text-center">
              Fig. 2 — The Soundtrack
            </p>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-rust/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <MusicIcon size={16} className="text-rust" />
                </div>
                <h3 className="font-headline text-lg font-bold text-ink">
                  Always Spinning
                </h3>
              </div>
              <p className="font-body text-sm text-ink/70">
                Vinyl collection spanning decades and genres
              </p>
            </div>
          </div>

          {/* Image 3 - The Sunday Social */}
          <div className="relative group">
            <div className="overflow-hidden border-2 border-ink/20 shadow-newspaper hover:shadow-polaroid transition-all duration-300">
              <img
                src={boardGamesImg}
                alt="Friends playing board games at Crave Café"
                className="w-full h-64 object-cover filter-newspaper group-hover:filter-none transition-all duration-500"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            <p className="font-body italic text-sm text-ink/70 mt-3 text-center">
              Fig. 3 — The Sunday Social
            </p>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-rust/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <UsersIcon size={16} className="text-rust" />
                </div>
                <h3 className="font-headline text-lg font-bold text-ink">
                  Stay Awhile
                </h3>
              </div>
              <p className="font-body text-sm text-ink/70">
                A space to connect, play, and create memories
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVibe;

