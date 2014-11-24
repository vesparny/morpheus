/** @jsx React.DOM */

'use strict';

var React = require('react');

var Sidebar = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li>aside</li>
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
