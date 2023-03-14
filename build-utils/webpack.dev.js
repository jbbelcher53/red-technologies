const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3001,
    liveReload: false,
    hot: true,
    compress: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'esnext',
        css: true, // Apply minification to CSS assets
      }),
    ],
  },
  plugins: [
    new Dotenv({ path: path.resolve(__dirname, '../.env.development') }),
    new ReactRefreshPlugin(),
  ].filter(Boolean),
}
