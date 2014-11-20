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
          <div className={this.props.content}></div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = App;
