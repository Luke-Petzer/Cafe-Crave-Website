/**
 * Albums Data - The Vintage Vault Collection
 *
 * Curated vinyl records spinning at Crave Café
 * Update this file to add/remove/modify albums
 */

import { Album } from '../types/album';

// Import album cover images
import springsteen from '../assets/bruce-springsteen-born-in-the-usa.webp';
import fleetwoodMac from '../assets/fleetwood-mac-rumours.webp';
import eagles from '../assets/eagles-hotel-california.webp';
import elvisPresley from '../assets/elvis-presley-golden-hits.webp';
import ericClapton from '../assets/eric-clapton-timepieces.webp';
import deanMartin from '../assets/dean-martin-one-more-time.webp';
import chicago from '../assets/chicago-17.webp';
import bryanAdams from '../assets/bryan-adams-reckless.webp';
import carlSimon from '../assets/carly-simon-no-secrets.webp';
import direStaits from '../assets/dire-straits-brothers.webp';
import georgeBenson from '../assets/george-benson-give-me-the-night.webp';
import gipsyKingsAllegria from '../assets/gipsy-kings-allegria.webp';
import gipsyKingsMosaique from '../assets/gipsy-kings-mosaique.webp';
import jimiHendrix from '../assets/jimi-hendrix-electric-lady.webp';
import johnnyNash from '../assets/johnny-nash-clearly-now.webp';
import michaelJackson from '../assets/michael-jackson-off-the-wall.webp';
import oscarPeterson from '../assets/oscar-peterson-plays-sinatra.webp';
import paulaAbdul from '../assets/paula-abdul-spellbound.webp';
import bobMarley from '../assets/bob-marley-greatest-hits.webp';

