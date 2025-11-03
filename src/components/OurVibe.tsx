import { CoffeeIcon, MusicIcon, UsersIcon } from 'lucide-react';
export const OurVibe = () => {
  return <section id="our-vibe" className="section-light py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-4">
            Our Vibe
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="opacity-90 max-w-2xl mx-auto text-lg">
            Where coffee meets culture in a space designed for connection and
            relaxation.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {/* Perfectly Brewed */}
          <div className="bg-lightBg bg-opacity-95 rounded-lg shadow-md overflow-hidden transform transition-all duration-150 hover:-translate-y-2 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent focus-within:ring-opacity-50 border border-lightText border-opacity-10" tabIndex={0}>
            <div className="h-48 overflow-hidden">
              <img src="src/assets/cuppacino.webp" alt="Close-up of espresso machine with coffee being brewed into a ceramic cup on wooden countertop" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-darkBg w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <CoffeeIcon size={24} className="text-darkText" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-lightText">
                  Perfectly Brewed
                </h3>
              </div>
              <p className="text-lightText line-clamp-3">
                We source and brew exceptional coffee beans with care and
                precision. From pour-overs to espresso, every cup tells a story
                of quality and craftsmanship.
              </p>
            </div>
          </div>
          {/* Always Spinning */}
          <div className="bg-lightBg bg-opacity-95 rounded-lg shadow-md overflow-hidden transform transition-all duration-150 hover:-translate-y-2 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent focus-within:ring-opacity-50 border border-lightText border-opacity-10" tabIndex={0}>
            <div className="h-48 overflow-hidden">
              <img src="src/assets/vinyl-wall.webp" alt="Close-up of vinyl records on wooden surface with album sleeve visible" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-darkBg w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MusicIcon size={24} className="text-darkText" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-lightText">
                  Always Spinning
                </h3>
              </div>
              <p className="text-lightText  line-clamp-3">
                Our vinyl collection spans decades and genres, creating the
                perfect soundtrack for your visit. Feel free to request your
                favorites or discover something new.
              </p>
            </div>
          </div>
          {/* Stay Awhile */}
          <div className="bg-lightBg bg-opacity-95 rounded-lg shadow-md overflow-hidden transform transition-all duration-150 hover:-translate-y-2 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent focus-within:ring-opacity-50 border border-lightText border-opacity-10" tabIndex={0}>
            <div className="h-48 overflow-hidden">
              <img src="src/assets/board-games.webp" alt="Cozy café interior with wooden tables, board games, and warm ambient lighting" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-darkBg w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <UsersIcon size={24} className="text-darkText" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-lightText">
                  Stay Awhile
                </h3>
              </div>
              <p className="text-lightText line-clamp-3">
                From board games to community events, we've designed our space
                to be more than just a café. It's a place to connect, play, and
                create memories.
              </p>
            </div>
            <div className="px-6 pb-6 text-xs text-lightText opacity-70">
              Photo: Nathan Dumlao via Unsplash
            </div>
          </div>
        </div>
      </div>
    </section>;
};