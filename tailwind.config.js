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
        // Vintage Eclectic Design System
        'dark-walnut': '#2B1F1A',
        'aged-paper': '#FDF5E6',
        'newsprint': '#F5EBD8',
        'ink-black': '#1A1512',
        'sepia-tone': '#704214',
        'vintage-cream': '#FFF8E7',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}