/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./PostListElement');
var ContentActions = require('../../../actions/ContentActions');

var ContentListStore = require('../../../stores/ContentListStore');
var StoreMixin = require('fluxible-app').StoreMixin;
var Loader = require('./Loader');
var Header = require('./Header');
var Footer = require('./Footer');
var Paginator = require('./Paginator');


var PostList = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: {
      _onChange: [ContentListStore]
    }
  },
  propTypes:{
    context:React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      posts: this.getStore(ContentListStore).getContentList(),
      cssClass: 'home'
    };
  },
  getDefaultProps: function() {
    return {
      page: '1'
    };
  },
  componentDidMount: function() {
    if(!this.state.posts.length){
      this.props.context.executeAction(ContentActions.list);
    }
  },
  componentWillReceiveProps: function(props){
    if (props.page !== this.props.page) {
      this.getStore(ContentListStore).initialize();
      this.props.context.executeAction(ContentActions.list, {
        page:props.page
      });
    }
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  render: function() {
    var posts = [];
    var showLoader = this.state.posts.length === 0;
    this.state.posts.forEach(function(post, index){
      posts.push(<PostListElement key={index} post={post} context={this.props.context}/>);
    }.bind(this));
    var classes = 'wrapper '+this.state.cssClass;
    return (
      <div className={classes}>
      <Header context={this.props.context}/>
        <div className='main-content container'>
        <div className='post-container'>
        <Loader class={!showLoader ? 'hidden' : ''}/>
        {posts}
        <Paginator context={this.props.context} page={this.props.page} pageCount={this.props.pageCount} totalCount={this.props.totalCount}/>
        </div>
        </div>
        <Footer context={this.props.context}/>
      </div>
    );
  }
});

module.exports = PostList;
