/** @jsx React.DOM */

'use strict';

var React = require('react');
var Aviator = require('aviator');

var Link = React.createClass({
  render: function() {
    var that = this;
    function click(e){
      e.preventDefault();
      Aviator.pushStateEnabled = true;
      Aviator.navigate(that.props.to);
    }
    return (
      <a onClick={click} href={this.props.to}>{this.props.children}</a>
    );
  }
});

module.exports = Link;
