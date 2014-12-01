
var Siteify = require('./../models').Siteify,
      User = require('./../models').User;

function parseResponse (siteify) {
  return {
    id : siteify._id.toString(),
    sitename : siteify.sitename,
    setup : siteify.setup,
    owner : siteify.owner,
    homepageid : siteify.homepageid,
    homepage : siteify.homepage
  };
}

module.exports.hello = function (req, res, next) {
  Siteify.hello(function (err, siteify) {
    if(err) res.send(err);
    res.json(parseResponse(siteify));
  });
};

module.exports.owner = function (req, res, next) {

  function registerOwner () {
    User.register({
        displayname : req.body.displayname,
        email : req.body.email,
        password : req.body.password,
        owner : true
      }, function (err, user) {
      if (err) return next(err);

      Siteify.registerOwner({
        userid : user._id.toString()
      }, function (err, siteify) {
        res.json(parseResponse(siteify));
      });
    });
  }

  Siteify.findOne({}, function (err, siteify) {
    if(err) return next(err);
    if(siteify.owner) {
      res.send(401, "there is already an owner");
    }
    registerOwner();
  });
};

module.exports.setup = function (req, res, next) {
  function setup () {
    Siteify.setup({
      sitename : req.body.sitename,
    }, function (err, siteify) {
      res.json(parseResponse(siteify));
    });
  }

  Siteify.findOne({}, function (err, siteify) {
    if(err) return next(err);
    if(siteify.setup) {
      res.send(401, "The site has already been setup");
    }
    setup();
  });

};