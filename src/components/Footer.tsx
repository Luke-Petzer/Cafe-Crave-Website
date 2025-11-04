import { Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="section-dark py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif font-bold mb-4">
              <span style={{
                background: 'linear-gradient(135deg, #f3ecd5 0%, #E9D8C4 50%, #f3ecd5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(243, 236, 213, 0.4))'
              }}>
                Cafe Crave
              </span>
            </h2>
            <p className="opacity-80 text-sm leading-relaxed mb-6">
              A place to connect, play, and celebrate together.
            </p>
            <div className="space-y-2">
              <p className="opacity-80 text-sm font-medium">Get in Touch</p>
              <a
                href="tel:+27735651888"
                className="block accent-light hover:text-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded text-sm"
              >
                073 565 1888
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded inline-block"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded inline-block"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/music"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded inline-block"
                >
                  Music Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <p className="text-sm opacity-80 mb-4 leading-relaxed">
              Stay connected for updates, events, and special offers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/cafecrave_halal/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-light bg-opacity-10 hover:bg-accent text-light p-3 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/cafecravekenilworth"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-light bg-opacity-10 hover:bg-accent text-light p-3 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light border-opacity-20 pt-8">
          {/*<div className="flex flex-col md:flex-row justify-between items-center gap-4">*/}
          {/*  <p className="text-light opacity-70 text-sm">*/}
          {/*    &copy; {new Date().getFullYear()} Cafe Crave. All rights reserved.*/}
          {/*  </p>*/}
          {/*  <div className="flex gap-6 text-sm opacity-70">*/}
          {/*    <a href="#" className="hover:text-accent hover:opacity-100 transition-colors">*/}
          {/*      Privacy Policy*/}
          {/*    </a>*/}
          {/*    <a href="#" className="hover:text-accent hover:opacity-100 transition-colors">*/}
          {/*      Terms of Service*/}
          {/*    </a>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* Developer Credit */}
          <div className="text-center text-sm text-light opacity-50 mt-6">
            Developed by{' '}
            <a
              href="https://lpwebstudio.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 transition-opacity"
            >
              LP Web Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};