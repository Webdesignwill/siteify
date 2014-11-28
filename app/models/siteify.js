
var mongoose = require('mongoose'),
      relations = require('relations');

var SiteifySchema = new mongoose.Schema({
  owner : {
    type : Boolean,
    default : false
  },
  setup : {
    type : Boolean,
    default : false
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

SiteifySchema.statics.registerOwner = function (options, callback) {
  SiteifyModel.findOneAndUpdate({_id:options.siteid}, {
    owner : true
  }, null, function (err, siteify) {
    if(err) return callback(err);
    relations.siteify('%s is the owner of %s', options.userid, siteify._id.toString());
    callback(err, siteify);
  });
};

SiteifySchema.statics.setup = function (options, callback) {
  SiteifyModel.findOneAndUpdate({_id:options.siteid}, {
    setup : true,
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