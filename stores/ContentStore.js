'use strict';

var createStore = require('fluxible-app/utils/createStore');

var ContentStore = createStore({
  storeName: 'ContentStore',
  handlers: {
    'GET_CONTENT_SUCCESS': 'getContentSuccess'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.content = {};
  },
  getContentSuccess: function(content) {
    this.content = content;
    this.emitChange();
  },
  getAll: function() {
    return this.posts;
  },
  getContent: function() {
    return this.content;
  },
  dehydrate: function() {
    return {
      content: this.content
    };
  },
  rehydrate: function(state) {
    this.content = state.content;
  }
});

module.exports = ContentStore;
