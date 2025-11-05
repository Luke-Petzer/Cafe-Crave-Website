import { MapPinIcon, PhoneIcon, ClockIcon, ArrowRightIcon } from 'lucide-react';
import { Instagram, Facebook } from 'lucide-react';

// X (Twitter) icon component
const XIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="section-animate bg-darkBg text-darkText py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              Visit Us
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              Stop by for exceptional coffee, vinyl records, and community
            </p>

            {/* Contact Info Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div>
                <MapPinIcon size={32} className="text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="opacity-80">
                  123 Coffee Street
                  <br />
                  Cityville, State 12345
                </p>
              </div>
              <div>
                <PhoneIcon size={32} className="text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <a href="tel:0735651888" className="opacity-80 hover:text-accent transition-colors">
                  073 565 1888
                </a>
              </div>
              <div>
                <ClockIcon size={32} className="text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Hours</h3>
                <p className="opacity-80">
                  Mon-Fri: 8:30 AM - 6 PM
                  <br />
                  Sat-Sun: 10 AM - 6 PM
                </p>
              </div>
            </div>

            {/* Detailed Hours */}
            <div className="mt-16 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif font-bold mb-6">Opening Hours</h3>
              <div className="bg-darkText bg-opacity-10 rounded-lg p-6 md:p-8">
                <ul className="space-y-3 text-left">
                  <li className="flex border-b border-darkText border-opacity-20 pb-2">
                    <span className="w-28 flex-shrink-0">Monday</span>
                    <span className="font-medium">10 AM – 6 PM</span>
                  </li>
                  <li className="flex border-b border-darkText border-opacity-20 pb-2">
                    <span className="w-28 flex-shrink-0">Tuesday</span>
                    <span className="font-medium">8:30 AM – 6 PM</span>
                  </li>
                  <li className="flex border-b border-darkText border-opacity-20 pb-2">
                    <span className="w-28 flex-shrink-0">Wednesday</span>
                    <span className="font-medium">8:30 AM – 6 PM</span>
                  </li>
                  <li className="flex border-b border-darkText border-opacity-20 pb-2">
                    <span className="w-28 flex-shrink-0">Thursday</span>
                    <span className="font-medium">8:30 AM – 6 PM</span>
                  </li>
                  <li className="flex border-b border-darkText border-opacity-20 pb-2">
                    <span className="w-28 flex-shrink-0">Friday</span>
                    <span className="font-medium">8:30 AM – 12 PM, 2 PM – 9 PM</span>
                  </li>
                  <li className="flex border-b border-darkText border-opacity-20 pb-2">
                    <span className="w-28 flex-shrink-0">Saturday</span>
                    <span className="font-medium">8:30 AM – 9 PM</span>
                  </li>
                  <li className="flex pb-2">
                    <span className="w-28 flex-shrink-0">Sunday</span>
                    <span className="font-medium">10 AM – 6 PM</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-darkText bg-opacity-10 text-darkText p-4 rounded-full hover:bg-accent hover:text-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-darkText bg-opacity-10 text-darkText p-4 rounded-full hover:bg-accent hover:text-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-darkText bg-opacity-10 text-darkText p-4 rounded-full hover:bg-accent hover:text-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  aria-label="Follow us on X (Twitter)"
                >
                  <XIcon size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-animate bg-darkBg text-darkText py-0">
        <div className="w-full h-[500px] md:h-[600px]">
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
      </section>

      {/* CTA Section */}
      <section className="section-animate bg-darkBg text-darkText py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Experience Crave?
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Whether you're here for the coffee, the vinyl, or the vibe, we can't wait to see you. Drop by today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://maps.google.com/?q=Café+Crave"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-opacity-90 text-light px-8 py-4 rounded-md inline-flex items-center font-medium text-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                <MapPinIcon size={22} className="mr-2" />
                Get Directions
              </a>

              <a
                href="tel:0735651888"
                className="bg-darkText bg-opacity-10 hover:bg-opacity-20 text-darkText px-8 py-4 rounded-md inline-flex items-center font-medium text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkText focus:ring-opacity-30"
              >
                <PhoneIcon size={22} className="mr-2" />
                Call Us
              </a>
            </div>

            {/* Additional CTA */}
            <div className="mt-16 pt-16 border-t border-darkText border-opacity-20">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Want to Host an Event?
              </h3>
              <p className="mb-6 opacity-80 max-w-xl mx-auto">
                Looking to book our space for a private event or collaboration? Get in touch with us!
              </p>
              <a
                href="mailto:info@cafecrave.com"
                className="inline-flex items-center text-accent hover:text-opacity-80 font-medium transition-colors"
              >
                Contact us for events
                <ArrowRightIcon size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};