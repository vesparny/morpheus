/**
* Copyright 2014, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/
'use strict';
var React = require('react');
var FluxibleApp = require('fluxible-app');
var services = require('../lib/services');
var routrPlugin = require('fluxible-plugin-routr');

module.exports = function(){
  var app = new FluxibleApp({
    appComponent: React.createFactory(require('./components/App'))
  });

  app.plug(routrPlugin({
    routes: require('./routes')
  }));

app.registerStore(require('./stores/FrontEndStore'));
app.registerStore(require('./stores/ApplicationStore'));
return app;
};
