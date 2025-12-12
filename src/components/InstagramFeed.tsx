import React from 'react';
import insta1 from '../assets/insta-1.webp';
import insta2 from '../assets/insta-2.webp';
import insta3 from '../assets/insta-3.webp';
import insta4 from '../assets/insta-4.webp';
import insta5 from '../assets/insta-5.webp';

const instagramPosts = [
  { id: 1, image: insta1, alt: 'Coffee art at Café Crave' },
  { id: 2, image: insta2, alt: 'Cafe interior vibes' },
  { id: 3, image: insta3, alt: 'Food plating perfection' },
  { id: 4, image: insta4, alt: 'Customer enjoying coffee' },
  { id: 5, image: insta5, alt: 'Vinyl collection showcase' },
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* Society Pages Header */}
        <div className="text-center mb-12">
          <span className="inline-block border-b-2 border-rust pb-1 font-accent text-rust tracking-widest text-sm uppercase mb-4">
            The Society Pages
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-ink mb-4">
            Caught on Camera
          </h2>
          <div className="w-24 h-1 bg-rust mx-auto mb-6"></div>
          <p className="font-body text-lg text-ink/70 max-w-2xl mx-auto">
            Moments from our daily chronicles
          </p>
        </div>

        {/* Film Strip / Collage Layout - Horizontal scroll on mobile */}
        <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex md:grid md:grid-cols-5 gap-4 px-4 min-w-max md:min-w-0 md:px-0 max-w-6xl md:mx-auto">
            {instagramPosts.map((post, index) => (
              <div
                key={post.id}
                className="w-[280px] md:w-auto flex-shrink-0 md:flex-shrink relative bg-black p-2
                           shadow-newspaper hover:shadow-polaroid transition-all duration-300
                           transform hover:-translate-y-2"
                style={{
                  transform: `rotate(${(index % 3 - 1) * 2}deg)`,
                }}
              >
                {/* Film strip holes (top) */}
                <div className="absolute top-0 left-0 w-full h-4 flex justify-between px-2 py-1 z-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2 h-1.5 bg-paper/20 rounded-sm"></div>
                  ))}
                </div>

                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full aspect-square object-cover filter-newspaper hover:filter-none transition-all duration-500 border border-white/10"
                />

                {/* Film strip holes (bottom) */}
                <div className="absolute bottom-0 left-0 w-full h-4 flex justify-between px-2 py-1 z-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-2 h-1.5 bg-paper/20 rounded-sm"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow Link - Typewriter Style */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/cafecravect"
            target="_blank"
            rel="noopener noreferrer"
            className="font-typewriter text-ink hover:text-rust transition-colors
                       underline decoration-dashed underline-offset-4 text-lg"
          >
            → Follow @cafecravect for daily updates
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
