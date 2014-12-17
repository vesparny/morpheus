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
  appRoot: appRoot,
  configDir: path.resolve(appRoot, 'config'),
  contentPath: path.resolve(appRoot, 'content'),
  postPerPage: 3,
  siteUrl: 'http://localhost:3000',
  useSSL: false,
  siteTitle: 'Morpheus',
  highlightCode: true,
  theme: 'blablabla',
  siteDescription: '- say hi to the next generation web publishing platform -',
  port: 3000,
  ip: '127.0.0.1',
  authors: {
    'alessandro@arnodo.net': {
      meta: 'Just another code monkey!'
    }
  }
};
