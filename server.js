var app = require('./lib');
app.run(function(express) {
  app.logger.info("app version %s started on port %d", app.version, express.get("port"));
});
