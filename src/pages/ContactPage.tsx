import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollAnimationObserver } from '../components/ScrollAnimationObserver';

// Custom icon components
const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const WhatsAppIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact & Visit Us | Crave Café Claremont, Cape Town"
        description="Find Crave Café at 219 Imam Haron Rd, Claremont. Call 073 565 1888, get directions, or check our hours. Your new favourite halal café is waiting."
        keywords="contact crave cafe, crave cafe address, halal cafe claremont location, cafe near me claremont"
        schema={{
          "@context": "https://schema.org",
          "@type": "Cafe",
          "name": "Crave Café",
          "description": "A retro, music-inspired, halal-friendly café in Claremont, Cape Town.",
          "url": "https://www.cafecravecpt.co.za",
          "telephone": "+27735651888",
          "priceRange": "R",
          "servesCuisine": ["Café", "Halal"],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "219 Imam Haron Rd",
            "addressLocality": "Claremont",
            "addressRegion": "Cape Town",
            "postalCode": "7708",
            "addressCountry": "ZA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -33.983624,
            "longitude": 18.481859
          },
          "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "10:00", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "08:30", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "08:30", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "08:30", "closes": "18:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "08:30", "closes": "12:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "14:00", "closes": "21:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:30", "closes": "21:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "18:00" }
          ],
          "potentialAction": {
            "@type": "ViewAction",
            "target": "https://www.cafecravecpt.co.za/menu"
          }
        }}
      />
      <ScrollAnimationObserver />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
      {/* Hero Section - DARK */}
      <section className="section-dark relative min-h-[600px] md:min-h-[650px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 animate-hero-zoom">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Cafe interior"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            Contact & Visit Crave Café
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Stop by for great coffee, music, and community
          </p>
        </div>
      </section>

      {/* Contact Section - DARK */}
      <section className="section-animate section-dark py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div id="contact">
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
              <div className="bg-lightBg p-6 md:p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-lightText mb-6">
                  Contact & Hours
                </h2>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start">
                    <MapPinIcon size={24} className="text-accent mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lightText mb-1">Address</h3>
                      <p className="text-lightText opacity-80">
                          219 Imam Haron Rd, Claremont
                        <br />
                          Cape Town, 7708
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <PhoneIcon size={24} className="text-accent mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lightText mb-1">Phone</h3>
                      <p className="text-lightText opacity-80">073 565 1888</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <WhatsAppIcon size={24} className="text-accent mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lightText mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/27735651888?text=Hi%20Crave%20Café!%20I'd%20like%20to%20know%20more%20about..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline transition-colors font-medium"
                      >
                        073 565 1888
                      </a>
                      <p className="text-lightText opacity-60 text-sm mt-1">
                        Chat with us directly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ClockIcon size={24} className="text-accent mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lightText mb-1">Hours</h3>
                      <ul className="text-lightText opacity-80 space-y-1 text-sm md:text-base">
                        <li className="flex justify-between">
                          <span>Monday:</span>
                          <span>10 am–6 pm</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Tuesday:</span>
                          <span>8:30 am–6 pm</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Wednesday:</span>
                          <span>8:30 am–6 pm</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Thursday:</span>
                          <span>8:30 am–6 pm</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Friday:</span>
                          <span>8:30 am–12 pm, 2–9 pm</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Saturday:</span>
                          <span>8:30 am–9 pm</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sunday:</span>
                          <span>10 am–6 pm</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="font-medium text-lightText mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.instagram.com/cafecrave_halal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-darkBg text-darkText p-3 rounded-full hover:bg-accent hover:text-light transition-all duration-200 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                        aria-label="Follow us on Instagram"
                      >
                        <InstagramIcon size={20} />
                      </a>
                      <a
                        href="https://www.facebook.com/cafecravekenilworth/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-darkBg text-darkText p-3 rounded-full hover:bg-accent hover:text-light transition-all duration-200 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                        aria-label="Follow us on Facebook"
                      >
                        <FacebookIcon size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-80 md:h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.965631229076!2d18.481858899999995!3d-33.9836241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc43940b24aab7%3A0x910b69a2e9e61db3!2sCaf%C3%A9%20Crave!5e1!3m2!1sen!2sza!4v1759685841467!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cafe Crave location"
                />
              </div>
            </div>

            <div className="text-center mt-10 md:mt-12">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center justify-center font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 will-change-transform"
              >
                <MapPinIcon size={20} className="mr-2" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/27735651888?text=Hi%20Crave%20Café!%20I'd%20like%20to%20know%20more%20about..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-opacity-50"
        style={{ animation: 'subtlePulse 3s ease-in-out infinite' }}
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon size={32} />
      </a>

      </main>
      <Footer />
    </div>
  );
};

