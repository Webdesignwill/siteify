
var Siteify = require('./../models').Siteify;

module.exports.requiresUser = function (req, res, next) {
  if (req.session.userId) {
    req.user = { id : req.session.userId };
    next();
  } else {
    res.app.oauth.authorise()(req, res, next);
  }
};

module.exports.sessionSiteId = function (req, res, next) {
  if(!req.session.siteid) {
    var query = req.session.siteid || {};
    return Siteify.findOne(query, function (err, siteify) {
      req.session.siteid = siteify._id;
      next();
    });
  }
  next();
};