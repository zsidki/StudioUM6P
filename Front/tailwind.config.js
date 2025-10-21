/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-red': '#D4451E', // Custom red color
        'custom-red-light': '#E45C37', // Light custom red
        'custom-red-dark': '#A62F18', // Dark custom red
        'custom-red-2': 'rgba(212, 69, 30, 0.31)', // Custom red with 31% opacity
      },
    },
  },
  plugins: [],
};
