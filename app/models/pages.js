
var mongoose = require('mongoose'),
      relations = require('relations');

var PagesSchema = new mongoose.Schema({
  title : {
    type: String,
    required : true
  },
  name : {
    type : String,
    set : function makeName (str) {
      return str.toLowerCase().split(' ').join('-');
    }
  },
  path : {
    type : String,
    set : function makePath (str) {
      return '/' + str.toLowerCase().split(' ').join('-') + '/';
    }
  },
  order : {
    type : Number
  },
  view : {
    type : String,
    default : 'DefaultPage'
  },
  html : {
    type : String,
    default : '<div class="page-header"><h1>{{title}}</h1></div>'
  },
  homepage : {
    type : Boolean,
    defafult : false
  },
  nav : {
    type : Boolean,
    default : true
  },
  packages : Array
});

PagesSchema.statics.new = function (user, fields, callback) {

  fields.name = fields.title;
  fields.path = fields.title;

  var page = new PagesModel(fields);

  page.save(function (err, page) {
    if(err) return callback(err);
    relations.pages('%s is the owner of %s', user._id.toString(), page._id.toString());
    callback(err, page);
  });
};

mongoose.model('pages', PagesSchema);
var PagesModel = mongoose.model('pages');
module.exports = PagesModel;