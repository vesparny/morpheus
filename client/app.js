/** @jsx React.DOM */

'use strict';

var React = require('react');
var router = require('./router.js');
var Aviator = require('aviator');


//allow react dev tools work
window.React = React;

// define routes
Aviator.setRoutes({
  target: router,
  '/*': 'setup',
  '/': {
    target: router.routes,
    '/': 'home',
  },
  '/:slug': {
    target: router.routes,
    '/': 'single',
  }
});

// Start routing
Aviator.dispatch();
