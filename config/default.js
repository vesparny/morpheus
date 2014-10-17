var path = require('path');
var appRoot = process.cwd();

module.exports = {
  log: {
    level: 'info',
    file: 'log.log'
  },
  'repository-strategy': {
    type: 'file-system-repository-strategy'
  },
  appRoot: appRoot,
  configDir: path.resolve(appRoot, 'config')
};
