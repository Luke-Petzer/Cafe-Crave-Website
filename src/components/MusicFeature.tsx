import { useState } from 'react';
import { MusicIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import album artwork
import queenNightAtTheOpera from '../assets/queen-night-at-the-opera.webp';
import elvisPresleyGoldenHits from '../assets/elvis-presley-golden-hits.webp';
import bruceSpringsteenBornInTheUsa from '../assets/bruce-springsteen-born-in-the-usa.webp';

export const MusicFeature = () => {
  const [currentAlbum, setCurrentAlbum] = useState(0);

  // Featured album data
  const albums = [{
    id: 1,
    title: "A Night at the Opera",
    artist: "Queen",
    year: "1975",
    image: queenNightAtTheOpera,
    description: "An epic, genre-bending masterpiece from Queen. While 'Bohemian Rhapsody' is legendary, 'You're My Best Friend' is the ultimate feel-good cafe track that brings smiles to everyone in the room.",
    tracks: [{
      number: '01',
      title: "You're My Best Friend",
      duration: '2:52'
    }, {
      number: '02',
      title: 'Love of My Life',
      duration: '3:39'
    }, {
      number: '03',
      title: 'Bohemian Rhapsody',
      duration: '5:55'
    }]
  }, {
    id: 2,
    title: "Elvis' Golden Hits",
    artist: "Elvis Presley",
    year: "1958",
    image: elvisPresleyGoldenHits,
    description: "The original King of Rock 'n' Roll at his finest. This collection defined a generation with timeless hits like 'Hound Dog' and 'Jailhouse Rock' that still get toes tapping today.",
    tracks: [{
      number: '01',
      title: 'Hound Dog',
      duration: '2:16'
    }, {
      number: '02',
      title: 'Jailhouse Rock',
      duration: '2:37'
    }, {
      number: '03',
      title: 'Love Me Tender',
      duration: '2:41'
    }]
  }, {
    id: 3,
    title: 'Born in the U.S.A.',
    artist: 'Bruce Springsteen',
    year: "1984",
    image: bruceSpringsteenBornInTheUsa,
    description: "An American rock icon at the peak of his powers. From the anthemic title track to 'Dancing in the Dark', this album is pure energy and storytelling brilliance.",
    tracks: [{
      number: '01',
      title: 'Born in the U.S.A.',
      duration: '4:39'
    }, {
      number: '02',
      title: 'Dancing in the Dark',
      duration: '4:01'
    }, {
      number: '03',
      title: 'Glory Days',
      duration: '4:15'
    }]
  }];

  const nextAlbum = () => {
    setCurrentAlbum(prev => prev === albums.length - 1 ? 0 : prev + 1);
  };

  const prevAlbum = () => {
    setCurrentAlbum(prev => prev === 0 ? albums.length - 1 : prev - 1);
  };

  return <section className="section-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-4">
            On the Turntable
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="opacity-90 max-w-2xl mx-auto text-lg">
            This week's featured vinyl from our collection
          </p>
        </div>
        <div className="vinyl-player-container relative max-w-6xl mx-auto mb-12">
          {/* Album Visualization */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Vinyl Record Display */}
            <div className="vinyl-player-wrapper relative">
              <div className="vinyl-record-container aspect-square rounded-full relative shadow-2xl">
                {/* Vinyl record */}
                <div className="absolute inset-0 vinyl-record rounded-full bg-primary">
                  <div className="absolute inset-0 vinyl-grooves rounded-full"></div>
                  <div className="absolute inset-[30%] rounded-full bg-primary flex items-center justify-center overflow-hidden">
                    <img src={albums[currentAlbum].image} alt={`Album artwork - ${albums[currentAlbum].title} by ${albums[currentAlbum].artist}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-[48%] rounded-full bg-primary border-2 border-secondary"></div>
                </div>
              </div>
              {/* Album Label */}
              <div className="absolute -bottom-4 -left-4 bg-primary text-light p-3 rounded-lg shadow-md transform -rotate-6">
                <MusicIcon size={20} />
              </div>
            </div>
            {/* Album Info */}
            <div>
              <h3 className="text-3xl font-serif font-bold text-light mb-2">
                {albums[currentAlbum].title}
              </h3>
              <p className="text-xl text-secondary mb-1">
                {albums[currentAlbum].artist}
              </p>
              <p className="text-sm text-light opacity-70 mb-6">
                {albums[currentAlbum].year}
              </p>
              <p className="text-light opacity-90 mb-6">
                {albums[currentAlbum].description}
              </p>
              {/* Track List */}
              <div className="space-y-3 mb-8">
                <h4 className="text-sm font-semibold text-light opacity-80 uppercase tracking-wide">Featured Tracks:</h4>
                {albums[currentAlbum].tracks.map(track => <div key={track.number} className="flex items-center">
                    <span className="text-lightBg font-bold mr-2">
                      {track.number}
                    </span>
                    <div className="flex-1 border-b border-dashed border-secondary mx-2"></div>
                    <span className="text-light">{track.title}</span>
                    <span className="text-light opacity-80 ml-2">{track.duration}</span>
                  </div>)}
              </div>
              {/* Navigation */}
              <div className="mt-8 flex justify-between items-center">
                <div className="flex space-x-6">
                  <button onClick={prevAlbum} className="bg-lightBg text-lightText p-2 rounded-full hover:bg-accent hover:text-light transition-colors" aria-label="Previous album">
                    <ChevronLeftIcon size={20} />
                  </button>
                  <button onClick={nextAlbum} className="bg-lightBg text-lightText p-2 rounded-full hover:bg-accent hover:text-light transition-colors" aria-label="Next album">
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
                <Link to="/music" className="inline-flex items-center hover:text-secondary transition-colors font-medium">
                  Explore our vinyl collection
                  <ArrowRightIcon size={18} className="ml-2" />
                </Link>
              </div>
              {/* Album Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {albums.map((album, index) => <button key={album.id} onClick={() => setCurrentAlbum(index)} className={`w-2 h-2 rounded-full ${currentAlbum === index ? 'bg-accent' : 'bg-light bg-opacity-40'}`} aria-label={`Go to album ${index + 1}`} aria-current={currentAlbum === index} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

