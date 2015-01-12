'use strict';

var React = require('react');
var ApplicationStore = require('../../../shared/stores/ApplicationStore');

var Html = React.createClass({
  render: function(){
    var pageTitle = this.props.context.getStore(ApplicationStore).getPageMeta().pageTitle;
    var keywords = this.props.context.getStore(ApplicationStore).getPageMeta().keywords || [];
    var pageDescription = this.props.context.getStore(ApplicationStore).getPageMeta().pageDescription;
    var siteUrl = this.props.context.getStore(ApplicationStore).getGlobals().siteUrl;
    var siteTitle = this.props.context.getStore(ApplicationStore).getGlobals().siteTitle;
    console.log(this.props.context.getStore(ApplicationStore));
    return (

    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords.join('')} />

      <meta itemprop="name" content={pageTitle} />
      <meta itemprop="description" content={pageDescription} />

      <link rel="canonical" href="http://demo.ghost.io/style-test/" />
      <meta name="generator" content="Ghost 0.5" />
      <link rel="alternate" type="application/rss+xml" title={siteTitle} href={siteUrl + '/rss/'} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:url" content="http://demo.ghost.io/style-test/" />
      <meta name="twitter:creator" content="@vesparny" />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content="http://www.html5rocks.com/en/tutorials/es6/promises/" />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={siteTitle} />

      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400" />
      <link rel="stylesheet" href="/assets/dist/main.css" />
    </head>
      <body dangerouslySetInnerHTML={{__html: this.props.markup}}></body>
    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
    <script src="/assets/dist/bundle.js"></script>
    </html>
    )
  }
});

module.exports = Html;
