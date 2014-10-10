var path = require('path');
module.exports = exports = function(app) {
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../client/index.html'));
  });
};
