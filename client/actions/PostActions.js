var NextAppDispatcher = require('../dispatcher/NextAppDispatcher');
var NextAppConstants = require('../constants/NextAppConstants');
var api = require('../utils/api');

var ActionTypes = NextAppConstants.ActionTypes;

module.exports = {
  receiveAllPosts: function(rawPosts) {
    NextAppDispatcher.handleServerAction({
      type: ActionTypes.GET_POST_SUCCESS,
      data: rawPosts
    });
  },
  receiveSingle: function(rawSingle) {
    NextAppDispatcher.handleServerAction({
      type: ActionTypes.GET_SINGLE_SUCCESS,
      data: rawSingle
    });
  },
  getAllPosts: function() {
    var that = this;
    NextAppDispatcher.handleServerAction({
      type: ActionTypes.GET_POST
    });
    api.get("/posts").then(function(res){
      that.receiveAllPosts(res.body);
    }, function(err){
      console.log("error",err);
    });
  },
  getSingle: function(slug) {
    var that = this;
    NextAppDispatcher.handleServerAction({
      type: ActionTypes.GET_SINGLE
    });
    api.get("/posts/"+slug).then(function(res){
      that.receiveSingle(res.body);
    }, function(err){
      console.log("error",err);
    });
  },
};
