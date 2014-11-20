/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

var Sidebar = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
          <li><Link to="/single">Dashboard</Link></li>
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
