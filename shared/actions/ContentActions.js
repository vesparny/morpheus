'use strict';

module.exports = {
  list: function(context, payload, done) {
    context.dispatch('RESET_CONTENT_LIST');
    context.dispatch('APP_START', {
      siteTitle: context.config.siteTitle,
      siteDescription: context.config.siteDescription
    });
    context.service.read('content', {
      actionType: 'list',
      page: payload.page || 1
    }, {}, function(err, result) {
      if (err) {
        context.dispatch('GET_CONTENT_LIST_FAILURE');
        return done(err);
      }
      context.dispatch('SET_SITE_URL', context.config.siteUrl);
      context.dispatch('UPDATE_PAGE_TITLE', context.config.siteTitle);
      context.dispatch('UPDATE_META', result.meta);
      context.dispatch('GET_CONTENT_LIST_SUCCESS', result.data);
      done();
    });
  },
  single: function(context, payload, done) {
    context.dispatch('RESET_CONTENT');
    context.dispatch('RESET_CONTENT_LIST');
    context.dispatch('APP_START', {
      siteTitle: context.config.siteTitle,
      siteDescription: context.config.siteDescription,
      authors: context.config.authors
    });
    context.service.read('content', {
      slug: payload.slug,
      actionType: 'single'
    }, {}, function(err, result) {
      if (err) {
        context.dispatch('GET_CONTENT_FAILURE');
        return done(err);
      }
      context.dispatch('GET_CONTENT_SUCCESS', result.data);
      context.dispatch('UPDATE_PAGE_TITLE', result.data.title);
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
