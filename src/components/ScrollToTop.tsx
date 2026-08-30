import { useLayoutEffect } from 'react'; // <-- Import useLayoutEffect, not useEffect
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    // Use useLayoutEffect to run *before* the browser paints
    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            try {
                window.history.scrollRestoration = 'manual';
            } catch (e) {
                // This can throw in some environments
            }
        }

        // --- This is the fix ---
        // 1. Temporarily disable smooth scrolling for this action
        document.documentElement.style.scrollBehavior = 'auto';

        // Respect the user's reduced-motion preference: smooth scrolling
        // is an explicit JS-level behavior that ignores the CSS
        // scroll-behavior reset below, so it needs its own check.
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (hash) {
            // If there's a hash, find the element
            const id = decodeURIComponent(hash.replace('#', ''));
            const el = document.getElementById(id);
            if (el) {
                // If element exists, scroll to it (smoothly, unless reduced motion is preferred)
                el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            } else {
                // Fallback for bad hash, scroll to top instantly
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }
        } else {
            // This is a new page load, scroll to top instantly
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }

        // 2. Restore smooth scrolling after a short delay
        // This re-enables smooth scrolling for on-page hash links (like your menu)
        const timer = setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname, hash]); // This effect runs every time the path changes

    return null;
};