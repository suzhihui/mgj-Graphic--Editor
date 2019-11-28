const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path");

module.exports = {
  context: __dirname,
  // mode: "production",
  mode: "",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "mgjGraphicEditor.js",
    library: "MgjGraphicEditor",
    libraryExport: "default",
    libraryTarget: "umd"
  },
  plugins: [
    // new BundleAnalyzerPlugin()
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   hash: true
    // })
  ],
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.string$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        }
      }
    ]
  },
  externals: {
    "canvas-prebuilt": "undefined",
    canvas: "undefined",
    "jsdom/lib/jsdom/utils": JSON.stringify({
      Canvas: null
    }),
    "jsdom/lib/jsdom/living/generated/utils": JSON.stringify({
      implForWrapper: null
    }),
    jsdom: "null",
    xmldom: JSON.stringify({
      DOMParser: null
    })
  },
  performance: {
    hints: false
  }
};