export const albumsData: Album[] = [
  {
    id: '1',
    title: 'Greatest Hits',
    artist: 'Bob Marley',
    image: bobMarley,
    genres: ['Reggae', 'Soul'],
    description: 'The essential Bob Marley compilation featuring iconic reggae anthems.',
    year: '1984',
    featuredPlaylist: true
  },
  {
    id: '2',
    title: 'Born in the U.S.A.',
    artist: 'Bruce Springsteen',
    image: springsteen,
    genres: ['Rock', 'Pop'],
    description: 'The Boss at his peak with anthemic rock classics.',
    year: '1984',
    featuredPlaylist: true
  },
  {
    id: '3',
    title: 'Rumours',
    artist: 'Fleetwood Mac',
    image: fleetwoodMac,
    genres: ['Rock', 'Pop'],
    description: 'One of the best-selling albums of all time with timeless tracks.',
    year: '1977',
    featuredPlaylist: true
  },
  {
    id: '4',
    title: 'Hotel California',
    artist: 'Eagles',
    image: eagles,
    genres: ['Rock', 'Country'],
    description: 'Classic rock masterpiece with legendary guitar solos.',
    year: '1976',
    featuredPlaylist: false
  },
  {
    id: '5',
    title: 'Golden Hits',
    artist: 'Elvis Presley',
    image: elvisPresley,
    genres: ['Rock', 'Pop'],
    description: 'The King\'s greatest hits compilation.',
    year: '1977',
    featuredPlaylist: false
  },
  {
    id: '6',
    title: 'Timepieces',
    artist: 'Eric Clapton',
    image: ericClapton,
    genres: ['Rock', 'Blues'],
    description: 'Best of Eric Clapton featuring guitar mastery.',
    year: '1982',
    featuredPlaylist: false
  },
  {
    id: '7',
    title: 'One More Time',
    artist: 'Dean Martin',
    image: deanMartin,
    genres: ['Jazz', 'Pop'],
    description: 'Smooth vocals from the legendary crooner.',
    year: '1968',
    featuredPlaylist: false
  },
  {
    id: '8',
    title: 'Chicago 17',
    artist: 'Chicago',
    image: chicago,
    genres: ['Rock', 'Pop'],
    description: 'Horn-driven rock with unforgettable melodies.',
    year: '1984',
    featuredPlaylist: false
  },
  {
    id: '9',
    title: 'Reckless',
    artist: 'Bryan Adams',
    image: bryanAdams,
    genres: ['Rock', 'Pop'],
    description: 'Power ballads and rock anthems from the Canadian rocker.',
    year: '1984',
    featuredPlaylist: false
  },
  {
    id: '10',
    title: 'No Secrets',
    artist: 'Carly Simon',
    image: carlSimon,
    genres: ['Pop', 'Soul'],
    description: 'Featuring the iconic "You\'re So Vain".',
    year: '1972',
    featuredPlaylist: false
  },
  {
    id: '11',
    title: 'Brothers in Arms',
    artist: 'Dire Straits',
    image: direStaits,
    genres: ['Rock', 'Blues'],
    description: 'Mark Knopfler\'s guitar genius on full display.',
    year: '1985',
    featuredPlaylist: true
  },
  {
    id: '12',
    title: 'Give Me the Night',
    artist: 'George Benson',
    image: georgeBenson,
    genres: ['Jazz', 'Soul'],
    description: 'Smooth jazz-funk with incredible guitar work.',
    year: '1980',
    featuredPlaylist: false
  },
  {
    id: '13',
    title: 'Allegria',
    artist: 'Gipsy Kings',
    image: gipsyKingsAllegria,
    genres: ['World', 'Latin'],
    description: 'Flamenco-infused rhythms that make you move.',
    year: '1982',
    featuredPlaylist: false
  },
  {
    id: '14',
    title: 'Mosaïque',
    artist: 'Gipsy Kings',
    image: gipsyKingsMosaique,
    genres: ['World', 'Latin'],
    description: 'More passionate Spanish guitar and vocals.',
    year: '1989',
    featuredPlaylist: false
  },
  {
    id: '15',
    title: 'Electric Ladyland',
    artist: 'Jimi Hendrix',
    image: jimiHendrix,
    genres: ['Rock', 'Blues'],
    description: 'Psychedelic rock masterpiece from a guitar legend.',
    year: '1968',
    featuredPlaylist: true
  },
  {
    id: '16',
    title: 'I Can See Clearly Now',
    artist: 'Johnny Nash',
    image: johnnyNash,
    genres: ['Reggae', 'Soul'],
    description: 'Feel-good reggae vibes and positive energy.',
    year: '1972',
    featuredPlaylist: false
  },
  {
    id: '17',
    title: 'Off the Wall',
    artist: 'Michael Jackson',
    image: michaelJackson,
    genres: ['Pop', 'Soul'],
    description: 'MJ\'s breakthrough solo album with disco-funk perfection.',
    year: '1979',
    featuredPlaylist: true
  },
  {
    id: '18',
    title: 'Plays Sinatra',
    artist: 'Oscar Peterson',
    image: oscarPeterson,
    genres: ['Jazz'],
    description: 'Piano jazz interpretations of Sinatra classics.',
    year: '1959',
    featuredPlaylist: false
  },
  {
    id: '19',
    title: 'Spellbound',
    artist: 'Paula Abdul',
    image: paulaAbdul,
    genres: ['Pop'],
    description: 'Dance-pop hits from the early 90s.',
    year: '1991',
    featuredPlaylist: false
  }
];

// Helper function to get albums by genre
export const getAlbumsByGenre = (genre: string): Album[] => {
  return albumsData.filter(album => album.genres.includes(genre));
};

// Helper function to get featured albums
export const getFeaturedAlbums = (): Album[] => {
  return albumsData.filter(album => album.featuredPlaylist);
};

// Get all unique genres
export const getAllGenres = (): string[] => {
  const genreSet = new Set<string>();
  albumsData.forEach(album => {
    album.genres.forEach(genre => genreSet.add(genre));
  });
  return Array.from(genreSet).sort();
};

