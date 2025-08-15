/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fef7f0',
          100: '#fdecd6',
          200: '#fbd5ad',
          300: '#f8b77a',
          400: '#f59347',
          500: '#f27524',
          600: '#e35a1a',
          700: '#bc4418',
          800: '#96371a',
          900: '#7a2f19',
        },
        cream: {
          50: '#fefefe',
          100: '#fdfcfb',
          200: '#faf7f4',
          300: '#f5f0ea',
          400: '#ede4d9',
          500: '#e2d4c3',
          600: '#d1c0a8',
          700: '#b8a588',
          800: '#9c8b6e',
          900: '#7f735c',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
