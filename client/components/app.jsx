/** @jsx React.DOM */

'use strict';

var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var PostList = require('./postList.jsx');

var App = React.createClass({

  render: function() {
    return (
      <div className='app-wrapper'>
        <Header/>
        <div className='main-content container'>
          <PostList posts={this.props.data}/>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = App;
