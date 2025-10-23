import React, { useEffect } from 'react';

export const ScrollAnimationObserver: React.FC = () => {
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

    // Set up a lightweight Intersection Observer for sections only
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

    sections.forEach(section => {
      // FIX: Check if section is already in viewport (handles browser back navigation)
      // This ensures sections are immediately visible when navigating back
      const rect = section.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Section is already visible, add class immediately
        section.classList.add('section-visible');
      } else {
        // Section not yet visible, observe it
        observer.observe(section);
      }
    });

    // Clean up
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return null;
};