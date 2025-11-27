import React from 'react';
import { FilterIcon } from 'lucide-react';

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onToggle: (genre: string) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  onToggle
}) => {
  return (
    <div className="paper-container p-6 mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center mr-2 text-ink-black">
          <FilterIcon size={18} className="mr-2" />
          <span className="text-sm font-bold uppercase tracking-wide" style={{ fontFamily: 'Courier New, monospace' }}>
            Filter by Genre:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => onToggle(genre)}
              className={`px-4 py-2 rounded-sm text-sm transition-all duration-200 border-2 font-medium ${
                selectedGenres.includes(genre) 
                  ? 'bg-sepia-tone text-vintage-cream border-ink-black shadow-md' 
                  : 'bg-aged-paper text-ink-black border-ink-black border-opacity-30 hover:border-opacity-60 hover:shadow-sm'
              }`}
              style={{ fontFamily: 'Courier New, monospace' }}
              aria-pressed={selectedGenres.includes(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        {selectedGenres.length > 0 && (
          <button
            onClick={() => selectedGenres.forEach(genre => onToggle(genre))}
            className="px-4 py-2 rounded-sm text-sm bg-ink-black text-vintage-cream hover:bg-opacity-90 transition-all duration-200 ml-auto font-bold border-2 border-ink-black uppercase tracking-wide"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};