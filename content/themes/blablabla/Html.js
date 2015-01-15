'use strict';

var React = require('react');
var ApplicationStore = require('../../../shared/stores/ApplicationStore');
var MetaStore = require('../../../shared/stores/MetaStore');

var Html = React.createClass({
  render: function(){
    var siteGlobals = this.props.context.getStore(ApplicationStore).getState().globals;
    var siteMeta = this.props.context.getStore(MetaStore).getState().meta;

    var siteUrl = siteGlobals.siteUrl;
    var siteTitle = siteGlobals.siteTitle;

    return (

    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{siteMeta.metaTitle || siteTitle}</title>
      <meta name="description" content={siteMeta.metaDescription} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <meta itemProp="name" content={siteMeta.metaTitle || siteTitle} />
      <meta itemProp="description" content={siteMeta.metaDescription} />

      <meta name="generator" content="Morpheus + TODO version" />

      <meta property="og:type" content={siteMeta.ogType} />
      <meta property="og:title" content={siteMeta.metaTitle || siteTitle} />
      <meta property="og:url" content={siteMeta.fullUrl} />
      <meta property="og:description" content={siteMeta.metaDescription} />
      <meta property="og:image" content={siteMeta.metaImage} />
      <meta property="og:site_name" content={siteTitle} />

      <link rel="alternate" type="application/rss+xml" title={siteTitle + " RSS"} href={siteUrl + "/rss/"} />

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
