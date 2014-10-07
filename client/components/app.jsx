/** @jsx React.DOM */

'use strict';

var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

window.React = React;

var App = React.createClass({
  render: function() {
    return (
      <div className='app-wrapper'>
        <Header/>
        <div className='main-content container'>
          {<this.props.activeRouteHandler />}
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = App;
