
var Siteify = require('./../models').Siteify;

module.exports.hello = function (req, res, next) {
  Siteify.hello(function (err, siteify) {
    if(err) res.send(err);
    res.json({status:siteify.status});
  });
};