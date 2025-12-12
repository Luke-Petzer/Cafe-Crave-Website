import Masthead from './components/Masthead';
import HeroSection from './components/HeroSection';
import { OurVibe } from './components/OurVibe';
import { MenuPreview } from './components/MenuPreview';
import { VinylSection } from './components/VinylSection';
import { InstagramFeed } from './components/InstagramFeed';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { ScrollAnimationObserver } from './components/ScrollAnimationObserver';
import { TornEdge } from './components/NewspaperComponents';

export function App() {
    return (
        <div className="min-h-screen bg-grain font-body">
            <SEO
                title="Crave Café | Halaal Café & Vinyl Music Hub in Claremont"
                description="Visit Crave Café in Claremont, Cape Town. A unique, retro-inspired halaal café with artisan coffee, vinyl records, and delicious all-day meals. Your new local hangout."
                keywords="halaal café claremont, coffee shop claremont, vinyl café cape town, halaal breakfast claremont, retro cafe"
            />
            <ScrollAnimationObserver />
            <Masthead />
            <main id="main-content" className="relative-content">
                <HeroSection />
                <TornEdge />
                <OurVibe />
                <TornEdge />
                <MenuPreview />
                <TornEdge />
                <VinylSection />
                <TornEdge />
                <TestimonialsSection />
                <TornEdge />
                <InstagramFeed />
            </main>
            <Footer />
        </div>
    );
}