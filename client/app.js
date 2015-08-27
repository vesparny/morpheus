'use strict';

var React = require('react');
var appContext = require('../shared/context');
var dehydratedState = window.Morpheus; // Sent from the server

window.React = React; // For chrome dev tool support
appContext.rehydrate(dehydratedState, function(err, context) {
  if (err) {
    throw err;
  }
  var mountNode = document.body;
  React.render(appContext.getAppComponent()({
    context: context.getComponentContext(),
    enableScroll: false
  }), mountNode, function() {});
});
