'use strict';

var createStore = require('fluxible/utils/createStore');

var ContentStore = createStore({
  storeName: 'ContentStore',
  handlers: {
    'GET_CONTENT_SUCCESS': 'getContentSuccess',
    'RESET_CONTENT': 'resetContent'

  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.content = {};
  },
  resetContent: function(){
    this.initialize();
    this.emitChange();
  },
  getContentSuccess: function(content) {
    this.content = content;
    this.emitChange();
  },
  getAll: function() {
    return this.posts;
  },
  getState: function() {
    return {
      content: this.content
    };
  },
  dehydrate: function() {
    return this.getState();
  },
  rehydrate: function(state) {
    this.content = state.content;
  }
});

module.exports = ContentStore;
