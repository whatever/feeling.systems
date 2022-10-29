const path = require("path")
const webpack = require("webpack")
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../go/server/"),
    filename: "feeling-systems.bundled.js",
    libraryTarget: "var",
    library: "plz",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.gltf$/,
        loader: 'raw-loader',
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.(frag|vert)?$/,
        loader: 'raw-loader',
      },
    ],
  },
  mode: "development",
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: ["console"]
    }),
  ],
  devServer: {
    bonjour: true,
    proxy: {
      "/holding": {
        target: "ws://localhost:8081",
        ws: true,
      },
      "/touch": "http://localhost:8081",
      "/whoami": "http://localhost:8081",
    }
  },
}
