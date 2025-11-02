import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Album } from '../../types/album';

interface VinylCarouselProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

export const VinylCarousel: React.FC<VinylCarouselProps> = ({
  albums,
  onAlbumClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === albums.length - 1 ? 0 : prevIndex + 1);
  }, [albums.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? albums.length - 1 : prevIndex - 1);
  }, [albums.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselRef.current && (document.activeElement === carouselRef.current || carouselRef.current.contains(document.activeElement))) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto-rotate albums every 6 seconds
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && isAutoPlaying) {
      const interval = setInterval(() => {
        nextSlide();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Pause auto-rotation on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };
  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const currentAlbum = albums[currentIndex];
  const currentTracks = currentAlbum.tracks || [];

  return <div className="relative" ref={carouselRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} tabIndex={0} aria-roledescription="carousel" aria-label="Album collection carousel">
      {/* Carousel Controls */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20">
        <button onClick={prevSlide} className="bg-primary text-light p-2 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50" aria-label="Previous album">
          <ChevronLeftIcon size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20">
        <button onClick={nextSlide} className="bg-primary text-light p-2 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50" aria-label="Next album">
          <ChevronRightIcon size={24} />
        </button>
      </div>
      {/* Album Carousel */}
      <div className="grid md:grid-cols-2 gap-12 items-center" aria-live="polite">
        <div className="relative group">
          <div className="relative rounded-full overflow-hidden shadow-xl transform transition-all duration-300 group-hover:scale-105 aspect-square cursor-pointer" onClick={() => onAlbumClick(currentAlbum)}>
            <img src={currentAlbum.image} alt={`Album artwork - ${currentAlbum.title} by ${currentAlbum.artist}`} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80" />
          </div>
          {currentAlbum.year && (
            <div className="absolute -bottom-4 -left-4 bg-primary text-light p-3 rounded-lg shadow-md transform -rotate-6">
              <span className="text-sm font-medium">
                {currentAlbum.year}
              </span>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            {currentAlbum.title}
          </h2>
          <h3 className="text-xl text-accent mb-4">
            {currentAlbum.artist}
          </h3>
          <p className="text-subtext mb-6">
            {currentAlbum.description}
          </p>
          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentAlbum.genres.map((genre, index) => <span key={index} className="px-3 py-1 text-xs bg-primary bg-opacity-10 text-primary rounded-full">
                {genre}
              </span>)}
          </div>
          {/* Preview Tracks */}
          {currentTracks.length > 0 && (
            <div className="space-y-3 mb-6">
              <h4 className="font-medium text-primary mb-2">Featured Tracks:</h4>
              {currentTracks.slice(0, 3).map(track => <div key={track.number} className="flex items-center">
                  <span className="text-accent font-bold mr-2">
                    {track.number}
                  </span>
                  <div className="flex-1 border-b border-dashed border-secondary mx-2"></div>
                  <span className="text-primary">{track.title}</span>
                  <span className="text-subtext ml-2">{track.duration}</span>
                </div>)}
            </div>
          )}
          <div className="flex justify-between items-center">
            <button onClick={() => onAlbumClick(currentAlbum)} className="bg-accent hover:bg-opacity-90 text-light px-4 py-2 rounded-md inline-flex items-center font-medium transition-colors">
              View Details
            </button>
            {currentAlbum.previewLink && <a href={currentAlbum.previewLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent hover:text-primary transition-colors font-medium">
                Listen Preview
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>}
          </div>
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {albums.map((album, index) => <button key={album.id} onClick={() => goToSlide(index)} className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-accent' : 'bg-secondary bg-opacity-30'}`} aria-label={`Go to album ${index + 1}`} aria-current={currentIndex === index} />)}
          </div>
        </div>
      </div>
    </div>;
};