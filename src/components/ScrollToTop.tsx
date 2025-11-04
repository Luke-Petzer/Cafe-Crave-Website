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
        // FIX: Temporarily force the browser's scroll behavior to be 'auto' (instant).
        // This overrides the 'scroll-behavior: smooth' in index.css for page loads.
        document.documentElement.style.scrollBehavior = 'auto';

        if (hash) {
            const id = decodeURIComponent(hash.replace('#', ''));
            const el = document.getElementById(id);
            if (el) {
                // For hash links, use the behavior prop (which will be 'smooth' from your CSS)
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback for bad hash
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }
        } else {
            // This is a page navigation, force it to be instant
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }

        // After a short delay, restore the CSS-defined scroll behavior
        // so that any *on-page* anchor links will be smooth again.
        const timer = setTimeout(() => {
            document.documentElement.style.scrollBehavior = ''; // Reverts to CSS-defined
        }, 100); // 100ms delay

        return () => clearTimeout(timer);
    }, [pathname, hash, behavior]); // Removed 'behavior' as we now control it

    return null;
};
