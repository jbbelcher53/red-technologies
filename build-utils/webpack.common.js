const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const { ModuleFederationPlugin } = require('webpack').container
// const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '..', '/src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: [
      '*',
      '.jsx',
      '.js',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.jpg',
      'jpeg',
      'png',
    ],
  },

  target: 'web',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, loader: 'file-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'esnext',
        },
      },
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
          loader: 'tsx',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: './src/assets',
    //       to: '../dist/assets',
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      title: 'Red-Technologies',
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
  ],
}
