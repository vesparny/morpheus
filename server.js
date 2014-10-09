var app = require('./lib')();

app.run(function(err) {
  if (err) {
    process.exit(1);
  }
  console.log('');
});
