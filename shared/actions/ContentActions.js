'use strict';

function buildAppGlobalsPayload(config) {
  return {
    siteTitle: config.siteTitle,
    siteUrl: config.siteUrl,
    siteDescription: config.siteDescription,
    authors: config.authors,
    clickyAnalytics: config.clickyAnalytics,
    disqusComments: config.disqusComments
  };
}

module.exports = {
  list: function(context, payload, done) {
    context.dispatch('RESET_CONTENT_LIST');
    context.dispatch('SET_APP_GLOBALS', buildAppGlobalsPayload(context.config));
    context.service.read('content', {
      actionType: 'list',
      page: payload.page || '1'
    }, {}, function(err, result) {
      if (err) {
        context.dispatch('GET_CONTENT_LIST_FAILURE');
        return done(err);
      }
      context.dispatch('GET_CONTENT_LIST_SUCCESS', result.data);
      context.dispatch('UPDATE_PAGE_META', {
        pageDescription: context.config.siteDescription,
        pageTitle: context.config.siteTitle + (payload.page && payload.page !== '1' ? ' - Page ' + payload.page : ''),
        meta: result.meta
      });
      done();
    });
  },
  single: function(context, payload, done) {
    context.dispatch('RESET_CONTENT');
    context.dispatch('RESET_CONTENT_LIST');
    context.dispatch('SET_APP_GLOBALS', buildAppGlobalsPayload(context.config));
    context.service.read('content', {
      slug: payload.slug,
      actionType: 'single'
    }, {}, function(err, result) {
      if (err) {
        context.dispatch('GET_CONTENT_FAILURE');
        return done(err);
      }
      context.dispatch('GET_CONTENT_SUCCESS', result.data);
      context.dispatch('UPDATE_PAGE_META', {
        pageDescription: result.data.title,
        pageTitle: result.data.title,
        meta: result.meta
      });
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
