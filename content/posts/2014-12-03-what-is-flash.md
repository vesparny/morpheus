---
type: post
author: Alessandro Arnodo
tags: flash
slug: what-is-flash
permalink: /what-is-flash
title: What is Flash?
---


This is the "Hello world" post of [Flash](https://github.com/vesparny/flash), a Node.js blogging platform, minimalist
and extensible. I'm going to keep this post **because I love Hadron**, beside the fact that *this post is cool*.

### Reasons I like Flash

* Uses javascript and [Node.js](http://nodejs.org/)
* It uses React and it's rendered server-side
* It's isomorphic

```javascript
/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostList = require('./PostList');
var Single = require('./Single');
var ApplicationStore = require('../../../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible-app').StoreMixin;


var App = React.createClass({
  mixins: [RouterMixin, StoreMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },
  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },
  onChange: function () {
    var state = this.getStore(ApplicationStore).getState();
    this.setState(state);
  },
  render: function(){
    if (this.state.currentPageName === 'home') {
      return <PostList context={this.props.context}/>;
    }
    if (this.state.currentPageName === 'single') {
      return <Single context={this.props.context} slug={this.state.route.params.slug}/>;
    }
  }
});

module.exports = App;
```
