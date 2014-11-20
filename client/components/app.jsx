/** @jsx React.DOM */

'use strict';

var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

var App = React.createClass({

  getInitialState: function(props){
    return props || this.props;
    console.log(props)
  },
  componentWillReceiveProps: function(newProps){
    alert(newProps);
    this.setState(this.getInitialState(newProps));
  },
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
