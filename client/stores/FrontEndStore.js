'use strict';

var mcFly = require('../flux');

var _posts = [];
var _single;

function _addPosts(rawPosts) {
  _posts = [];
  rawPosts.forEach(function(post) {
    _posts.push(post);
  });
}

function _setSingle(rawSingle) {
  _single = rawSingle;
}

var FrontEndStore = mcFly.createStore({
  get: function(id) {
    return _posts[id];
  },
  getAll: function() {
    return _posts;
  },
  getSingle: function() {
    return _single;
  }
}, function(payload) {
  switch (payload.actionType) {
    case 'GET_POST_SUCCESS':
      _addPosts(payload.data);
      FrontEndStore.emitChange();
      break;
    case 'GET_SINGLE_SUCCESS':
      _setSingle(payload.data);
      FrontEndStore.emitChange();
      break;
    default:
  }
});


module.exports = FrontEndStore;
