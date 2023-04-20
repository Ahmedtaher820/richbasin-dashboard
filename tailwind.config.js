const tailwindcss = require('tailwindcss');

const primary = {
  DEFAULT: '#07395e',
  50: '#91B0D1',
  100:"#07395e6b",
  200:"#f3f6ff",
  400:"#07395ec4",
  600:"#07395edb"
}
const secondary = {
  DEFAULT: '#e6c10f',
}
module.exports = {
  // content: [
  //   './index.html',
  //   './src/**/*.{vue,js,ts,jsx,tsx}',  
  //   './node_modules/vue-tailwind-datepicker/**/*.js',
  // ],
  theme: {
    extend: {
      colors: {
        primary,
      },
    },
  },
  content: ['./index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',],

  plugins: [
    tailwindcss,
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

}