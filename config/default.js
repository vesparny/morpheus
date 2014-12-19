'use strict';

var path = require('path');
var appRoot = process.cwd();

module.exports = {
  log: {
    level: 'debug',
    file: path.resolve(appRoot, 'content/logs/log.log'),
  },
  'repository-strategy': {
    type: 'file-system-repository-strategy'
  },
  debug: true, //useful for seeing some logs in the browser console
  appRoot: appRoot,
  configDir: path.resolve(appRoot, 'config'),
  contentPath: path.resolve(appRoot, 'content'),
  postPerPage: 3, // number of posts per page
  siteUrl: 'http://localhost:3000', // the url of your website
  useSSL: false, // if true it redirects all incoming requests to the https url
  siteTitle: 'Morpheus',
  highlightCode: true, // if true it highlights code blocks with hoghlightjs
  theme: 'blablabla', // currently used theme
  siteDescription: '- say hi to the next generation web publishing platform -',
  port: 3000,
  ip: '127.0.0.1',
  authors: {
    'youreamail@yourwebsite.something': {
      meta: 'I really like to write :)'
    }
  },
  clickyAnalytics : '', //your clicky numeric code
  disqusComments : '' //your disqus shortname
};
