
var Siteify = require('./../models').Siteify,
      User = require('./../models').User,
      relations = require('relations');

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
  Siteify.findOne({_id:req.session.siteid}, function (err, siteify) {
    if(err) return next(err);
    if(!siteify.setup) {
      return firstTimeInstall();
    }
    res.json(parseResponse(siteify));
  });

  function firstTimeInstall () {
    Siteify.setup({
      sitename : req.body.sitename,
      siteid : req.session.siteid
    }, function (err, siteify) {
      res.json(parseResponse(siteify));
    });
  }
};