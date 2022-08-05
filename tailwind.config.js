/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        red: '#fc4747',
        black: '#10141e',
        grayishBlue: '#5a698f',
        darkGray: '#161d2f',
      },
      fontFamily: {
        'sans': "Outfit"
      }
    },
  },
  plugins: [],
}
