exports.detectEnvironment = function() {
  return process.env.NODE_ENV || "development";
};
