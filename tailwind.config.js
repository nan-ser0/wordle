module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend:{
      width: {
        'full': '638px'
      },
      colors: {
        'gray-lighter': '#F9F9F9',
        'gray': '#F3F3F3',
        'gray-darker': '#D3D6DA',
        'dark': '#56575E',
        'd-gray-lighter': '#565F7E',
        'd-gray': '#2b3041',
        'd-gray-darker': '#262B3C',
      },
    },
  },
  plugins: [],
}
