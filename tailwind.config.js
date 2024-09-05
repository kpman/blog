/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#33a6b8',
          600: '#2a8998',
        },
      },
    },
    screens: {
      lg: '1040px',
    },
  },
  plugins: [],
};
