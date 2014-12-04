'use strict';

var path = require('path');

module.exports = {
  log: {
    level: 'info',
    file: path.resolve(process.env.OPENSHIFT_DATA_DIR, 'log.log'),
  },
  siteUrl: 'https://flashdemo-arnodo.rhcloud.com',
  port: process.env.OPENSHIFT_NODEJS_PORT,
  ip: process.env.OPENSHIFT_NODEJS_IP
};
