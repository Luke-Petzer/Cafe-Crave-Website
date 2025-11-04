import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { RecordRack } from '../components/music/RecordRack';
import { AlbumDetailDrawer } from '../components/music/AlbumDetailDrawer';
import { GenreFilter } from '../components/music/GenreFilter';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';
import { albumsData } from '../data/albumsData';
import { Album } from '../types/album';
import musicImg from '../assets/music.webp';

export const MusicPage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Extract all unique genres from albums
  const allGenres = useMemo(() => {
    const genreSet = new Set<string>();
    albumsData.forEach((album: Album) => {
      album.genres.forEach((genre: string) => genreSet.add(genre));
    });
    return Array.from(genreSet).sort();
  }, []);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredAlbums = selectedGenres.length === 0
    ? albumsData
    : albumsData.filter((album: Album) =>
        album.genres.some((genre: string) => selectedGenres.includes(genre))
      );

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Vinyl Collection | Crave Café Cape Town"
        description="Explore the vinyl music collection at Crave Café. We spin classic jazz, rock, and soul records all day. Discover our curated selection."
        keywords="vinyl cafe cape town, music themed cafe, record collection, classic vinyl, crave cafe music"
      />
      <ScrollAnimationObserver />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        {/* Hero Section - DARK */}
        <section className="section-dark relative min-h-[600px] md:min-h-[650px] flex items-center justify-center">
          <div className="absolute inset-0 z-0 overflow-hidden animate-hero-zoom">
            <img
              src={musicImg}
              alt="A record rack filled with classic vinyl albums at Crave Café"
              className="w-full h-full object-cover brightness-50"
            />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Our Vinyl Collection
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Explore our curated selection of classic albums and timeless records
            </p>
          </div>
        </section>

        <section className="section-dark py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="mb-8">
              <GenreFilter
                genres={allGenres}
                selectedGenres={selectedGenres}
                onToggle={handleGenreToggle}
              />
            </div>
            <RecordRack albums={filteredAlbums} onAlbumClick={setSelectedAlbum} />
          </div>
        </section>
      </main>
      <Footer />
      <AlbumDetailDrawer
        album={selectedAlbum}
        isOpen={selectedAlbum !== null}
        onClose={() => setSelectedAlbum(null)}
      />
    </div>
  );
};
