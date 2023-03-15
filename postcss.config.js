module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {
      content: [
        './src/**/*.tsx',
        './src/**/*.ts',
        './src/**/*.jsx',
        './src/**/*.js',
      ],
    },
    autoprefixer: {},
  },
}
