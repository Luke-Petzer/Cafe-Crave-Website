import plugin from 'tailwindcss/plugin';

export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: "#322C2B",
        secondary: "#83513F",
        accent: "#803D3B",
        light: "#F7F3EE",
        subtextLightBg: "#5A372B",
        subtextDarkBg: "#BFA6A0",
        // New standardized section colors
        lightBg: '#F7F3EE',
        lightText: '#5A372B',
        redBg: '#83513F',
        redText: '#F7F3EE',
        darkBg: '#322C2B',
        darkText: '#F7F3EE',
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      // Display-type scale for plain page-title H1s (apple-design §15: tracking
      // is size-specific, never one fixed value). Same rem values as Tailwind's
      // built-in 5xl/6xl/7xl so no size changes — new key names so this never
      // touches the Menu page's own tracking-wide masthead H1, which also uses
      // text-5xl/6xl/7xl but is an intentionally exempt design choice.
      fontSize: {
        'display-sm': ['3rem', { letterSpacing: '-0.02em' }],    // 48px
        'display-md': ['3.75rem', { letterSpacing: '-0.025em' }], // 60px
        'display-lg': ['4.5rem', { letterSpacing: '-0.03em' }],   // 72px
      },
      // Motion tokens (improve-animations AUDIT.md §2, §7) — mirrors the CSS
      // custom properties in src/index.css so components can use either form.
      transitionTimingFunction: {
        'out-strong': 'var(--ease-out)',
        'in-out-strong': 'var(--ease-in-out)',
        drawer: 'var(--ease-drawer)',
      },
      transitionDuration: {
        press: '140ms',
        hover: '200ms',
        panel: '220ms',
        drawer: '300ms',
      },
    },
  },
  plugins: [
    // AUDIT §6 / finding 6.3: touch fires false hovers on tap, and this site
    // had zero (hover: hover) guards anywhere. Rather than gate Tailwind's
    // built-in hover:/group-hover: variants everywhere (which would also
    // touch the :active press feedback and focus states added in 3.1), new
    // hh:/group-hh: variants apply ONLY where the audit flagged latching
    // hover effects on cards/images touched on a phone.
    plugin(function ({ addVariant }) {
      addVariant('hh', '@media (hover: hover) and (pointer: fine) { &:hover }');
      addVariant('group-hh', '@media (hover: hover) and (pointer: fine) { .group:hover & }');
    }),
  ],
}