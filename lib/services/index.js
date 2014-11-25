
var postService = require('./post-service');

module.exports = function(config){
  return{
    post: postService(config)
  };
};
