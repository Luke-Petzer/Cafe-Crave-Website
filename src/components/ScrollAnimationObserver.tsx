import React, { useEffect } from 'react';
export const ScrollAnimationObserver: React.FC = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // If reduced motion is preferred, make all elements visible immediately
      document.querySelectorAll('.scroll-animate').forEach(element => {
        element.classList.add('visible');
      });
      return;
    }
    // Set up the Intersection Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once the animation has played, no need to observe this element anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Slightly offset to trigger before the element is fully in view
    });
    // Observe all elements with the scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
      observer.observe(element);
    });
    // Clean up
    return () => {
      document.querySelectorAll('.scroll-animate').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  return null;
};