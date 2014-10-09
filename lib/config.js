var _ = require("lodash"),
  path = require("path"),
  fs = require("fs"),
  stripJson = require("strip-json-comments");


function loadConfigFile(configDir, fileName) {
  var textLoaded = fs.readFileSync(path.resolve(configDir, fileName + ".json"), 'utf-8');
  return JSON.parse(stripJson(textLoaded));
}

/**
 *
 * @param config
 * @constructor
 */
function Config(env) {
  this.data = null;
  this.load(env);
}

/**
 *
 */
Config.prototype.load = function(env) {
  var self = this,
    defaultConfig = {},
    envConfig = {},
    appRoot = process.cwd(),
    configDir = path.resolve(appRoot, 'config');

  try {
    defaultConfig = loadConfigFile(configDir, "default");
    envConfig = loadConfigFile(configDir, env);
    this.data = _.merge(defaultConfig, envConfig);
    this.data.appRoot = appRoot;
    this.env = env;
  } catch (err) {
    throw new Error("Failed to laod configuration. Caused by: \n" + err.stack);
  }
};


Config.prototype.get = function(key) {
  return key ? this.data[key] : this.data;
};

module.exports = Config;
