/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
      'color-black': '#000000',
      'color-darker': '#170C29',
      'color-dark': '#352F44',
      'color-primary': '#5C5470',
      'color-light': '#B9B4C7',
      'color-texts': '#FAF0E6',
      'color-titles': '#FBCB9B',
    },
},
  },
  plugins: [],
}

