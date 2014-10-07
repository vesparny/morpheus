var _ = require('lodash');

var StoreWatchMixin = function(stores) {
  return {
    componentDidMount: function() {
    _.each(stores, function(store) {
        store.addChangeListener(this._setState);
      }, this);
    },

    componentWillUnmount: function() {
      _.each(stores, function(store) {
        store.removeChangeListener(this._setState);
      }, this);
    },

    _setState: function() {
      if (this.isMounted()) {
        this.setState(this.getState());
      }
    },

    getInitialState: function() {
      return this.getState();
    }
  };
};
module.exports = StoreWatchMixin;
