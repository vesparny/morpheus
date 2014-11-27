module.exports = {
  intersperse: function (arr, sep) {
    if (arr.length === 0) {
      return [];
    }
    return arr.slice(1).reduce(function(xs, x, i) { // jshint ignore:line
      return xs.concat([sep, x]);
    }, [arr[0]]);
  }
};
