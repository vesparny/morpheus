'use strict';

var React = require('react');

var Loader = React.createClass({
  propTypes:{
    class: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      class: 'hidden'
    };
  },
  componentDidMount: function () {
    this.updateState(this.props);
  },
  componentWillReceiveProps: function (nextProps) {
    this.updateState(nextProps);
  },
  updateState: function (props) {
    this.setState({
      class: ['loader', props.class].join(' ') });
  },
  render: function() {
      return (
        <div className={this.state.class} >< /div>
      );
  }
});

module.exports = Loader;
