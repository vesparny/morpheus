/** @jsx React.DOM */

'use strict';

var React = require('react');
var debug = require('debug');
debug.enable('*');
window.React = React;
var appContext = require('./context');
var dehydratedState = window.Morpheus; // Sent from the server
window.React = React; // For chrome dev tool support
appContext.rehydrate(dehydratedState, function(err, context) {
  if (err) {
    throw err;
  }
  var mountNode = document.body;
  React.render(appContext.getAppComponent()({
    context: context.getComponentContext()
  }), mountNode, function() {});
});
