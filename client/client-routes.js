'use strict';

var config = require('../shared/config');

module.exports = {
  home: {
    path: '/',
    method: 'get',
    page: 'home'
  },
  single: {
    path: config.permalinkStructure,
    method: 'get',
    page: 'single'
  },
  static: {
    path: '/:title/',
    method: 'get',
    page: 'static'
  },
  tag: {
    path: '/tag/:tag/',
    method: 'get',
    page: 'tag'
  },
  page: {
    path: '/page/:page/',
    method: 'get',
    page: 'page'
  }
};
