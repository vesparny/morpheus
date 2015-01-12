'use strict';

module.exports = function(req, res, next) {
  if (req.url === '/robots.txt') {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /admin/\nSitemap: /sitemap.xml');
  } else {
    next();
  }
};
