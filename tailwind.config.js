const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      colors: {
        gray: {
          200: 'F0F0F0',
          300: 'B9B9B9',
          600: '2D2D2D',
        },
      },
    },
  },
  plugins: [],
};
