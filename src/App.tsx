import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OurVibe } from './components/OurVibe';
import { MenuPreview } from './components/MenuPreview';
import { MusicFeature } from './components/MusicFeature';
import { InstagramFeed } from './components/InstagramFeed';
import { GoogleReviews } from './components/GoogleReviews';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
export function App() {
  return <div className="min-h-screen">
      <SEO
        title="Home"
        description="Crave Café - Where coffee meets culture. Experience exceptional coffee, vinyl records, and community in Cape Town's retro-inspired café with board games and live events."
        keywords="café, coffee shop, vinyl café, board games, Cape Town, retro café, live music, events, artisan coffee"
      />
      <Header />
      <main>
        <Hero />
        <OurVibe />
        <MenuPreview />
        <MusicFeature />
          <GoogleReviews />
        <InstagramFeed />
      </main>
      <Footer />
    </div>;
}