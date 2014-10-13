exports.load = function(repositories) {
  return {
    post: require('./post-service')(repositories)
  };
};
