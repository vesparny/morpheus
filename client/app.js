/** @jsx React.DOM */

'use strict';

var React = require('react');
var router = require('./router.js');
var Aviator = require('aviator');

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
//https://medium.com/react-tutorials/react-backbone-router-c00be0cf1592
//http://bl.ocks.org/simenbrekken/9359621
//http://www.htmlxprs.com/post/20/creating-isomorphic-apps-with-react-and-nodejs
//http://www.princeton.edu/~crmarsh/react-ssr/
//http://scotch.io/tutorials/javascript/build-a-real-time-twitter-stream-with-node-and-react-js
//http://jaketrent.com/post/send-props-to-children-react/
