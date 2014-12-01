
var Pages = require('./../models').Pages,
      User = require('./../models').User,
      Siteify = require('./../models').Siteify,
      relations = require('relations');

module.exports.new = function (req, res, next) {

  Siteify.findOne({}, function (err, siteify) {
    if(err) return next(err);

    User.findOne({ email : req.user.id}, function (err, user) {
      if(err) return next(err);

      relations.siteify('Is %s the owner of %s', user._id.toString(), siteify._id.toString(), function (err, result) {
        if(err) return next(err);
        if(result) {
          Pages.new(user, {
            title : req.body.title
          }, function (err, page) {
            if(err) return next(err);

            if(!siteify.homepage) {
              return Siteify.setHomePageId({
                homepageid : page._id
              }, function (err, siteify) {
                if(err) return next(err);
                res.json(page);
              });
            }
            res.json(page);
          });
        }
      });
    });
  });
};

module.exports.all = function (req, res, next) {
  Pages.find(null, null, {sort : {'order' : 1}}, function (err, pages) {
    if (err) callback(err, pages);
    res.send(200, pages);
  });
};

module.exports.get = function (req, res, next) {
  Pages.findById(req.params.page_id, function (err, page) {
    if (err) res.send(err);
    res.send(200, page);
  });
};

module.exports.put = function (req, res, next) {
  // findByIdAndUpdate
  Pages.findById(req.params.page_id, function (err, page) {
    if (err) res.send(err);

    for(var key in req.body) {
      page[key] = req.body[key];
    }

    page.save(function (err) {
      if (err) res.send(err);
      res.send(200, page);
    });
  });
};

module.exports.delete = function (req, res, next) {
  Siteify.findOne({}, function (err, siteify) {
    if(err) return next(err);

    User.findOne({ email : req.user.id }, function (err, user) {
      if(err) return next(err);

      relations.siteify('Is %s the owner of %s', user._id.toString(), siteify._id.toString(), function (err, result) {
        if(result) {
          Pages.findByIdAndRemove(req.body.pageid, function (err, page) {
            if (err) res.send(err);
            res.json(page);
          });
        } else {
          res.send(401, 'Only the owner can modify pages');
        }
      });
    });
  });
};