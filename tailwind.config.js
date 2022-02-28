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
        'gray': '#F0F0F0',
        'gray-darker': '#D3D6DA',
        'dark': '#56575E',
        'd-gray-lighter': '#565F7E',
        'd-gray': '#2b3041',
        'd-gray-darker': '#262B3C',
        'state-0': '#D3D6DA',
        'state-1': '#CEB02C',
        'state-2': '#66A060'
      },
    },
  },
  plugins: [],
}
