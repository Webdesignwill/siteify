
var Pages = require('./../models').Pages,
      User = require('./../models').User,
      Siteify = require('./../models').Siteify;

module.exports.new = function (req, res, next) {

  function setHomepage (page) {
    Siteify.setHomePageId({
      siteid : req.session.siteid,
      homepageid : page._id
    }, function (err, siteify) {
      if(err) return next(err);
      res.json(page);
    });
  }

  User.findOne({ email : req.user.id }, function (err, user) {
    if(err) return next(err);
    if(!user) res.send(404, "For some reason, that user isn't found");

    Pages.count({}, function (err, count) {
      if(err) return next(err);
      Pages.new(user, {
        title : req.body.title,
        count : count
      }, function (err, page) {
        if(page.homepage) {
          return setHomepage(page);
        }
        res.json(page);
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
  Pages.findByIdAndRemove(req.params.page_id, function (err) {
    if (err) res.send(err);
    res.send(200);
  });
};