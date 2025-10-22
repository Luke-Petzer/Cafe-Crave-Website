import { useEffect, useState } from 'react';
import { MenuIcon, XIcon, MusicIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  return <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-primary shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-2xl md:text-3xl font-['Rockwell',serif] font-bold" aria-label="Cafe Crave - Home">
              <MusicIcon size={28} className="text-secondary mr-2" />
              <span className="text-light">
                Cafe<span className="text-secondary">Crave</span>
              </span>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 rounded-md p-1 z-50 relative" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Main Navigation">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className={`text-light hover:text-secondary transition-colors ${location.pathname === '/' ? 'text-secondary font-medium' : ''}`} aria-current={location.pathname === '/' ? 'page' : undefined}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-light hover:text-secondary transition-colors ${location.pathname === '/about' ? 'text-secondary font-medium' : ''}`} aria-current={location.pathname === '/about' ? 'page' : undefined}>
                  Our Vibe
                </Link>
              </li>
              <li>
                <Link to="/menu" className={`text-light hover:text-secondary transition-colors ${location.pathname === '/menu' ? 'text-secondary font-medium' : ''}`} aria-current={location.pathname === '/menu' ? 'page' : undefined}>
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/events" className={`text-light hover:text-secondary transition-colors ${location.pathname === '/events' ? 'text-secondary font-medium' : ''}`} aria-current={location.pathname === '/events' ? 'page' : undefined}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`text-light hover:text-secondary transition-colors ${location.pathname === '/contact' ? 'text-secondary font-medium' : ''}`} aria-current={location.pathname === '/contact' ? 'page' : undefined}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Mobile Navigation Overlay */}
        {isMenuOpen && <div id="mobile-menu" className="fixed inset-0 bg-primary z-40 md:hidden flex flex-col items-center justify-center animate-fade-in">
            <div className="text-center mb-8">
              <span className="text-3xl font-['Rockwell',serif] font-bold text-light">
                Cafe<span className="text-secondary">Crave</span>
              </span>
            </div>
            <ul className="flex flex-col items-center space-y-6">
              <li>
                <Link to="/" className={`text-3xl text-light hover:text-secondary transition-colors ${location.pathname === '/' ? 'text-secondary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)} aria-current={location.pathname === '/' ? 'page' : undefined}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-3xl text-light hover:text-secondary transition-colors ${location.pathname === '/about' ? 'text-secondary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)} aria-current={location.pathname === '/about' ? 'page' : undefined}>
                  Our Vibe
                </Link>
              </li>
              <li>
                <Link to="/menu" className={`text-3xl text-light hover:text-secondary transition-colors ${location.pathname === '/menu' ? 'text-secondary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)} aria-current={location.pathname === '/menu' ? 'page' : undefined}>
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/events" className={`text-3xl text-light hover:text-secondary transition-colors ${location.pathname === '/events' ? 'text-secondary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)} aria-current={location.pathname === '/events' ? 'page' : undefined}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`text-3xl text-light hover:text-secondary transition-colors ${location.pathname === '/contact' ? 'text-secondary font-medium' : ''}`} onClick={() => setIsMenuOpen(false)} aria-current={location.pathname === '/contact' ? 'page' : undefined}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>}
      </header>
    </>;
};