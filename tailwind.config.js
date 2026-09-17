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
  plugins: [],
}