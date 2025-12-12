/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Newspaper Design System (Primary)
        paper: '#FDFBF7',        // Warm newsprint
        ink: '#231F20',          // Soft charcoal text
        rust: '#8B2E2E',         // Accent red (Stamps/Highlights)
        espresso: '#1A1614',     // Dark footer/sections
        'washed-brown': '#DCCfc6', // Borders/Lines

        // Legacy colors (kept for backward compatibility)
        primary: "#322C2B",
        secondary: "#83513F",
        accent: "#803D3B",
        light: "#F7F3EE",
        subtextLightBg: "#5A372B",
        subtextDarkBg: "#BFA6A0",
        lightBg: '#F7F3EE',
        lightText: '#5A372B',
        redBg: '#83513F',
        redText: '#F7F3EE',
        darkBg: '#322C2B',
        darkText: '#F7F3EE',
        'dark-walnut': '#2B1F1A',
        'aged-paper': '#FDF5E6',
        'newsprint': '#F5EBD8',
        'ink-black': '#1A1512',
        'sepia-tone': '#704214',
        'vintage-cream': '#FFF8E7',
      },
      fontFamily: {
        // Newspaper Design System
        headline: ['"Playfair Display"', 'serif'],
        body: ['"Lora"', 'serif'],
        accent: ['"Oswald"', 'sans-serif'],
        typewriter: ['"Courier New"', 'Courier', 'monospace'], // System font for reviews

        // Legacy fonts
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}