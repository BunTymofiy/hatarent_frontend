module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    // colors: {
    //   'purple-': {

    // }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
  ],
}
