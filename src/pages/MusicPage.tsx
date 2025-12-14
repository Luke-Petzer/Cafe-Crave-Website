import { useState } from 'react';
import { motion } from 'framer-motion';
import Masthead from '../components/Masthead';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { TornEdge } from '../components/NewspaperComponents';
import { newspaperVariants } from '../utils/newspaperAnimations';
import { albumsData, getAllGenres } from '../data/albumsData';
import { Album } from '../types/album';

export const MusicPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const allGenres = ["All", ...getAllGenres()];

  // Filter albums based on selected genre
  const filteredAlbums = activeFilter === "All"
    ? albumsData
    : albumsData.filter((album: Album) => album.genres.includes(activeFilter));

  return (
    <div className="min-h-screen bg-grain font-body">
      <SEO
        title="The Vintage Vault | Vinyl Collection at Crave Café"
        description="Explore our curated vinyl collection at Crave Café. Classic rock, jazz, soul, and reggae records spinning all day in Claremont, Cape Town."
        keywords="vinyl cafe cape town, music themed cafe, record collection, classic vinyl, crave cafe music, retro music"
      />

      <Masthead />

      <main id="main-content">
        {/* SECTION 1: Header Section (Paper Background for Contrast) */}
        <div className="bg-paper pt-20 pb-12 md:pt-28 md:pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block font-accent text-rust tracking-[0.3em] uppercase text-sm border-b-2 border-rust pb-1 mb-6">
              The Vintage Vault
            </span>
            <h1 className="font-headline text-6xl md:text-8xl text-ink mb-6">
              ON THE AIR
            </h1>
            <p className="font-body text-lg md:text-xl text-ink/60 italic max-w-2xl mx-auto">
              "We don't just play background noise. We curate a sonic landscape that shifts with the time of day."
            </p>
          </div>

          {/* Torn Edge Transition to Dark */}
          <div className="absolute bottom-[-1px] left-0 w-full text-espresso leading-none">
            <TornEdge />
          </div>
        </div>

        {/* SECTION 2: The Filter Bar ("Index Tabs") */}
        <div className="sticky top-20 z-30 bg-espresso/95 backdrop-blur-sm border-b border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-2 min-w-max">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveFilter(genre)}
                  className={`
                    relative px-6 py-3 font-accent uppercase tracking-widest text-xs border-t-2 border-l-2 border-r-2 rounded-t-lg transition-all duration-300
                    ${activeFilter === genre 
                      ? 'bg-paper text-ink border-paper translate-y-1 shadow-lg' 
                      : 'bg-transparent text-white/50 border-white/20 hover:text-white hover:border-white/50'
                    }
                  `}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: The Album Grid ("Gallery Wall") */}
        <div className="bg-espresso py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">

            {/* Album Count */}
            <p className="text-center font-typewriter text-white/40 text-sm mb-12">
              Showing {filteredAlbums.length} {filteredAlbums.length === 1 ? 'record' : 'records'}
            </p>

            {/* Album Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16"
              initial="hidden"
              animate="visible"
              variants={newspaperVariants.staggerContainer}
            >
              {filteredAlbums.map((album) => (
                <motion.div
                  key={album.id}
                  variants={newspaperVariants.staggerItem}
                  className="group relative"
                >

                  {/* The Vinyl Sleeve (Image) */}
                  <div className="relative aspect-square bg-[#111] shadow-2xl transition-transform duration-500 group-hover:-translate-y-4 z-10">
                    <img
                      src={album.image}
                      alt={`${album.title} by ${album.artist}`}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />

                    {/* Vinyl Record sliding out on hover (Visual Flourish) */}
                    <div className="absolute top-2 right-2 bottom-2 w-full rounded-full bg-black -z-10 group-hover:translate-x-12 transition-transform duration-500 flex items-center justify-center opacity-80">
                      <div className="w-1/3 h-1/3 bg-rust rounded-full border-2 border-white/20"></div>
                    </div>
                  </div>

                  {/* The "Museum Label" (Readability Fix) */}
                  <div className="mt-[-10px] relative z-20 bg-paper p-4 border border-ink/10 shadow-lg text-center mx-2 group-hover:bg-rust group-hover:text-paper transition-colors duration-300">

                    {/* Decorative 'Tape' at top center */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/20 rotate-1 backdrop-blur-sm"></div>

                    <h3 className="font-headline text-base md:text-lg font-bold leading-tight mb-2 group-hover:text-white transition-colors line-clamp-2">
                      {album.title}
                    </h3>

                    <p className="font-accent text-xs tracking-widest uppercase text-rust group-hover:text-white/90 transition-colors mb-3">
                      {album.artist}
                    </p>

                    {/* Metadata row */}
                    <div className="border-t border-ink/10 group-hover:border-white/20 pt-2 flex justify-between items-center px-2 transition-colors">
                      <span className="font-typewriter text-[10px] opacity-60 group-hover:opacity-80">
                        {album.year}
                      </span>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {album.genres.slice(0, 2).map((genre, idx) => (
                          <span
                            key={idx}
                            className="font-accent text-[9px] uppercase border border-ink/20 group-hover:border-white/40 px-1.5 py-0.5 rounded transition-colors"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredAlbums.length === 0 && (
              <div className="text-center py-20">
                <p className="font-headline text-3xl text-white/20 mb-4">No records found</p>
                <p className="font-body text-white/40">Try selecting a different genre</p>
              </div>
            )}

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
