/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Roboto Slab"', 'serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2B',
          light: '#FF8F66',
        },
        neutral: {
          dark: '#0A0A0A',
          mid: '#111111',
          card: '#141414',
        },
        text: {
          main: '#F5F5F5',
          body: '#BDBDBD',
          secondary: '#757575',
        },
      },
    },
  },
  plugins: [],
}
