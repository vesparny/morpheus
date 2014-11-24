/** @jsx React.DOM */

'use strict';

var React = require('react');
var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');
var PostList = require('./PostList.jsx');

var Container = React.createClass({

  render: function() {
    return (
      <div className='app-wrapper'>
        <Header/>
        <div className='main-content container'>
         {this.props.page}
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Container;
