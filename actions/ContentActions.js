'use strict';

module.exports = {
  list: function(context, payload, done) {
    context.dispatch('APP_START', {
      siteTitle: context.config.siteTitle,
      siteDescription: context.config.siteDescription
    });
    context.service.read('content', {
      actionType: 'list'
    }, {}, function(err, posts) {
      context.dispatch('SET_SITE_URL', context.config.siteUrl);
      context.dispatch('UPDATE_PAGE_TITLE', context.config.siteTitle);
      context.dispatch('GET_CONTENT_LIST_SUCCESS', posts);
      done();
    });
  },
  single: function(context, payload, done) {
      context.service.read('content', {
        slug: payload.slug,
        actionType: 'single'
      }, {}, function(err, single) {
        context.dispatch('GET_CONTENT_SUCCESS', single);
        context.dispatch('UPDATE_PAGE_TITLE', single.title);
        done();
      });
    },
    tag: function(context, payload, done) {
      context.service.read('content', {
        tag: payload.tag,
        actionType: 'tag'
      }, {}, function(err, single) {
        context.dispatch('GET_CONTENT_SUCCESS', single);
        context.dispatch('UPDATE_PAGE_TITLE', single.title);
        done();
      });
    },
    error: function(context, payload, done) {
      context.dispatch('SET_ERROR', payload.err);
      done();
    }
};
