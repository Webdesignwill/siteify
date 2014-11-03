
var mongoose = require('mongoose');

var Pages = new mongoose.Schema({
  name : {
    type: String,
    set : function toLower (str) {
      return str.toLowerCase();
    },
    unique : true,
    required : true
  },
  order : Number,
  page : {
    view : String,
    template : String
  },
  nav : Boolean,
  packages : Array,
  override : {
    route : String,
    path : String
  }
});

mongoose.model('pages', Pages);
var Pages = mongoose.model('pages');
module.exports = Pages;