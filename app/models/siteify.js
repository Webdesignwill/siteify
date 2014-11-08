
var mongoose = require('mongoose');

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

SiteifySchema.statics.setup = function (options, callback) {
  SiteifyModel.findOneAndUpdate({_id:options.siteid}, {
    setup : true,
    status : 'installed',
    sitename : options.sitename
  }, null, callback);
};

mongoose.model('siteify', SiteifySchema);
var SiteifyModel = mongoose.model('siteify');
module.exports = SiteifyModel;

/* FIRST TIME ONLY */
SiteifyModel.findOne(function (err, siteify) {
  if(!siteify) SiteifyModel.create({});
});