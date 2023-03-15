/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.jsx',
    './src/**/*.js',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        sm: '40px',
        md: '48px',
        xl: '64px',
        '2xl': '88px',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      puple: colors.purple,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
    },
    extend: {
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
  plugins: [],
}
