'use strict';

var ContentRepository = require('./content-repository');
module.exports = function (){
  return {
    content: new ContentRepository()
  };
};
