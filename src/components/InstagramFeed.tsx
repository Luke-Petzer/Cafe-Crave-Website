import React, { useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import insta1 from '../assets/insta-1.webp';
import insta2 from '../assets/insta-2.webp';
import insta3 from '../assets/insta-3.webp';
import insta4 from '../assets/insta-4.webp';
import insta5 from '../assets/insta-5.webp';

interface InstagramPost {
  id: string;
  image: string;
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
    url: 'https://www.instagram.com/reel/DQqoHgcD58Y/?igsh=czB1bGwxYzRiM2pp',
    image: insta1,
    alt: 'Instagram post from Café Crave'
  },
  {
    id: 'DPQ0QNXCiNF',
    url: 'https://www.instagram.com/p/DQW_WM1Cgro/?igsh=cXl3YmloaTU3YnQx',
    image: insta2,
    alt: 'Community moments at Café Crave'
  },
  {
    id: 'DPJcBjYitvt',
    url: 'https://www.instagram.com/reel/DQGmySnEe20/?igsh=MTZ3aHN1cjV4NWttOA==',
    image: insta3,
    alt: 'Special events at Café Crave'
  },
  {
    id: 'DO-mDfAihNa',
    url: 'https://www.instagram.com/reel/DQLnFTwjt_0/?igsh=MXN3Z2VicGl5ajBqeQ==',
    image: insta4,
    alt: 'Fresh offerings at Café Crave'
  },
  {
    id: 'extra1',
    url: 'https://www.instagram.com/reel/DQdvta_Cf7C/?igsh=bTJwcmUyazVkMjgw',
    image: insta5,
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
          <Instagram size={32} className="text-light" />
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
              aria-label="Featured Instagram post"
            >
              <div className="relative w-full h-96 bg-lightText bg-opacity-10 overflow-hidden">
                <img
                  src={first.image}
                  alt={first.alt ?? 'Featured post'}
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
              aria-label="Instagram post"
            >
              <div className="relative w-full h-40 bg-lightText bg-opacity-10 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.alt ?? 'Instagram image'}
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
          className="inline-flex items-center gap-2 bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md font-semibold text-lg tracking-wide transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
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
