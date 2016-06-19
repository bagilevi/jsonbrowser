var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:4949',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  resolve: {
    root: [path.join(__dirname, "src")],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".ls"]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\/ls$/,
      loaders: ['livescript'],
      include: path.join(__dirname, 'src')
    }]
  }
};
