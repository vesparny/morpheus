'use strict';

var React = require('react');
var ServerError = React.createClass({
  render: function(){
    return (
    <div>{this.props.err}</div>
    )
  }
});

module.exports = ServerError;
