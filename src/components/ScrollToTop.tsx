import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ScrollToTopProps = {
  behavior?: ScrollBehavior; // 'auto' | 'smooth'
};

export const ScrollToTop = ({ behavior = 'auto' }: ScrollToTopProps) => {
  const { pathname, hash } = useLocation();

  // Ensure browser doesn't restore scroll automatically (run once)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {
        // ignore (some browsers/environments may throw)
      }
    }
  }, []);

  // Scroll on route change or when hash changes
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace('#', ''));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior });
        return;
      }
    }

    // fallback: go to top of document
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash, behavior]);

  return null;
};

