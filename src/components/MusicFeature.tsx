import React, { useEffect, useState, useRef } from 'react';
import { MusicIcon, PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon, VolumeIcon, Volume2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const MusicFeature = () => {
  const [currentAlbum, setCurrentAlbum] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [rotationAngle, setRotationAngle] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Sample album data - in production this would come from a database
  const albums = [{
    id: 1,
    title: 'Miles Davis - Kind of Blue',
    image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    description: 'A timeless jazz masterpiece that perfectly complements your morning coffee. This 1959 album features legendary tracks like "So What" and "Blue in Green" that create the perfect atmosphere for relaxation and conversation.',
    tracks: [{
      number: '01',
      title: 'So What',
      duration: '9:22'
    }, {
      number: '02',
      title: 'Freddie Freeloader',
      duration: '9:46'
    }, {
      number: '03',
      title: 'Blue in Green',
      duration: '5:37'
    }]
  }, {
    id: 2,
    title: 'John Coltrane - A Love Supreme',
    image: 'https://images.unsplash.com/photo-1629276301820-e9b4b98aa800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: "A spiritual jazz album that elevates any cafe experience. Coltrane's masterpiece is perfect for those thoughtful afternoon conversations or peaceful solo moments with a cappuccino.",
    tracks: [{
      number: '01',
      title: 'Part I: Acknowledgement',
      duration: '7:42'
    }, {
      number: '02',
      title: 'Part II: Resolution',
      duration: '7:22'
    }, {
      number: '03',
      title: 'Part III: Pursuance',
      duration: '10:41'
    }]
  }, {
    id: 3,
    title: 'Nina Simone - I Put A Spell On You',
    image: 'https://images.unsplash.com/photo-1629276301820-e9b4b98aa800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'The incomparable Nina Simone delivers soulful interpretations that pair perfectly with our signature drinks. Her rich voice fills the café with warmth and character.',
    tracks: [{
      number: '01',
      title: 'I Put A Spell On You',
      duration: '2:35'
    }, {
      number: '02',
      title: 'Feeling Good',
      duration: '2:57'
    }, {
      number: '03',
      title: 'Ne Me Quitte Pas',
      duration: '3:35'
    }]
  }];
  const nextAlbum = () => {
    setCurrentAlbum(prev => prev === albums.length - 1 ? 0 : prev + 1);
  };
  const prevAlbum = () => {
    setCurrentAlbum(prev => prev === 0 ? albums.length - 1 : prev - 1);
  };
  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };
  // Animate vinyl rotation when playing
  useEffect(() => {
    if (isPlaying) {
      // Start continuous rotation
      intervalRef.current = setInterval(() => {
        setRotationAngle(prev => prev + 0.5);
      }, 30);
    } else {
      // Stop rotation
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    // Cleanup interval on unmount or when play state changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentAlbum]);
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return <section className="section-animate section-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-4">
            On the Turntable
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="opacity-90 max-w-2xl mx-auto text-lg">
            This week's featured vinyl and the soundtrack to your Crave
            experience
          </p>
        </div>
        <div className="vinyl-player-container relative max-w-6xl mx-auto mb-12">
          {/* Album Visualization */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Vinyl Record Display */}
            <div className="vinyl-player-wrapper relative">
              <div className="vinyl-record-container aspect-square rounded-full relative shadow-2xl" style={{
              transform: isPlaying ? `rotate(${rotationAngle}deg)` : 'rotate(0deg)',
              transition: isPlaying ? 'none' : 'transform 0.5s ease-out'
            }}>
                {/* Vinyl record */}
                <div className="absolute inset-0 vinyl-record rounded-full bg-primary">
                  <div className="absolute inset-0 vinyl-grooves rounded-full"></div>
                  <div className="absolute inset-[30%] rounded-full bg-primary flex items-center justify-center overflow-hidden">
                    <img src={albums[currentAlbum].image} alt={`Album artwork - ${albums[currentAlbum].title}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-[48%] rounded-full bg-primary border-2 border-secondary"></div>
                </div>
              </div>
              {/* Album Label */}
              <div className="absolute -bottom-4 -left-4 bg-primary text-light p-3 rounded-lg shadow-md transform -rotate-6">
                <MusicIcon size={20} />
              </div>
              {/* Player Controls */}
              <div className="mt-8 flex flex-col items-center">
                {/* Play/Pause Button */}
                <button onClick={togglePlayback} className="bg-accent hover:bg-opacity-90 text-light p-4 rounded-full shadow-md transition-colors mb-6" aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
                </button>
                {/* Volume Control */}
                <div className="flex items-center space-x-3 w-full max-w-xs">
                  <VolumeIcon size={20} className="text-light" />
                  <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="w-full h-2 bg-light bg-opacity-30 rounded-lg appearance-none cursor-pointer" aria-label="Volume control" />
                  <Volume2Icon size={20} className="text-light" />
                </div>
              </div>
            </div>
            {/* Album Info */}
            <div>
              <h3 className="text-3xl font-serif font-bold text-light mb-4">
                {albums[currentAlbum].title}
              </h3>
              <p className="text-light opacity-90 mb-6">
                {albums[currentAlbum].description}
              </p>
              {/* Track List */}
              <div className="space-y-3">
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