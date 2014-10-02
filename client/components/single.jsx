var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/PostActions');

var Single = React.createClass({

  propTypes: {
   post: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    var post = this.props.post || {};

    return (
      <div>
        {post.text}
      </div>
    );
  }
});

module.exports = Single;
