'use strict';

module.exports = {
  home: {
    path: '/',
    method: 'get',
    page: 'home'
  },
  single: {
    path: '/:slug',
    method: 'get',
    page: 'single'
  },
  tag: {
    path: '/tag/:tag',
    method: 'get',
    page: 'tag'
  },
  page: {
    path: '/page/:page',
    method: 'get',
    page: 'home'
  }
};
