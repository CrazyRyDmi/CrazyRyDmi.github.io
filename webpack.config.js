var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    ts: './src/ts/app.ts'
  },
  output: {
    filename: './dist/bundle.js'
  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  // Add minification
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts'
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl'
      }
    ]
  }
}