'use strict';

var React = require('react');
var ContentListStore = require('../../../shared/stores/ContentListStore');
var HeaderSingle = require('./HeaderSingle');
var Footer = require('./Footer');
var StoreMixin = require('fluxible').StoreMixin;


var Single = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: {
      _onChange: [ContentListStore]
    }
  },
  propTypes:{
    tag: React.PropTypes.object.isRequired
  },
  _onChange: function() {
    this.setState({});
  },
  render: function() {
    return (
      <div>
        <HeaderSingle context={this.props.context}/>
        <div className='main-content container'>
          <article className="post">
            this page has to be implemented
      </article>
    </div>
    <Footer context={this.props.context}/>
    </div>
    );
  }
});

module.exports = Single;
