import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { EventPreview } from '../components/EventPreview';
import { GoogleReviews } from '../components/GoogleReviews';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';
import { CalendarIcon, MusicIcon, UsersIcon, CoffeeIcon, ArrowRightIcon, CheckCircleIcon, MailIcon } from 'lucide-react';

export const EventsPage = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      <SEO
        title="Events"
        description="Join us for exciting events at Crave Café. Live music, community gatherings, and special occasions in Cape Town."
        keywords="café events, live music, community events, Cape Town events, café gatherings"
      />
      <ScrollAnimationObserver />
      <Header />
      <main>
        {/* Hero Section - Image Hero */}
        <section id="main-content" className="relative min-h-[600px] md:min-h-[650px] flex items-center justify-center overflow-hidden pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/assets/woman-with-cappuccino-cup-wooden-table.jpg)' }}
          >
            <div className="absolute inset-0 bg-darkBg bg-opacity-50"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16">
            <div className="max-w-4xl mx-auto text-center text-darkText">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-['Rockwell',serif] font-bold mb-6 scroll-animate">
                Events at Crave
              </h1>
              <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
              <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 scroll-animate">
                Where community meets culture. Join us for live music, vinyl nights, board game tournaments, and unforgettable experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center scroll-animate">
                <a
                  href="#upcoming"
                  className="bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md inline-flex items-center font-medium text-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                >
                  <CalendarIcon size={22} className="mr-2" />
                  View Upcoming Events
                </a>
                <a
                  href="#host"
                  className="bg-darkText bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-darkText px-8 py-4 rounded-md inline-flex items-center font-medium text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkText focus:ring-opacity-50"
                >
                  Host Your Event
                  <ArrowRightIcon size={22} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - lightBg */}
        <section className="section-light text-lightText py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-4">
                What We Offer
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="opacity-90 max-w-2xl mx-auto text-lg">
                From intimate acoustic sessions to community gatherings, we create memorable experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="text-center scroll-animate">
                <div className="bg-redText bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MusicIcon size={36} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Live Music</h3>
                <p className="opacity-80">
                  Intimate performances featuring local artists, jazz nights, and vinyl listening sessions
                </p>
              </div>

              <div className="text-center scroll-animate">
                <div className="bg-redText bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UsersIcon size={36} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Events</h3>
                <p className="opacity-80">
                  Board game nights, book clubs, trivia contests, and social gatherings
                </p>
              </div>

              <div className="text-center scroll-animate">
                <div className="bg-redText bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CoffeeIcon size={36} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Coffee Workshops</h3>
                <p className="opacity-80">
                  Learn from our baristas about brewing techniques, latte art, and coffee culture
                </p>
              </div>

              <div className="text-center scroll-animate">
                <div className="bg-redText bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon size={36} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Private Events</h3>
                <p className="opacity-80">
                  Book our space for birthdays, meetings, product launches, and celebrations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Host Your Event Section - redBg */}
        <section id="host" className="bg-redBg text-redText py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="scroll-animate">
                  <h2 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-6">
                    Host Your Event at Crave
                  </h2>
                  <div className="w-24 h-1 bg-accent mb-8"></div>
                  <p className="text-lg mb-8 opacity-90">
                      From soulful acoustic sessions to cozy celebrations — Crave Café is where great coffee, good music, and real connections come together. Bring your people, and we’ll bring the vibe.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <CheckCircleIcon size={24} className="text-light mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Flexible Space</h4>
                        <p className="opacity-90">ASpace that fits your crowd — intimate or buzzing, we’ll make it work.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon size={24} className="text-light mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Sound System</h4>
                        <p className="opacity-90">Great acoustics, great tunes — our setup’s built for music and memories.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon size={24} className="text-light mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Catering Available</h4>
                        <p className="opacity-90">Crom espresso bars to gourmet bites — let our kitchen keep your guests smiling.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon size={24} className="text-light mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Unique Atmosphere</h4>
                        <p className="opacity-90">Retro décor, vinyl vibes, and the warm hum of conversation — Crave’s got soul.</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="mailto:events@cafecrave.com"
                    className="bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md inline-flex items-center font-medium text-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  >
                    <MailIcon size={22} className="mr-2" />
                      Book the Space
                  </a>
                </div>

                <div className="scroll-animate">
                  <div className="bg-darkText bg-opacity-10 rounded-lg p-8">
                    <h3 className="text-2xl font-serif font-bold mb-6">Perfect For:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                          Birthday Parties & Private Celebrations
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        Game nights & Book Clubs
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                          Community Gatherings & Markets
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        Art Exhibitions & Pop-ups
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        Live Music & Performances
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        Community Gatherings
                      </li>
                    </ul>

                    <div className="mt-8 pt-8 border-t border-darkText border-opacity-20">
                      <h4 className="font-semibold mb-3">Availability</h4>
                      <p className="opacity-80 mb-2">Evenings & Weekends</p>
                      <p className="text-sm opacity-70">Contact us for weekday availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section - darkBg */}
        <section id="upcoming" className="bg-darkBg text-darkText py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-4">
                Upcoming Events
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="opacity-80 max-w-2xl mx-auto text-lg">
                Join us for live music, community gatherings, and special occasions
              </p>
            </div>
            <EventPreview showHeader={false} showViewAllButton={false} />
          </div>
        </section>

        {/* Reviews Section - lightBg */}
        <section className="section-light text-lightText py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <GoogleReviews standalone={false} />
          </div>
        </section>

        {/* CTA Section - redBg */}
        <section className="bg-redBg text-redText py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="max-w-4xl mx-auto text-center scroll-animate">
              <h2 className="text-4xl md:text-5xl font-['Rockwell',serif] font-bold mb-6">
                Never Miss an Event
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
              <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
                Follow us on social media to stay updated on all our upcoming events, special performances, and community gatherings.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.instagram.com/cafecrave_halal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md inline-flex items-center font-medium text-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                >
                  Follow Us on Instagram
                  <ArrowRightIcon size={22} className="ml-2" />
                </a>

                <a
                  href="#host"
                  className="bg-darkText bg-opacity-10 hover:bg-opacity-20 text-darkText px-8 py-4 rounded-md inline-flex items-center font-medium text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkText focus:ring-opacity-30"
                >
                  <CalendarIcon size={22} className="mr-2" />
                  Host Your Event
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
