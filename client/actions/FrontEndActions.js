'use strict';

var mcFly = require('../flux');
var api = require('../utils/api');

var FrontEndActions = mcFly.createActions({
  receiveAllPosts: function(rawPosts) {
    return {
      actionType: 'GET_POST_SUCCESS',
      data: rawPosts
    };
  },
  receiveSingle: function(rawSingle) {
    return {
      actionType: 'GET_SINGLE_SUCCESS',
      data: rawSingle
    };
  },
  getAllPosts: function() {
    api.get('/posts').then(function(res){
      mcFly.actions.receiveAllPosts(res.body);
    }, function(err){
      console.log('error',err);
    });
    return {
      actionType: 'GET_POST'
    };
  },
  getSingle: function(slug) {
    api.get('/posts/'+slug).then(function(res){
      mcFly.actions.receiveSingle(res.body);
    }, function(err){
      console.log('error',err);
    });
    return {
      actionType: 'GET_SINGLE'
    };
  }
});

module.exports = FrontEndActions;
