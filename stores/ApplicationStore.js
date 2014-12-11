'use strict';

var createStore = require('fluxible-app/utils/createStore');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
    'SET_SITE_URL': 'setSiteUrl',
    'SET_ERROR': 'setError',
    'UPDATE_PAGE_TITLE': 'updatePageTitle',
    'APP_START': 'appStart'
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
    this.pageTitle = '';
    this.siteTitle = '';
    this.siteDescription = '';
    this.error = null;
  },
  appStart:function(data){
    this.siteTitle = data.siteTitle;
    this.siteDescription = data.siteDescription;
    this.emitChange();
  },
  updatePageTitle: function(title) {
    this.pageTitle = title;
    this.emitChange();
  },
  setError: function(error) {
    this.error = error;
    this.pageTitle = 'error';
    this.emitChange();
  },
  getPageTitle: function() {
    return this.pageTitle;
  },
  getSiteTitle: function() {
    return this.siteTitle;
  },
  getSiteDescription: function() {
    return this.siteDescription;
  },
  getSiteUrl: function() {
    return this.siteUrl;
  },
  setSiteUrl: function(url) {
    this.siteUrl = url;
    this.emitChange();
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
      siteUrl: this.siteUrl,
      pageTitle: this.pageTitle,
      siteTitle:this.siteTitle,
      siteDescription:this.siteDescription,
      error: this.error
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
    this.pageTitle = state.pageTitle;
    this.siteTitle = state.siteTitle;
    this.siteDescription = state.siteDescription;
    this.error = state.error;
  }
});

module.exports = ApplicationStore;
