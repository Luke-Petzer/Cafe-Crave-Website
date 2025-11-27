import { useEffect, useRef } from 'react';
import { XIcon, PlayIcon, ExternalLinkIcon } from 'lucide-react';
import { Album } from '../../types/album';

interface Track {
  number: number;
  title: string;
  duration: string;
}


interface AlbumDetailDrawerProps {
  album: Album | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AlbumDetailDrawer: React.FC<AlbumDetailDrawerProps> = ({
  album,
  isOpen,
  onClose
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap in drawer
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!album) return null;
  return <>
      {/* Backdrop - Dark Wood Visible */}
      <div className={`fixed inset-0 bg-dark-walnut bg-opacity-80 transition-opacity z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} aria-hidden="true"></div>
      {/* Drawer - VINYL SLEEVE BACK */}
      <div ref={drawerRef} className={`fixed inset-y-0 right-0 w-full md:w-[550px] vinyl-sleeve-back transform transition-transform z-50 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} tabIndex={isOpen ? 0 : -1} role="dialog" aria-modal="true" aria-label="Album details">
        <div className="p-8 relative z-10">
          {/* Header - Vintage Newspaper Style */}
          <div className="flex justify-between items-center mb-8 border-b-2 border-ink-black pb-4">
            <h2 className="text-2xl font-serif font-bold text-ink-black uppercase tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
              Album Details
            </h2>
            <button onClick={onClose} className="p-2 rounded-sm bg-sepia-tone hover:bg-opacity-90 transition-colors border-2 border-ink-black" aria-label="Close drawer">
              <XIcon size={24} className="text-vintage-cream" />
            </button>
          </div>
          {/* Album Info - Vinyl Sleeve Style */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6 group">
              {/* White vinyl sleeve frame */}
              <div className="bg-white p-3 shadow-xl" style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.05)' }}>
                <div className="w-64 h-64 overflow-hidden bg-gray-100 relative">
                  <img src={album.image} alt={`${album.title} album cover`} className="w-full h-full object-cover vintage-photo-strong" />
                  {/* Inner border */}
                  <div className="absolute inset-0 border border-black opacity-10 pointer-events-none"></div>
                </div>
              </div>
              {/* Year Badge - Vinyl Style */}
              <div className="absolute -bottom-3 -right-3 year-badge-vinyl">
                {album.year}
              </div>
            </div>

            {/* Album Title - Typewriter Style */}
            <h3 className="text-2xl font-bold text-ink-black text-center mb-2 uppercase" style={{ fontFamily: 'Courier New, monospace', letterSpacing: '0.05em' }}>
              {album.title}
            </h3>
            <p className="text-lg text-sepia-tone mb-4 text-center font-semibold" style={{ fontFamily: 'Courier New, monospace' }}>
              {album.artist}
            </p>

            {/* Genre Tags - Aged Paper */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {album.genres.map((genre, index) => (
                <span key={index} className="px-3 py-1 text-xs bg-aged-paper text-ink-black rounded-sm border border-ink-black border-opacity-20 font-medium" style={{ fontFamily: 'Courier New, monospace' }}>
                  {genre}
                </span>
              ))}
            </div>

            {/* Description - Typewriter Text */}
            <p className="typewriter-text text-ink-black mb-6 text-center text-sm leading-relaxed max-w-md">
              {album.description}
            </p>

            {album.previewLink && (
              <a
                href={album.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sepia-tone hover:bg-opacity-90 text-vintage-cream px-6 py-3 rounded-sm inline-flex items-center font-bold transition-all duration-200 hover:scale-105 border-2 border-ink-black mb-6 uppercase tracking-wide text-sm"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <PlayIcon size={20} className="mr-2" />
                Listen Preview
                <ExternalLinkIcon size={16} className="ml-2" />
              </a>
            )}
          </div>
          {/* Track List - LINER NOTES STYLE */}
          {album.tracks && album.tracks.length > 0 && (
            <div className="liner-notes">
              <h4 className="liner-notes-title flex items-center">
                <span className="w-8 h-8 bg-sepia-tone rounded-sm flex items-center justify-center text-vintage-cream mr-3 border-2 border-ink-black">
                  <ListMusicIcon size={16} className="" />
                </span>
                Track Listing
              </h4>
              <div className="space-y-2">
                {album.tracks.map((track: Track) => (
                  <div key={track.number} className="track-listing">
                    <span className="font-bold mr-3 w-8 text-center flex-shrink-0">
                      {String(track.number).padStart(2, '0')}.
                    </span>
                    <span className="flex-grow">
                      {track.title}
                    </span>
                    <span className="ml-3 text-xs opacity-70 flex-shrink-0">
                      [{track.duration}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>;
};
// ListMusicIcon component
interface ListMusicIconProps {
  size: number;
  className?: string;
}

const ListMusicIcon: React.FC<ListMusicIconProps> = ({
  size,
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>;