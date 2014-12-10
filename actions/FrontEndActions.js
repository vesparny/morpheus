'use strict';

var api = require('../utils').api;
var flash = require('../flash');

var FrontEndActions = {
  getContentList: function(context) {
    api.get('/posts').then(function(res){
      var contentList = res.body;
      context.dispatch('GET_CONTENT_LIST_SUCCESS', contentList);
      context.dispatch('UPDATE_PAGE_TITLE', flash.config.get('siteUrl'));
    }, function(err){
      context.dispatch('GET_CONTENT_LIST_FAILURE', err);
    });
  },
  getContent: function(context, payload) {
    api.get('/posts/'+payload.slug).then(function(res){
      var content = res.body;
      context.dispatch('GET_CONTENT_SUCCESS', content);
      context.dispatch('UPDATE_PAGE_TITLE', content.title);
    }, function(err){
      context.dispatch('GET_CONTENT_FAILURE', err);
    });
  },
  getTag: function(context, payload) {
    api.get('/tags/'+payload.tag).then(function(){
      window.alert('tag feature has to be implemented');
    });
  }
};

module.exports = FrontEndActions;
