import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BookIcon, MusicIcon, CoffeeIcon, UsersIcon } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';
// Import About page images
import boardGamesImg from '../assets/board-games.webp';
import coffeeImg from '../assets/cuppacino.webp';
import redVelvetImg from '../assets/red-velvet.webp';
import vinylRecordsImg from '../assets/vinyl-records.webp';
export const About = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Our Story"
        description="Discover the story behind Crave Café. A retro-inspired community space in Cape Town where coffee culture meets vinyl records and board games. Learn about our values and mission."
        keywords="about café, café story, Cape Town coffee culture, community café, retro café, café values, local café"
      />
      <ScrollAnimationObserver />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
      {/* Section 1: Hero - "Our Story" - DARK */}
      <section className="section-dark relative min-h-[600px] md:min-h-[650px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden animate-hero-zoom">
          <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Cafe Crave interior" className="w-full h-full object-cover brightness-50" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Coffee, Community, and a Retro Beat.
          </p>
          <a href="/contact" className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center justify-center font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 will-change-transform">
            <BookIcon size={20} className="mr-2" />
            Contact Us
          </a>
        </div>
      </section>
      {/* Section 2: Community & Atmosphere - "Stay Awhile" */}
      <section className="section-animate section-light py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Stay Awhile
              </h2>
              <p className="font-medium opacity-90 text-lg mb-6">
                At Cafe Crave, we believe in creating spaces where people can
                connect, relax, and feel at home. Our cafe isn't just about
                great coffee—it's about the moments you share while enjoying it.
              </p>
              <p className=" font-medium opacity-90 text-lg mb-6">
                With cozy booths, comfortable seating, and a collection of over
                50 board games, we've designed our space to be family-friendly
                and welcoming to all. Whether you're meeting friends, working
                remotely, or just enjoying some quiet time, we've got a spot for
                you.
              </p>
              <div className="flex items-center">
                <UsersIcon size={24} className="text-accent mr-2" />
                <span className="font-medium">
                  Everyone is welcome at our table
                </span>
              </div>
            </div>
            <div className="order-first md:order-last">
              <img src={boardGamesImg} alt="People enjoying board games" className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Section 3: Coffee & Food Philosophy - "The Good Stuff" */}
      <section className="section-animate section-red py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            The Good Stuff
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex items-center mb-6">
                <CoffeeIcon size={28} className="text-light mr-3" />
                <h3 className="text-2xl font-serif font-bold">
                  Crafted with Care
                </h3>
              </div>
              <p className="font-medium text-lg mb-6">
                We source our coffee beans from ethical, sustainable farms and
                roast them locally to ensure the freshest cup possible. Our
                baristas are trained to perfect their craft, creating not just
                drinks, but experiences.
              </p>
              <p className=" font-medium text-lg">
                Our kitchen creates fresh pastries and light meals daily, using
                locally-sourced ingredients whenever possible. We believe good
                food, like good coffee, should be made with intention and care.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={coffeeImg} alt="Latte art" className="rounded-lg w-full h-full object-cover shadow-md" />
              <img src={redVelvetImg} alt="Freshly baked pastries" className="rounded-lg w-full h-full object-cover shadow-md" />
            </div>
          </div>
        </div>
      </section>
      {/* Section 4: Music Identity - "On the Turntable" */}
      <section className="section-animate section-dark py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img src={vinylRecordsImg} alt="Vinyl records" className="rounded-lg shadow-xl w-full h-[300px] object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                On the Turntable
              </h2>
              <p className="font-medium opacity-90 text-lg mb-6">
                Music is the heartbeat of Cafe Crave. We're always spinning
                something special, from classics to deep cuts, creating a
                soundtrack for your visit that's as carefully curated as our
                coffee menu.
              </p>
              <p className="font-medium opacity-90 text-lg mb-8">
                Our vinyl collection spans decades and genres, reflecting our
                love for the warm, authentic sound that only records can
                provide—much like the authentic experience we strive to create
                in every other aspect of our cafe.
              </p>
              <a href="/music" className="inline-flex items-center justify-center bg-accent text-light px-6 py-2 rounded-md hover:bg-opacity-90 transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 will-change-transform">
                <MusicIcon size={20} className="mr-2" />
                See What's Playing
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Section 5: Booking Callout */}
      <section id="booking" className="section-light py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Visit?
            </h2>
            <p className="text-lg mb-8">
              Reserve your table now and join us for coffee, conversation, and
              community.
            </p>
            <a href="/contact" className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center justify-center font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 will-change-transform">
              <BookIcon size={20} className="mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};
