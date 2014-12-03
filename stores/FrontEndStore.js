'use strict';

var createStore = require('fluxible-app/utils/createStore');

var MessageStore = createStore({
  storeName: 'FrontEndStore',
  handlers: {
    'GET_POSTS_SUCCESS': 'getPostsSuccess',
    'GET_SINGLE_SUCCESS': 'getSingleSuccess',
    'SET_SITE_URL': 'setSiteUrl'
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
  setSiteUrl: function(url) {
    this.siteUrl = url;
    this.emitChange();
  },
  getSiteUrl: function() {
    return this.siteUrl;
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
      siteUrl: this.siteUrl
    };
  },
  rehydrate: function(state) {
    this.posts = state.posts;
    this.single = state.single;
    this.siteUrl = state.siteUrl;
  }
});

module.exports = MessageStore;
