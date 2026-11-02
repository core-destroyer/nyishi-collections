/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf8f0',
          100: '#f5edd9',
          200: '#ebd9b0',
          300: '#dfbe7d',
          400: '#d4a654',
          500: '#c59135',
          600: '#ad7629',
          700: '#8b5723',
          800: '#724622',
          900: '#5f3a20',
          brand: '#C5A059',
          dark: '#916f34'
        },
        sand: {
          50: '#fdfbf9',
          100: '#faf6f0',
          200: '#f3ece2',
          300: '#e8dcce',
          400: '#d9c6b1',
        },
        charcoal: {
          900: '#151311',
          800: '#231f1c',
          700: '#38322e',
          600: '#524b45',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
