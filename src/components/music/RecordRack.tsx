import { PlayIcon } from 'lucide-react';
import { Album } from '../../types/album';

interface RecordRackProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

export const RecordRack: React.FC<RecordRackProps> = ({
  albums,
  onAlbumClick
}) => {
  return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" role="grid" aria-label="Record collection grid">
      {albums.map((album: Album) => <div key={album.id} className="flex flex-col items-center group" role="gridcell">
          <button onClick={() => onAlbumClick(album)} className="relative vinyl-animation focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-full" aria-label={`View details for ${album.title} by ${album.artist}`}>
            <div className="w-full aspect-square rounded-full overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
              <img src={album.image} alt={`${album.title} by ${album.artist}`} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 rounded-full">
                <div className="bg-accent p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                  <PlayIcon size={24} className="text-light" />
                </div>
              </div>
            </div>
            {/* Vinyl Record Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 vinyl-disc" aria-hidden="true"></div>
            {/* Year Label */}
            {album.year && (
              <div className="absolute -bottom-2 -right-2 bg-primary text-light px-2 py-1 rounded-md shadow-md text-xs font-medium">
                {album.year}
              </div>
            )}
          </button>
          <div className="mt-4 text-center w-full">
            <h3 className="font-medium text-light truncate max-w-full">
              {album.title}
            </h3>
            <p className="text-light opacity-80 text-sm truncate max-w-full">
              {album.artist}
            </p>
          </div>
          {/* Genre Tags */}
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            <span className="px-2 py-0.5 text-xs bg-light bg-opacity-20 text-light rounded-full">
              {album.genres[0]}
            </span>
            {album.genres.length > 1 && <span className="px-2 py-0.5 text-xs bg-light bg-opacity-20 text-light rounded-full md:hidden">
                +{album.genres.length - 1}
              </span>}
            {album.genres.slice(1, 3).map((genre: string, index: number) => <span key={index} className="px-2 py-0.5 text-xs bg-light bg-opacity-20 text-light rounded-full hidden md:inline-block">
                {genre}
              </span>)}
            {album.genres.length > 3 && <span className="px-2 py-0.5 text-xs bg-light bg-opacity-20 text-light rounded-full hidden md:inline-block">
                +{album.genres.length - 3}
              </span>}
          </div>
        </div>)}
    </div>;
};