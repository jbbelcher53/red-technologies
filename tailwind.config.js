/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.jsx', './src/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        blob: 'blob 12s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '25%': {
            transform: 'translate(-200px, 0px) scale(1.2)',
          },
          '50%': {
            transform: 'translate(300px, 300px) scale(0.8)',
          },
          '75%': {
            transform: 'translate(300px, -200px) scale(0.8)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      fontSize: { xxs: ['0.5rem', '1rem'] },
      fontFamily: {
        sans: ['Nunito Sans', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
      },
      cursor: {
        grab: 'grab',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
