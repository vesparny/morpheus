'use strict';

function throwMethodUndefined(methodName) {
  throw new Error('The method ' + methodName + ' is not defined! Please overridde it.');
}

function AbstractRepository() {}

AbstractRepository.prototype.find = function(entityName, options) { //jshint ignore:line
  throwMethodUndefined('find');
};

AbstractRepository.prototype.findOne = function(entityName, options) { //jshint ignore:line
  throwMethodUndefined('findOne');
};

AbstractRepository.prototype.findPage = function(entityName, options) { //jshint ignore:line
  throwMethodUndefined('findPage');
};

AbstractRepository.prototype.findTag = function(entityName, options) { //jshint ignore:line
  throwMethodUndefined('findTag');
};

module.exports = AbstractRepository;
