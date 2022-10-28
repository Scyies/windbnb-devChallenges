/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: {
        200: '#f2f2f2',
        100: '#ffffff',
      },
      red: {
        500: '#EB5757',
      },
      gray: {
        700: '#333333',
        500: '#4F4F4F',
        400: '#828282',
        200: '#bdbdbd',
      },
    },
    fontFamily: {
      poppins: 'Poppins, sans-serif',
      mulish: 'Mulish, sans-serif',
      montserrat: 'Monserrat, sans-serif',
    },
    extend: {
      boxShadow: {
        search: '0px 1px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
