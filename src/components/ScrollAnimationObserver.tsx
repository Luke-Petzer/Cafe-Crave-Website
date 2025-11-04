import { useEffect } from 'react';

// This component sets up scroll-based animations for sections
export const ScrollAnimationObserver = () => {
    useEffect(() => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // If reduced motion is preferred, make all sections visible immediately
            document.querySelectorAll('.section-animate').forEach(element => {
                element.classList.add('section-visible');
            });
            return;
        }

        // Set up IntersectionObserver - it handles all viewport checks natively
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                        // Once animated, stop observing for better performance
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15, // Trigger when 15% of section is visible
                rootMargin: '0px 0px -100px 0px' // Trigger slightly before section enters view
            }
        );

        // Observe all sections with the section-animate class
        const sections = document.querySelectorAll('.section-animate');
        sections.forEach(section => observer.observe(section));

        // Cleanup function - remove classes and disconnect observer
        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
                // Remove section-visible class on unmount to prevent stale state
                section.classList.remove('section-visible');
            });
            observer.disconnect();
        };
    }, []); // Empty dependency array - only run once on mount

    return null;
};
