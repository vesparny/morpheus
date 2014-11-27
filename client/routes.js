'use strict';

module.exports = {
  home: {
    path: '/',
    method: 'get',
    page: 'home'
  },
  about: {
    path: '/:slug',
    method: 'get',
    page: 'single'
  }
};
