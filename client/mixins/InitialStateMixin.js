'use strict';

var InitialStateMixin = {
  getInitialState: function() {
    return this.props;
  },
  onChange: function() {
    this.setState(this.getState());
  }
};

module.exports = InitialStateMixin;
