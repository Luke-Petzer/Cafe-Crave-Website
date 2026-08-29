import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OurVibe } from './components/OurVibe';
import { MenuPreview } from './components/MenuPreview';
import { MusicFeature } from './components/MusicFeature';
import { InstagramFeed } from './components/InstagramFeed';
import { GoogleReviews } from './components/GoogleReviews';
import { LocationsStrip } from './components/LocationsStrip';
import { CompetitionBanner } from './components/CompetitionBanner';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { ScrollAnimationObserver } from './components/ScrollAnimationObserver';

export function App() {
    return (
        <div className="min-h-screen">
            <SEO
                title="Café Crave | Halaal Café & Vinyl Music Hub in Claremont"
                description="Visit Café Crave in Claremont, Cape Town. A unique, retro-inspired halaal café with artisan coffee, vinyl records, and delicious all-day meals. Your new local hangout."
                keywords="halaal café claremont, coffee shop claremont, vinyl café cape town, halaal breakfast claremont, retro cafe"
            />
            <ScrollAnimationObserver />
            <Header />
            <main id="main-content" className="pt-16 md:pt-20">
                <Hero />
                <OurVibe />
                <MenuPreview />
                <MusicFeature />
                <GoogleReviews />
                <CompetitionBanner />
                <LocationsStrip />
                <InstagramFeed />
            </main>
            <Footer />
        </div>
    );
}