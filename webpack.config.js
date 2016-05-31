var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    ts: "./src/ts/app.ts",
    css: "./src/css/app.css"
  },
  output: {
    filename: "./dist/bundle.js"
  },
  // Turn on sourcemaps
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  },
  // Add minification
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("./dist/bundle.css", {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "babel!ts"
      },
      {
        test: /\.glsl$|\.fs$|\.vs$/,
        loader: "webpack-glsl"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  }
}
