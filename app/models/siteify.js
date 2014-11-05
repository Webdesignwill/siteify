
var mongoose = require('mongoose');

var SiteifySchema = new mongoose.Schema({
  firstTimeInstallation : {
    type : Boolean,
    default : true
  }
});

SiteifySchema.statics.hello = function (callback) {
  SiteifyModel.find({firstTimeInstallation : true}, function (err, firstTimeInstallation) {
    if(err) callback(err);
    callback(err, firstTimeInstallation);
  });
};

mongoose.model('siteify', SiteifySchema);
var SiteifyModel = mongoose.model('siteify');
module.exports = SiteifyModel;

/* When you first create the server, the default properties will be set
==================================================== */

// SiteifyModel.create({
//   firstTimeInstallation: true
// }, function() {
//   process.exit();
// });