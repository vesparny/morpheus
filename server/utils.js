'use strict';

var downsize = require('downsize');
var React = require('react');
var config = require('../shared/config');
var marked = require('marked');

module.exports = {
  detectEnvironment: function() {
    return process.env.NODE_ENV || 'development';
  },
  excerpt: function(md) {
    var res;
    res = md.replace(/<\/?[^>]+>/gi, '');
    res = res.replace(/(\r\n|\n|\r)+/gm, ' ');
    return downsize(res, {
      'words': 50
    });
  },
  render: function(res, markup, state) {
    const componentHTML = markup;
    const initialState = state;
    const html = `
      <!DOCTYPE html>
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
        <body>
          <div id="root">${componentHTML}</div>
          <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
          <script src="http://localhost:3002/dist/bundle.js"></script>
        </body>
      </html>
    `;
    res.set({
      'content-type': 'text/html; charset=utf-8'
    });
    res.end(html);

  },
  md2html: function(md) {
    return new Promise(function(resolve, reject) {
      marked(md, function(err, content) {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }
};
