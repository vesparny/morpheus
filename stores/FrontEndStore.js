'use strict';

var createStore = require('fluxible-app/utils/createStore');

var MessageStore = createStore({
  storeName: 'FrontEndStore',
  handlers: {
    'GET_POSTS_SUCCESS': 'getPostsSuccess',
    'GET_SINGLE_SUCCESS': 'getSingleSuccess'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.posts = [];
    this.single = {};
    this.siteUrl = null;
  },
  getPostsSuccess: function(posts) {
    this.posts = posts;
    this.emitChange();
  },
  getSingleSuccess: function(single) {
    this.single = single;
    this.emitChange();
  },
  getAll: function() {
    return this.posts;
  },
  getSingle: function() {
    return this.single;
  },
  dehydrate: function() {
    return {
      posts: this.posts,
      single: this.single,
    };
  },
  rehydrate: function(state) {
    this.posts = state.posts;
    this.single = state.single;
  }
});

module.exports = MessageStore;
