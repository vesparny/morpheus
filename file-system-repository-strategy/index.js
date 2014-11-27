'use strict';

var PostRepository = require('./post-repository');
module.exports = function (){
  return {
    post: new PostRepository()
  };
};
