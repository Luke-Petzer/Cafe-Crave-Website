import { Album } from '../../types/album';

interface RecordRackProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

export const RecordRack: React.FC<RecordRackProps> = ({
  albums,
  onAlbumClick
}) => {
  return (
    /* VINTAGE ECLECTIC: Wooden Record Crate */
    <div className="record-crate">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 relative z-10" role="grid" aria-label="Record collection grid">
        {albums.map((album: Album) => (
          <div key={album.id} className="flex flex-col items-center group" role="gridcell">
            <button
              onClick={() => onAlbumClick(album)}
              className="relative focus:outline-none focus:ring-2 focus:ring-sepia-tone focus:ring-offset-2 focus:ring-offset-transparent w-full"
              aria-label={`View details for ${album.title} by ${album.artist}`}
            >
              {/* VINYL SLEEVE FRAME */}
              <div className="vinyl-sleeve w-full">
                <div className="w-full aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={album.image}
                    alt={`${album.title} by ${album.artist}`}
                    className="w-full h-full object-cover vintage-photo-strong transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                    width="500"
                    height="500"
                  />
                </div>
              </div>
              {/* Year Badge - Vintage Style */}
              {album.year && (
                <div className="absolute -bottom-3 -right-2 year-badge-vinyl text-xs">
                  '{String(album.year).slice(-2)}
                </div>
              )}
            </button>

            {/* Album Info - Typewriter Style */}
            <div className="mt-5 text-center w-full px-2">
              <h3 className="typewriter-text font-bold text-vintage-cream truncate max-w-full text-sm">
                {album.title}
              </h3>
              <p className="typewriter-text text-aged-paper opacity-90 text-xs truncate max-w-full mt-1">
                {album.artist}
              </p>
            </div>

            {/* Genre Tags - Aged Paper Style */}
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              <span className="px-2 py-0.5 text-xs bg-aged-paper text-ink-black rounded-sm font-medium" style={{ fontFamily: 'Courier New, monospace' }}>
                {album.genres[0]}
              </span>
              {album.genres.length > 1 && (
                <span className="px-2 py-0.5 text-xs bg-aged-paper text-ink-black rounded-sm font-medium md:hidden" style={{ fontFamily: 'Courier New, monospace' }}>
                  +{album.genres.length - 1}
                </span>
              )}
              {album.genres.slice(1, 3).map((genre: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-aged-paper text-ink-black rounded-sm font-medium hidden md:inline-block"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  {genre}
                </span>
              ))}
              {album.genres.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-aged-paper text-ink-black rounded-sm font-medium hidden md:inline-block" style={{ fontFamily: 'Courier New, monospace' }}>
                  +{album.genres.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};