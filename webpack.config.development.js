'use strict';

var path = require('path');
var webpack = require('webpack');
var address = require('network-address')();
var hotPort = 3002;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  devServer: true,
  debug: true,
  entry: [
    'webpack-dev-server/client?http://' + address + ':' + hotPort,
    'webpack/hot/dev-server',
    './client/app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://' + address + ':' + hotPort + '/dist/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      include: __dirname,
      loader: 'react-hot-loader!babel-loader'
    }, {
      test: /\.json?$/,
      exclude: /node_modules/,
      include: __dirname,
      loader: 'json-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  _hotPort: hotPort,
  _address: address
};
