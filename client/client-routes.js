'use strict';

var config = require('../shared/config');

function getRoutes() {
  var routes = {
    home: {
      path: '/',
      method: 'get',
      page: 'home'
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

  if (config.permalinkStructure !== '/:title/') {
    routes.post = {
      path: config.permalinkStructure,
      method: 'get',
      page: 'post'
    };
  }
  return routes;
}

module.exports = getRoutes();
