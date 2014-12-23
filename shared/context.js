'use strict';

var React = require('react');
var FluxibleApp = require('fluxible-app');
var routrPlugin = require('fluxible-plugin-routr');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routes = require('../client/client-routes');
var config = require('./config');

var appComponent;

if (typeof window === 'undefined') {
  appComponent = React.createFactory(require('../content/themes/'+config.get('theme')+'/App'));
}else{
  //this is gonna be replaced by a gulp task
  appComponent = React.createFactory(require('../content/themes/THEMETOBEREPLACED/App'));

}
var context = new FluxibleApp({
  appComponent: appComponent
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
  config:config.client
}));


context.registerStore(require('./stores/ContentStore'));
context.registerStore(require('./stores/ContentListStore'));
context.registerStore(require('./stores/ApplicationStore'));

module.exports = context;
