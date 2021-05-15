var webpack = require('webpack');
var fs = require('fs')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './app/app.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    host: "0.0.0.0",
    port: 8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};

