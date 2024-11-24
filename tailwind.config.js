/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {
      animation: {
        "spin-360": 'spin-360 3s linear infinite'
      },
      keyframes: {
        "spin-360": {
          "0%": { transform: 'rotate(0deg)' },
          "100%": { transform: 'rotate(360deg)' }
        }
      }
      ,
      width: {
        "width": '0%'
      }
    },
  },
  plugins: [],
}

