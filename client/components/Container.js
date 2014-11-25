/** @jsx React.DOM */

'use strict';

var React = require('react');
var Header = require('./Header');
var Footer = require('./Footer');
var PostList = require('./PostList');

var Container = React.createClass({

  render: function() {
    return (
      <div className='wrapper'>
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
