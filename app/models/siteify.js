
var mongoose = require('mongoose');

var SiteifySchema = new mongoose.Schema({
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

/* When you first create the server, the default properties will be set
==================================================== */

// SiteifyModel.create({
//   setup: 'setup'
// }, function() {
//   process.exit();
// });