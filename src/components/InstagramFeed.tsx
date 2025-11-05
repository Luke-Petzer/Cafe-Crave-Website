import React, { useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  caption?: string;
  url: string;
  alt?: string;
}

interface InstagramFeedProps {
  posts?: InstagramPost[];
  standalone?: boolean;
}

// Default posts with actual Instagram post IDs
const defaultPosts: InstagramPost[] = [
  {
    id: 'DPW5eRmitgU',
    url: 'https://www.instagram.com/p/DPW5eRmitgU/',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
    caption: 'Latest from Café Crave ☕✨',
    alt: 'Instagram post from Café Crave'
  },
  {
    id: 'DPQ0QNXCiNF',
    url: 'https://www.instagram.com/p/DPQ0QNXCiNF/',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
    caption: 'Community vibes at Crave 🎵',
    alt: 'Community moments at Café Crave'
  },
  {
    id: 'DPJcBjYitvt',
    url: 'https://www.instagram.com/p/DPJcBjYitvt/',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    caption: 'Special moments at the café 🎲',
    alt: 'Special events at Café Crave'
  },
  {
    id: 'DO-mDfAihNa',
    url: 'https://www.instagram.com/p/DO-mDfAihNa/',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    caption: 'Fresh daily at Crave 🥐',
    alt: 'Fresh offerings at Café Crave'
  },
  {
    id: 'extra1',
    url: 'https://www.instagram.com/cafecrave_halal/',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    caption: 'Coffee culture & community ☕',
    alt: 'Coffee culture at Café Crave'
  }
];

export const InstagramFeed: React.FC<InstagramFeedProps> = ({
  posts = defaultPosts,
  standalone = true
}) => {
  const [first, ...rest] = posts;

  useEffect(() => {
    // Load Instagram embed script if not already loaded
    if (!(window as any).instgrm) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script already loaded, process embeds
      (window as any).instgrm.Embeds.process();
    }
  }, [posts]);

  const content = (
    <>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Instagram size={32} className="text-accent" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Follow Our Journey
          </h2>
        </div>
        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto opacity-90 text-lg">
          Stay connected with our daily moments, events, and community highlights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-10">
        {/* Featured Post - Takes up 2 columns on desktop */}
        {first && (
          <div className="md:col-span-2">
            <a
              href={first.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label={first.caption ?? 'Featured Instagram post'}
            >
              <div className="relative w-full h-96 bg-lightText bg-opacity-10 overflow-hidden">
                <img
                  src={first.image}
                  alt={first.alt ?? first.caption ?? 'Featured post'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="800"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-darkText translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Instagram size={20} />
                    <span className="font-medium">@cafecrave_halal</span>
                  </div>
                </div>
              </div>
              {first.caption && (
                <div className="p-4 bg-lightBg">
                  <p className="text-base font-medium line-clamp-2">{first.caption}</p>
                </div>
              )}
            </a>
          </div>
        )}

        {/* Grid of smaller posts - Takes up 1 column on desktop */}
        <div className="grid grid-cols-2 gap-4">
          {rest.slice(0, 4).map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label={post.caption ?? 'Instagram post'}
            >
              <div className="relative w-full h-40 bg-lightText bg-opacity-10 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.alt ?? post.caption ?? 'Instagram image'}
                  width="800"
                  height="800"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-darkBg bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink
                    size={24}
                    className="text-darkText opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a
          href="https://www.instagram.com/cafecrave_halal/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
        >
          <Instagram size={22} />
          Follow Us on Instagram
          <ExternalLink size={18} />
        </a>
        <p className="mt-4 text-sm opacity-70">
          Join our community of coffee lovers and music enthusiasts
        </p>
      </div>
    </>
  );

  if (standalone) {
    return (
      <section className="bg-redBg text-redText py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          {content}
        </div>
      </section>
    );
  }

  return content;
};

export default InstagramFeed;
