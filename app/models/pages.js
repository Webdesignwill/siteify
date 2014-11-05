
var mongoose = require('mongoose');

/* If there are no pages yet, this gets created */
// var startPage = {
//   name : 'siteify-start',
//   route : 'siteify/start(/)',
//   path : 'siteify/start/',
//   nav : true,
//   packages : [],
//   page : { view : 'DefaultPage', template : 'siteify-start' }
// };

var PagesSchema = new mongoose.Schema({
  name : {
    type: String,
    set : function toLower (str) {
      return str.toLowerCase();
    },
    unique : true,
    required : true
  },
  route : String,
  path : String,
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

mongoose.model('pages', PagesSchema);
var PagesModel = mongoose.model('pages');
module.exports = PagesModel;