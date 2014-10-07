var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    GET_POST_SUCCESS: null,
    GET_POSTS: null,
    GET_SINGLE_SUCCESS:null,
    GET_SINGLE:null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
