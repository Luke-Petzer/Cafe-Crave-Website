import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react';
import { Instagram, Facebook } from 'lucide-react';
import { SEO } from '../components/SEO';

// X (Twitter) icon component
const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const ContactPage = () => {
  return <div className="min-h-screen">
      <SEO
        title="Contact Us"
        description="Get in touch with Crave Café. Visit us in Cape Town. Open daily with Wi-Fi, board games, and exceptional coffee. Call 073 565 1888."
        keywords="café contact, Cape Town café, coffee shop location, café hours, contact café, visit café"
      />
      <Header />

      {/* Hero Section - DARK */}
      <section className="section-dark relative min-h-[600px] md:min-h-[650px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Cafe interior"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Rockwell',serif] font-bold mb-4">
            Find Us
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Stop by for great coffee, music, and community
          </p>
        </div>
      </section>

      {/* Contact Section - DARK */}
      <section className="section-dark py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">

          {/* Find Us Section */}
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
                        123 Coffee Street
                        <br />
                        Cityville, State 12345
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
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-darkBg text-darkText p-3 rounded-full hover:bg-accent hover:text-light transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
                        <Instagram size={20} />
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-darkBg text-darkText p-3 rounded-full hover:bg-accent hover:text-light transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
                        <Facebook size={20} />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-darkBg text-darkText p-3 rounded-full hover:bg-accent hover:text-light transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
                        <XIcon size={20} />
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
                className="bg-accent hover:bg-opacity-90 text-light px-8 py-3 rounded-md inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                <MapPinIcon size={20} className="mr-2" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
