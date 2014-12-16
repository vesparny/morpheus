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
  siteUrl: 'http://localhost:3000',
  useSSL: false,
  siteTitle: 'welcome',
  siteDescription: 'to the next generation blogging platform',
  port: 3000,
  ip: '127.0.0.1'
};
