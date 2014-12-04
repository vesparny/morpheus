'use strict';

var createStore = require('fluxible-app/utils/createStore');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
    'SET_SITE_URL': 'setSiteUrl'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = {
      home: {
        text: 'Home',
        route: 'home'
      },
      single: {
        text: 'Single',
        route: 'single'
      },
      tag: {
        text: 'Tag',
        route: 'tag'
      }
    };
    this.siteUrl = null;
  },
  setSiteUrl: function(url) {
    this.siteUrl = url;
    this.emitChange();
  },
  getSiteUrl: function() {
    return this.siteUrl;
  },
  handleNavigate: function(route) {
    var pageName = route.config.page;
    var page = this.pages[pageName];
    if (pageName === this.getCurrentPageName()) {
      return;
    }
    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emit('change');
  },
  getCurrentPageName: function() {
    return this.currentPageName;
  },
  getState: function() {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute,
      siteUrl: this.siteUrl
    };
  },
  dehydrate: function() {
    return this.getState();
  },
  rehydrate: function(state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
    this.siteUrl = state.siteUrl;

  }
});

module.exports = ApplicationStore;
