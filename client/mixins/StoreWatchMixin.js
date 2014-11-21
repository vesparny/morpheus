var StoreWatchMixin = function(stores) {
  return {
    componentDidMount: function() {
      stores.forEach(function(store) {
        store.addChangeListener(this._setState);
      }.bind(this));
    },

    componentWillUnmount: function() {
      stores.forEach(function(store) {
        store.removeChangeListener(this._setState);
      }.bind(this));
    },

    _setState: function() {
      if (this.isMounted()) {
        this.setState(this.getState());
      }
    }
  };
};
module.exports = StoreWatchMixin;
