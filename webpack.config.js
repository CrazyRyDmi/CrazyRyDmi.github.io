const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const minimist = require("minimist");
const path = require("path");
const querystring = require("querystring");

const csswring = require("csswring");
const cssnano = require("cssnano");
const simpleExtend = require("postcss-extend");
const autoprefixer = require("autoprefixer");

const argv = minimist(process.argv.slice(2));
const isRelease = !!argv.release;

const extractCss = new ExtractTextPlugin("./themes/bundle.css", {
  allChunks: true
});

const postcssOptions = [simpleExtend, autoprefixer]
  .concat(isRelease ? [cssnano] : []);

const defines = {
  "process": {
    "env": {
      "NODE_ENV": isRelease && `"production"`
    }
  },
  "DEBUG": !isRelease
};

const ifDefOptions = querystring.encode({
  json: JSON.stringify(defines)
});

const plugins = [
  new webpack.DefinePlugin(defines),
  extractCss,
  // new CopyWebpackPlugin([
  //     { from: "./src/externalScripts/", to: "./externalScripts/" },
  // ]),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "./src/html/index.hbs"),
    inject: false,
    filename: "index.html",
    isRelease: isRelease,
    title: ""
  })
];

if (isRelease) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  console.log("----------------------------");
  console.log("Using release configuration.");
  console.log("----------------------------");
  console.log();
}

module.exports = {
  entry: {
    ts: "./src/ts/app.ts"
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/"
  },
  // Turn on sourcemaps
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
    modulesDirectories: ["node_modules"]
  },

  // Add minification
  plugins: plugins,

  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: "handlebars"
      },
      {
        test: /\.ts$/,
        loader: `babel!ts!tslint!ifdef?${ifDefOptions}`
      },
      {
        test: /\.glsl$|\.fs$|\.vs$/,
        loader: "webpack-glsl"
      },
      {
        test: /app\.less$/,
        loader: extractCss.extract("style-loader", "css!postcss!less")
      },
      {
        test: /\.(png)|(jpg)|(gif)|(ico)$/,
        loader: "file?name=img/[name]-[sha512:hash:base64:10].[ext]"
      },
      {
        test: /\.less$/,
        exclude: /app\.less$/,
        loader: extractCss.extract(
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[path][local]___[hash:base64:5]",
          "postcss-loader",
          "less-loader"
        )
      }
    ]
  },

  babel: {
    "sourceMaps": true,
    "presets": ["es2015"],
    "plugins": ["syntax-async-functions"]
  },

  tslint: {
    emitErrors: true
  },

  postcss: postcssOptions

}
