
var mongoose = require('mongoose');

/* App States
=============

setup
installed

*/

var SiteifySchema = new mongoose.Schema({
  setup : {
    type : Boolean,
    default : false
  },
  status : {
    type : String,
    default : 'setup'
  },
  sitename : {
    type : String,
    default : null
  }
});

SiteifySchema.statics.hello = function (siteid, callback) {
  SiteifyModel.findOne({_id:siteid}, function (err, siteify) {
    if(err) callback(err);
    callback(err, siteify);
  });
};

SiteifySchema.statics.setup = function (siteid, callback) {

  callback();
};

mongoose.model('siteify', SiteifySchema);
var SiteifyModel = mongoose.model('siteify');
module.exports = SiteifyModel;

/* FIRST TIME ONLY */
SiteifyModel.findOne(function (err, siteify) {
  if(!siteify) SiteifyModel.create({});
});