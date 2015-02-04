'use strict';

var path = require('path');
process.env.NODE_ENV = 'development';
var configuration = require('./shared/config');

module.exports = {
  entry: './client/client.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'content/themes/'+ configuration.theme +'/assets/dist')
  },
  watch: true,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: '6to5-loader'
    },
    {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }]
  }
};
