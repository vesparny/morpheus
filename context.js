'use strict';

var React = require('react');
var FluxibleApp = require('fluxible-app');
var routrPlugin = require('fluxible-plugin-routr');
var routes = require('./client-routes');


var context = new FluxibleApp({
  appComponent: React.createFactory(require('./content/themes/blablabla/App'))
});

context.plug(routrPlugin({
  routes: routes
}));

context.registerStore(require('./stores/ContentStore'));
context.registerStore(require('./stores/ContentListStore'));
context.registerStore(require('./stores/ApplicationStore'));

module.exports = context;
