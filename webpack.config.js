var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "eval",
  mode: "development",
  entry: ["@babel/polyfill", "./src/client/index"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new CopyWebpackPlugin(["public/players.json"])
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("tailwindcss"), require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  }
};
