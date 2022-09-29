const path = require("path")
const webpack = require("webpack")
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../server/server/static"),
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
        test: /\.(frag|vert|txt)?$/,
        loader: 'raw-loader',
      },
    ],
  },
  mode: "development",
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: ["console"]
    }),
  ]
}
