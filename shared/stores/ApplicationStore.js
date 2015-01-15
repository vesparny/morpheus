'use strict';

var createStore = require('fluxible/utils/createStore');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
    'SET_ERROR': 'setError',
    'SET_APP_GLOBALS': 'setAppGlobals'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.route = {};
    this.globals = {};
    this.error = null;
  },
  setAppGlobals: function(globals) {
    this.globals = globals;
    this.emitChange();
  },
  setError: function(error) {
    this.error = error;
    this.pageTitle = 'error';
    this.emitChange();
  },
  handleNavigate: function(route) {
    if (route.url === this.route.url) {
      return;
    }
    this.route = route;
    this.emit('change');
  },
  getCurrentPageName: function() {
    return this.currentPageName;
  },
  getState: function() {
    return {
      route: this.route,
      error: this.error,
      globals: this.globals
    };
  },
  dehydrate: function() {
    return this.getState();
  },
  rehydrate: function(state) {
    this.route = state.route;
    this.error = state.error;
    this.globals = state.globals;
    this.emitChange();
  }
});

module.exports = ApplicationStore;
