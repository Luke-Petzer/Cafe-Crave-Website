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
    <div className="min-h-screen animate-fade-in">
      <SEO
        title="Music Collection"
        description="Explore our curated vinyl collection at Crave Café. Discover classic albums and enjoy the warm sound of vinyl records."
        keywords="vinyl records, music collection, café music, record collection, vinyl café"
      />
      <ScrollAnimationObserver />
      <Header />
      <main>
        <section className="section-dark py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-4">
                Our Vinyl Collection
              </h1>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="opacity-80 max-w-2xl mx-auto text-lg">
                Browse through our carefully curated selection of vinyl records
              </p>
            </div>
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
