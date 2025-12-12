/**
 * Newspaper Design System - Framer Motion Animations
 * "Sliding Paper" aesthetic animations for the newspaper theme
 */

import { Variants } from 'framer-motion';

export const newspaperVariants = {
  // Slide in from left (like turning a page)
  slideInLeft: {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  } as Variants,

  // Slide in from right
  slideInRight: {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as Variants,

  // Paper dropping in
  paperDrop: {
    hidden: { y: -50, opacity: 0, rotate: -2 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
      }
    }
  } as Variants,

  // Stagger container (for lists/grids)
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  } as Variants,

  // Individual stagger item
  staggerItem: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  } as Variants,

  // Fade and slight zoom (for modals/overlays)
  fadeZoom: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  } as Variants,

  // Newspaper unfolding effect
  unfold: {
    hidden: { scaleY: 0, originY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  } as Variants,

  // Ticket stub tilt (for events)
  ticketTilt: {
    hidden: { opacity: 0, rotateY: -15, scale: 0.95 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      rotateZ: 3,
      y: -8,
      transition: { duration: 0.3 }
    }
  } as Variants,
};

// Scroll-triggered animation hooks
export const scrollVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as Variants;

// Hover animations for interactive elements
export const hoverAnimations = {
  lift: {
    y: -4,
    transition: { duration: 0.2 }
  },

  scale: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },

  rotate: {
    rotate: 2,
    transition: { duration: 0.2 }
  },

  shadowGrow: {
    boxShadow: "0 10px 30px -5px rgba(35, 31, 32, 0.3)",
    transition: { duration: 0.2 }
  }
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  margin: "-100px"
};

