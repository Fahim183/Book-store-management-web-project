/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf4e7',
          100: '#fbe3c2',
          200: '#f8c97e',
          300: '#f5a623',
          400: '#e8950e',
          500: '#c97d0a',
          600: '#a66308',
        },
        dark: {
          bg: '#0f1117',
          card: '#1a1d27',
          border: '#2d3148',
          text: '#e2e8f0',
          muted: '#94a3b8',
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  }
}
