'use strict';

function throwMethodUndefined(methodName) {
  throw new Error('The method ' + methodName + ' is not defined! Please overridde it.');
}

function AbstractRepository() {}

AbstractRepository.prototype.find = function(options) { //jshint ignore:line
  throwMethodUndefined('find');
};

AbstractRepository.prototype.findOne = function(options) { //jshint ignore:line
  throwMethodUndefined('findOne');
};

AbstractRepository.prototype.findPage = function(options) { //jshint ignore:line
  throwMethodUndefined('findPage');
};

AbstractRepository.prototype.findTag = function(options) { //jshint ignore:line
  throwMethodUndefined('findTag');
};

AbstractRepository.prototype.getPostsForFeed = function(options) { //jshint ignore:line
  throwMethodUndefined('getPostsForFeed');
};

module.exports = AbstractRepository;
