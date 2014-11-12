
var Siteify = require('./../models').Siteify,
      User = require('./../models').User;

function parseResponse (siteify) {
  return {
    id : siteify._id,
    sitename : siteify.sitename,
    status : siteify.status,
    setup : siteify.setup
  };
}

module.exports.hello = function (req, res, next) {
  Siteify.hello(req.session.siteid, function (err, siteify) {
    if(err) res.send(err);
    res.json(parseResponse(siteify));
  });
};

module.exports.setup = function (req, res, next) {
  Siteify.setup({
    sitename : req.body.sitename,
    siteid : req.session.siteid
  }, function (err, siteify) {
    if (err) return next(err);
    User.register({
      displayname : req.body.displayname,
      email : req.body.email,
      password : req.body.password
    }, function (err, user) {
      if (err) return next(err);
      res.json(parseResponse(siteify));
    });
  });
};