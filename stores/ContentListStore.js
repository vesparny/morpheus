'use strict';

var createStore = require('fluxible-app/utils/createStore');

var ContentListStore = createStore({
  storeName: 'ContentListStore',
  handlers: {
    'GET_CONTENT_LIST_SUCCESS': 'getContentListSuccess',
    'RESET_CONTENT_LIST': 'resetContentList'

  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.contentList = [];
  },
  resetContentList: function(){
    this.initialize();
    this.emitChange();
  },
  getContentListSuccess: function(contentList) {
    this.contentList = contentList;
    this.emitChange();
  },
  getContentList: function() {
    return this.contentList;
  },
  dehydrate: function() {
    return {
      contentList: this.contentList
    };
  },
  rehydrate: function(state) {
    this.contentList = state.contentList;
  }
});

module.exports = ContentListStore;
