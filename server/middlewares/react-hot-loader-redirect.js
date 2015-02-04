'use strict';

module.exports = function(req, res) {
  console.log('http://localhost:3001/assets/dist/bundle.js');
  res.redirect('http://localhost:3001/assets/dist/bundle.js');
};
