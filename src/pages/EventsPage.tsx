import { motion } from 'framer-motion';
import Masthead from '../components/Masthead';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { GoogleReviews } from '../components/GoogleReviews';
import { TornEdge } from '../components/NewspaperComponents';
import { eventsData } from '../data/eventsData';
import { CheckCircleIcon } from 'lucide-react';

export const EventsPage = () => {
  return (
    <div className="min-h-screen bg-grain font-body">
      <SEO
        title="The Notice Board | Events at Crave Café"
        description="Join us for live music, vinyl nights, board game tournaments, and community gatherings. Host your event at Crave Café in Claremont."
        keywords="events claremont cafe, live music cape town, vinyl nights, community events, venue hire claremont"
      />
      <Masthead />

      <main id="main-content">
        {/* SECTION 1: The Headline */}
        <div className="bg-paper pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block font-accent text-rust tracking-[0.3em] uppercase text-sm border-b-2 border-rust pb-1 mb-6">
              Community Board
            </span>
            <h1 className="font-headline text-6xl md:text-8xl text-ink mb-6">
              THE NOTICE BOARD
            </h1>
            <p className="font-body text-lg md:text-xl text-ink/60 italic max-w-2xl mx-auto">
              "Where community meets culture — mark your calendar for music, games, and gatherings."
            </p>
          </div>
        </div>

        <TornEdge />

        {/* SECTION 2: The Gig Guide (Ticket Stub Events) */}
        <div className="bg-paper py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            {eventsData.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col md:flex-row bg-paper border-2 border-ink shadow-newspaper hover:shadow-polaroid transition-all duration-300"
              >
                {/* The "Perforated" Line (Visual Trick) */}
                <div className="hidden md:block absolute left-32 top-0 bottom-0 border-l-2 border-dashed border-ink/30 z-10"></div>

                {/* Date "Stamp" (Left Side) */}
                <div className="w-full md:w-32 bg-ink text-paper p-6 flex flex-col items-center justify-center text-center group-hover:bg-rust transition-colors">
                  <span className="font-accent text-3xl tracking-widest">{event.month}</span>
                  <span className="font-headline text-5xl font-bold">{event.date}</span>
                </div>

                {/* Event Details (Middle) */}
                <div className="flex-grow p-6 md:pl-10 flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                    <h3 className="font-headline text-3xl font-bold leading-tight">{event.title}</h3>
                    <span className="font-typewriter text-xs border border-ink px-3 py-1 rounded-full whitespace-nowrap self-start">
                      {event.time}
                    </span>
                  </div>
                  <p className="font-body text-ink/70 italic mb-4 leading-relaxed">{event.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="font-accent text-rust text-sm tracking-widest uppercase">{event.price}</span>
                  </div>
                </div>

                {/* "Admit One" Button (Right) */}
                <div className="p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-ink/10 bg-washed-brown/10">
                  <a
                    href={`https://wa.me/27662386374?text=Hi%20Crave%20Café!%20I'd%20like%20to%20RSVP%20for%20${encodeURIComponent(event.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-accent uppercase tracking-widest text-sm border-2 border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors whitespace-nowrap"
                  >
                    RSVP NOW
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <TornEdge />

        {/* SECTION 3: Host Your Event (Simplified Newspaper Style) */}
        <section className="bg-espresso text-paper py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="inline-block font-accent text-rust tracking-[0.3em] uppercase text-sm border-b-2 border-rust pb-1 mb-6">
              Private Hire
            </span>
            <h2 className="font-headline text-5xl md:text-6xl mb-6">
              HOST YOUR EVENT
            </h2>
            <div className="w-24 h-1 bg-rust mx-auto mb-8"></div>
            <p className="font-body text-lg text-paper/80 mb-12 italic max-w-2xl mx-auto">
              "From soulful acoustic sessions to cozy celebrations — Crave Café is where great coffee, good music, and real connections come together."
            </p>

            {/* Simple feature list in newspaper style */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 text-left max-w-2xl mx-auto">
              <div className="flex items-start">
                <CheckCircleIcon size={20} className="text-rust mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-accent text-sm tracking-widest uppercase text-paper mb-1">Flexible Space</h4>
                  <p className="font-body text-sm text-paper/70">Space that fits your crowd — intimate or buzzing, we'll make it work.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon size={20} className="text-rust mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-accent text-sm tracking-widest uppercase text-paper mb-1">Sound System</h4>
                  <p className="font-body text-sm text-paper/70">Great acoustics, great tunes — our setup's built for music and memories.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon size={20} className="text-rust mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-accent text-sm tracking-widest uppercase text-paper mb-1">Catering Available</h4>
                  <p className="font-body text-sm text-paper/70">From espresso bars to gourmet bites — let our kitchen keep your guests smiling.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon size={20} className="text-rust mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-accent text-sm tracking-widest uppercase text-paper mb-1">Unique Atmosphere</h4>
                  <p className="font-body text-sm text-paper/70">Retro décor, vinyl vibes, and the warm hum of conversation — Crave's got soul.</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27662386374?text=Hi%20Crave%20Café!%20I'd%20like%20to%20book%20your%20space%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rust text-paper px-8 py-4 font-accent uppercase tracking-widest hover:bg-rust/90 transition-colors inline-flex items-center gap-2 shadow-newspaper hover:shadow-polaroid"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Book the Space
            </a>
          </div>
        </section>

        <TornEdge />

        {/* SECTION 4: Google Reviews (UNCHANGED - Keep existing backend) */}
        <section className="bg-paper py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <GoogleReviews standalone={false} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
