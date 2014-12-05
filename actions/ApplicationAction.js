'use strict';
var flash = require('../flash');

module.exports = {
  home: function(context, payload, done) {
    context.dispatch('APP_START');
    flash.services.post.getPosts().then(function(posts) {
      context.dispatch('SET_SITE_URL', flash.config.get('siteUrl'));
      context.dispatch('GET_CONTENT_LIST_SUCCESS', posts);
      done();
    }).catch(function(err) {
      context.dispatch('GET_CONTENT_LIST_FAILURE', err);
      done(err);
    });
  },
  single: function(context, payload, done) {
    context.dispatch('APP_START');
    flash.services.post.getPostBySlug(payload.slug).then(function(single) {
      context.dispatch('GET_CONTENT_SUCCESS', single);
      done();
    }).catch(function(err) {
      context.dispatch('GET_SINGLE_FAILURE', err);
      done(err);
    });
  },
  tag: function(context, payload, done) {
    context.dispatch('APP_START');
    flash.services.post.getTag(payload.tag).then(function(pages) {
      context.dispatch('GET_CONTENT_SUCCESS', pages);
      done();
    }).catch(function(err) {
      context.dispatch('GET_CONTENT_FAILURE', err);
      done(err);
    });
  }
};
