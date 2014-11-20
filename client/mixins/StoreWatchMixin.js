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
    },

    getInitialState: function(props) {
      if (props) {
        return props;
      } else {
        return this.getState();
      }
    },

    componentWillReceiveProps: function(newProps, oldProps) {
      this.setState(this.getInitialState(newProps));
    },
  };
};
module.exports = StoreWatchMixin;
