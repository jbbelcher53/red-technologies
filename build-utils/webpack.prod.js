const { ESBuildMinifyPlugin } = require('esbuild-loader')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'esnext',
        css: true, // Apply minification to CSS assets
      }),
    ],
  },
  plugins: [
    new Dotenv({ path: path.resolve(__dirname, '../.env.production') }),
    new MiniCssExtractPlugin(),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}
