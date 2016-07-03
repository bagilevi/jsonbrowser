var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const production = process.env.WEBPACK_ENV == 'production';
const development = ! production;

var entry = [
  './src/index',
  './style/index'
]
if (development) {
  entry.push('webpack-dev-server/client?http://localhost:4949');
  entry.push('webpack/hot/only-dev-server');
}

module.exports = {
  devtool: 'eval',
  entry: entry,
  resolve: {
    root: [path.join(__dirname, "src")],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".ls", ".css", ".styl"]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin("style.css", { allChunks: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\/ls$/,
        loaders: ['livescript'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('stylus-loader', 'css-loader!stylus-loader')
      }
    ]
  }
};
