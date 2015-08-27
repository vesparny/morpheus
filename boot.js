const env = process.env.NODE_ENV || 'development';
const webpackConfigDev = require('./webpack.config.development');

let js = `http://${webpackConfigDev._address}:${webpackConfigDev._hotPort}/build/bundle.js`;

if (env === 'development' || env === 'local') {
  // run webpack dev server
  require('./devServer');
}


var morpheus = require('./morpheus');

morpheus.run(function(info) {
  morpheus.logger.info('Worker %s is running morpheus@%s in %s mode on port %d', process.pid, info.version, process.env.NODE_ENV || 'development', info.port);
});
