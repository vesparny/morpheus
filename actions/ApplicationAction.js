'use strict';

module.exports = {
  home:function(context, payload, done) {
    context.dispatch('APP_START');
    context.services.post.getPosts().then(function(posts) {
      context.dispatch('GET_POSTS_SUCCESS', posts);
      done();
    }).catch(function(err) {
      context.dispatch('GET_POSTS_FAILURE', err);
      done();
    });
  },
  single:function(context, payload, done) {
    context.dispatch('APP_START');
    context.services.post.getPostBySlug(payload.slug).then(function(single) {
      context.dispatch('GET_SINGLE_SUCCESS', single);
      done();
    }).catch(function(err) {
      context.dispatch('GET_SINGLE_FAILURE', err);
      done();
    });
}};
