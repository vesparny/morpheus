/** @jsx React.DOM */

'use strict';

var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var PostList = require('./postList.jsx');

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
