
var Siteify = require('./../models').Siteify;

function parseResponse (siteify) {
  return {
    id : siteify._id,
    sitename : siteify.sitename
  };
}

module.exports.hello = function (req, res, next) {
  Siteify.hello(req.session.siteid, function (err, siteify) {
    if(err) res.send(err);
    res.json(parseResponse(siteify));
  });
};

module.exports.setup = function (req, res, next) {
  Siteify.setup(req.session.siteid, function (err, siteify) {
    if(err) res.send(err);
    res.json(parseResponse(siteify));
  });
};