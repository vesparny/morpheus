'use strict';

var webpack = require('webpack');
var path = require('path');
process.env.NODE_ENV = 'development';
var configuration = require('./shared/config');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    './client/client.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'content/themes/'+ configuration.theme +'/assets/dist')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: ['react-hot', '6to5-loader']
    },
    {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
