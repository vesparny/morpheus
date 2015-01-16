'use strict';


module.exports = {
  log: {
    level: 'debug',
    file: 'morpheus.log',
  },
  'repositoryStrategy': {
    type: 'file-system-repository-strategy'
  },
  debug: true, //useful for seeing some logs in the browser console
  permalinkStructure:'/:year/:month/:day/:title/', //you can also use /:title/ or '/:year/:month/:title/'
  postPerPage: 3, // number of posts per page
  siteUrl: 'http://localhost:3000', // the url of your website
  useSSL: false, // if true it redirects all incoming requests to the https url
  siteTitle: 'Morpheus',
  theme: 'blablabla', // currently used theme
  siteDescription: '- say hi to the next generation web publishing platform -',
  port: 3000,
  ip: '127.0.0.1',
  authors: {
    'youreamail@yourwebsite.something': {
      meta: 'I really like to write :)'
    }
  },
  googleAnalytics : 'UA-XXXXX', //your google analytics tracking code
  disqusComments : '' //your disqus shortname
};
