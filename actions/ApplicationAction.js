'use strict';

var flash = require('../flash');

module.exports = {
  home: function(context, payload, done) {
    context.dispatch('APP_START' ,{
      siteTitle :flash.config.get('siteTitle'),
      siteDescription: flash.config.get('siteDescription')
    });
    flash.services.post.getPosts().then(function(posts) {
      context.dispatch('SET_SITE_URL', flash.config.get('siteUrl'));
      context.dispatch('UPDATE_PAGE_TITLE', flash.config.get('siteTitle'));
      context.dispatch('GET_CONTENT_LIST_SUCCESS', posts);
      done();
    }).catch(function(err) {
      done(err);
    });
  },
  single: function(context, payload, done) {
    flash.services.post.getPostBySlug(payload.slug).then(function(single) {
      context.dispatch('GET_CONTENT_SUCCESS', single);
      context.dispatch('UPDATE_PAGE_TITLE', single.title);
      done();
    }).catch(function(err) {
      done(err);
    });
  },
  tag: function(context, payload, done) {
    context.dispatch('APP_START');
    flash.services.post.getTag(payload.tag).then(function(pages) {
      context.dispatch('GET_CONTENT_SUCCESS', pages);
      done();
    }).catch(function(err) {
      done(err);
    });
  },
  error: function(context, payload, done) {
    context.dispatch('SET_ERROR', payload.err);
    done();
  }
};
