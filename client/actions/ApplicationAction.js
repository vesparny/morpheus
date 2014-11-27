'use strict';

module.exports = function(context, payload, done) {
  context.dispatch('APP_START');
  context.services.post.getPosts().then(function(posts) {
    context.dispatch('GET_POSTS_SUCCESS', posts);
    done();
  }).catch(function(err) {
    context.dispatch('GET_POSTS_FAILURE', err);
    done();
  });
};
