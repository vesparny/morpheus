function throwMethodUndefined(methodName) {
  throw new Error('The method "' + methodName + '" is not defined! Please overridde it.');
}

function AbstractRepository() {}

AbstractRepository.prototype.find = function(entityName, options) {
  throwMethodUndefined('find');
};

AbstractRepository.prototype.findOne = function(entityName, options) {
  throwMethodUndefined('findOne');
};

module.exports = AbstractRepository;
