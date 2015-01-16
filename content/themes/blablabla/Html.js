'use strict';

var React = require('react');
var ApplicationStore = require('../../../shared/stores/ApplicationStore');
var MetaStore = require('../../../shared/stores/MetaStore');

var Html = React.createClass({

  render: function(){
    var siteGlobals = this.props.context.getStore(ApplicationStore).getState().globals;
    var siteMeta = this.props.context.getStore(MetaStore).getState().meta;

    var siteUrl = siteGlobals.siteUrl;
    var title = siteMeta.title || siteGlobals.siteTitle;
    var description = siteMeta.description || siteGlobals.siteDescription;

    return (

    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <meta itemProp="name" content={siteMeta.metaTitle} />
      <meta itemProp="description" content={siteMeta.metaDescription || description} />

      <meta name="generator" content={"Morpheus " + siteGlobals.version} />

      <meta property="og:type" content={siteMeta.ogType} />
      <meta property="og:title" content={siteMeta.metaTitle} />
      <meta property="og:url" content={siteMeta.fullUrl} />
      <meta property="og:description" content={siteMeta.metaDescription || description} />
      <meta property="og:image" content={siteMeta.metaImage} />
      <meta property="og:site_name" content={siteGlobals.siteTitle} />

      <link rel="alternate" type="application/rss+xml" title={siteGlobals.siteTitle + " RSS"} href={siteUrl + "/rss/"} />

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
