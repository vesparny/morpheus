'use strict';

var createStore = require('fluxible-app/utils/createStore');
var MessageStore = createStore({
  storeName: 'FrontEndStore',
  handlers: {
    'GET_POSTS_SUCCESS': 'getPostsSuccess',
    'GET_SINGLE_SUCCESS': 'getSingleSuccess'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this._posts = [];
    this._single = {};
  },
  getPostsSuccess: function(posts) {
    this._posts = posts;
    this.emitChange();
  },
  getSingleSuccess: function(single) {
    this._single = single;
    this.emitChange();
  },
  getAll: function() {
    return this._posts;
  },
  getSingle: function() {
    return this._single;
  },
  dehydrate: function() {
    return {
      posts: this._posts,
      single: this._single
    };
  },
  rehydrate: function(state) {
    this._posts = state.posts;
    this._single = state.single;
  }
});

module.exports = MessageStore;
