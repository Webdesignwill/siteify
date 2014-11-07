
var mongoose = require('mongoose');

var SiteifySchema = new mongoose.Schema({
  status : {
    type : String,
    default : 'setup'
  }
});

SiteifySchema.statics.hello = function (callback) {
  SiteifyModel.findOne({status : 'setup'}, function (err, siteify) {
    if(err) callback(err);
    callback(err, siteify);
  });
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