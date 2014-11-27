'use strict';

var mcFly = require('../flux')();

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
  name:'store',
  get: function(id) {
    return _posts[id];
  },
  getAll: function() {
    return _posts;
  },
  getSingle: function() {
    return _single;
  },
  dehydrate:function(){
    return _posts;
  }
}, function(payload) {
  switch (payload.actionType) {
    case 'GET_POST_SUCCESS':
      _addPosts(payload.data);
      FrontEndStore.emitChange();
      console.log('sadasdasd');
      console.log(mcFly.dehydrate());
      break;
    case 'GET_SINGLE_SUCCESS':
      _setSingle(payload.data);
      FrontEndStore.emitChange();
      break;
    default:
  }
});


module.exports = FrontEndStore;
