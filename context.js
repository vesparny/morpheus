'use strict';

var React = require('react');
var FluxibleApp = require('fluxible-app');
var routrPlugin = require('fluxible-plugin-routr');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routes = require('./client-routes');
var clientConfig = require('./client-config.js');


var context = new FluxibleApp({
  appComponent: React.createFactory(require('./content/themes/blablabla/App'))
});

context.plug(routrPlugin({
  routes: routes
}));

context.plug(fetchrPlugin({
  xhrPath: '/api'
}));

function configPlugin (options){
  var config = options.config;
  return {
    name: 'configPlugin',
    plugContext: function () {
      return {
        plugActionContext: function (actionContext) {
          actionContext.config = config;
        },
        dehydrate: function () {
          return {
            config: config
          };
        },
        rehydrate: function (state) {
          config = state.config;
        }
      };
    }
  };
}
context.plug(configPlugin({
  config:clientConfig.data
}));


context.registerStore(require('./stores/ContentStore'));
context.registerStore(require('./stores/ContentListStore'));
context.registerStore(require('./stores/ApplicationStore'));

module.exports = context;
