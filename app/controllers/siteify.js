
var Siteify = require('./../models').Siteify,
      User = require('./../models').User,
      relations = require('relations');

function parseResponse (siteify) {
  return {
    id : siteify._id,
    sitename : siteify.sitename,
    status : siteify.status,
    setup : siteify.setup,
    owner : siteify.owner
  };
}

module.exports.hello = function (req, res, next) {
  Siteify.hello(req.session.siteid, function (err, siteify) {
    if(err) res.send(err);
    res.json(parseResponse(siteify));
  });
};

module.exports.owner = function (req, res, next) {

  function registerOwner () {
    User.register({
        displayname : req.body.displayname,
        email : req.body.email,
        password : req.body.password
      }, function (err, user) {
      if (err) return next(err);

      relations.siteify('%s is the owner of %s', user._id.toString(), 'siteify');

      Siteify.findOneAndUpdate({_id:req.session.siteid}, {
        owner : true
      }, null, function (err, siteify) {
        if(err) return next(err);
        res.json(parseResponse(siteify));
      });
    });
  }

  Siteify.findOne({_id:req.session.siteid}, function (err, siteify) {
    if(err) return next(err);
    if(siteify.owner) {
      res.send(401, "there is already an owner");
    }
    registerOwner();
  });
};

module.exports.setup = function (req, res, next) {
  function firstTimeInstall () {
    Siteify.setup({
      sitename : req.body.sitename,
      siteid : req.session.siteid
    }, function (err, siteify) {
      res.json(parseResponse(siteify));
    });
  }

  Siteify.findOne({_id:req.session.siteid}, function (err, siteify) {
    if(err) return next(err);
    firstTimeInstall();
  });

};