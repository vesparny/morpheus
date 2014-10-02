var NextAppConstants = require('../constants/NextAppConstants');
var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var PayloadSources = NextAppConstants.PayloadSources;

var NextAppDispatcher = copyProperties(new Dispatcher(), {
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = NextAppDispatcher;
