// Type declaration for albumsData.js
interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
  genres: string[];
  description: string;
  year?: string;
  tracks?: Array<{ number: number; title: string; duration: string }>;
  featuredPlaylist?: boolean;
  previewLink?: string;
}

declare const albumsData: Album[];
export { albumsData, Album };

