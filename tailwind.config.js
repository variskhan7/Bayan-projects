/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#102A43',
          dark: '#0b1d30',
          light: '#243B53',
        },
        corporate: {
          DEFAULT: '#1769AA',
          dark: '#0f4c7a',
          light: '#2196F3',
        },
        accent: {
          DEFAULT: '#E99A36',
          hover: '#d48828',
          light: '#f5b056',
        },
        'light-bg': '#F4F7FA',
        'dark-text': '#243B53',
        'secondary-text': '#627D98',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

