/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gray: '#4f5759',
      blue: '#33a6b8',
      'dark-gray': '#222',
    },
    screens: {
      lg: '1040px',
    },
    extend: {},
  },
  plugins: [],
};
