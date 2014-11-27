'use strict';

var api = require('../utils').api;

var FrontEndActions = {
  getAllPosts: function(context) {
    api.get('/posts').then(function(res){
      var posts = res.body;
      context.dispatch('GET_POSTS_SUCCESS', posts);
    }, function(err){
      context.dispatch('GET_POSTS_FAILURE', err);
    });
  },
  getSingle: function(context, payload) {
    api.get('/posts/'+payload.slug).then(function(res){
      var single = res.body;
      context.dispatch('GET_SINGLE_SUCCESS', single);
    }, function(err){
      context.dispatch('GET_SINGLE_FAILURE', err);
    });
  }
};

module.exports = FrontEndActions;
