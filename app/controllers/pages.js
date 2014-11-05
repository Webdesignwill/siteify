
var Pages = require('./../models').Pages;

module.exports.create = function (req, res, next) {
  var page = new Pages();

  for(var key in req.body) {
    page[key] = req.body[key];
  }

  page.save(function(err) {
    if (err) res.send(err);
    res.json({
      success: 'New page created',
      data: page
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