'use strict';

var contentService = require('./content');

module.exports = function(config){
  return{
    content: contentService(config)
  };
};
