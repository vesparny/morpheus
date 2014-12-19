'use strict';

var React = require('react');
var ApplicationStore = require('../../../shared/stores/ApplicationStore');

var Html = React.createClass({
  render: function(){
    var pageTitle = this.props.context.getStore(ApplicationStore).getPageMeta().pageTitle;
    var pageDescription = this.props.context.getStore(ApplicationStore).getPageMeta().pageDescription;

    return (

    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400" />
      <link rel="stylesheet" href="/assets/dist/main.css" />
    </head>
      <body dangerouslySetInnerHTML={{__html: this.props.markup}}></body>
    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
    <script src="/assets/dist/bundle.js"></script>
    </html>
    )
  }
});

module.exports = Html;
