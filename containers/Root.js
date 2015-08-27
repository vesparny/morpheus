import React, { Component, PropTypes } from 'react';

const Root = React.createClass({
  render() {
    return (
      <div>
       {this.props.children}
      </div>
    );
  }
});

export default Root;
