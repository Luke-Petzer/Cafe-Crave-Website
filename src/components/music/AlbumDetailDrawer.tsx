import { useEffect, useRef, useState } from 'react';
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

  // Bug fix (feel-audit-2026-09, pre-existing): MusicPage clears `album` to
  // null in the same state update that sets `isOpen` false, so this
  // component used to unmount the instant it closed -- `if (!album) return
  // null` fired before the CSS exit transition (2.2) ever got a frame to
  // play. Mirrors the mobile nav's 4.1 fix (Header.tsx): stay mounted, and
  // keep showing the last selected album, until the panel's own
  // `transitionend` confirms the slide-out actually finished.
  const [isRendered, setIsRendered] = useState(isOpen);
  const [displayedAlbum, setDisplayedAlbum] = useState<Album | null>(album);

  useEffect(() => {
    if (album) setDisplayedAlbum(album);
  }, [album]);

  useEffect(() => {
    if (isOpen) setIsRendered(true);
  }, [isOpen]);

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

  if (!isRendered || !displayedAlbum) return null;
  return <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-primary bg-opacity-50 transition-opacity duration-drawer ease-out-strong z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} aria-hidden="true"></div>
      {/* Drawer */}
      <div ref={drawerRef} className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-light shadow-lg transform transition-transform duration-drawer ease-drawer z-50 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} tabIndex={isOpen ? 0 : -1} role="dialog" aria-modal="true" aria-label="Album details" onTransitionEnd={e => {
      // Only the panel's own slide (the `transform` transition) should
      // trigger unmount -- ignore bubbled transitionend events from
      // children (e.g. the track-art hover fade) and only act once we're
      // actually closing.
      if (e.target === drawerRef.current && e.propertyName === 'transform' && !isOpen) {
        setIsRendered(false);
      }
    }}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-primary">
              Album Details
            </h2>
            <button onClick={onClose} className="pressable p-2 rounded-full bg-primary bg-opacity-10 hover:bg-opacity-20 transition-colors" aria-label="Close drawer">
              <XIcon size={24} className="text-primary" />
            </button>
          </div>
          {/* Album Info */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6 group">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl">
                <img src={displayedAlbum.image} alt={`${displayedAlbum.title} album cover`} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80" />
              </div>
              {/* Year Badge */}
              <div className="absolute -bottom-2 -right-2 bg-accent text-light px-3 py-1 rounded-md shadow-md">
                {displayedAlbum.year}
              </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary text-center mb-1">
              {displayedAlbum.title}
            </h3>
            <p className="text-xl text-accent mb-4 text-center">
              {displayedAlbum.artist}
            </p>
            {/* Genre Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {displayedAlbum.genres.map((genre, index) => <span key={index} className="px-3 py-1 text-xs bg-primary bg-opacity-10 text-primary rounded-full">
                  {genre}
                </span>)}
            </div>
            <p className="text-subtext mb-6 text-center">{displayedAlbum.description}</p>
            {displayedAlbum.previewLink && <a href={displayedAlbum.previewLink} target="_blank" rel="noopener noreferrer" className="pressable bg-accent hover:bg-opacity-90 text-light px-4 py-2 rounded-md inline-flex items-center font-medium transition-colors mb-6">
                <PlayIcon size={20} className="mr-2" />
                Listen Preview
                <ExternalLinkIcon size={16} className="ml-2" />
              </a>}
          </div>
          {/* Track List */}
          {displayedAlbum.tracks && displayedAlbum.tracks.length > 0 && (
            <div>
              <h4 className="text-xl font-medium text-primary mb-4 flex items-center">
                <span className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-light mr-2">
                  <ListMusicIcon size={16} className="" />
                </span>
                Track List
              </h4>
              <div className="space-y-3">
                {displayedAlbum.tracks.map((track: Track) => <div key={track.number} className="flex items-center">
                    <span className="text-accent font-bold mr-2 w-6 text-center">
                      {track.number}
                    </span>
                    <div className="flex-1 border-b border-dashed border-secondary mx-2"></div>
                    <span className="text-primary flex-grow-0">
                      {track.title}
                    </span>
                    <span className="text-subtext ml-2 text-sm">
                      {track.duration}
                    </span>
                  </div>)}
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