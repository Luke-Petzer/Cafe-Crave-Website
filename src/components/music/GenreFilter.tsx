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
  return <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center mr-2 text-light">
        <FilterIcon size={16} className="mr-1" />
        <span className="text-sm font-medium">Filter by Genre:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => <button key={genre} onClick={() => onToggle(genre)} className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedGenres.includes(genre) ? 'bg-accent text-light' : 'bg-light bg-opacity-20 text-light hover:bg-opacity-30'}`} aria-pressed={selectedGenres.includes(genre)}>
            {genre}
          </button>)}
      </div>
      {selectedGenres.length > 0 && <button onClick={() => selectedGenres.forEach(genre => onToggle(genre))} className="px-3 py-1 rounded-full text-sm bg-light text-primary hover:bg-opacity-90 transition-colors ml-auto">
          Clear All
        </button>}
    </div>;
};