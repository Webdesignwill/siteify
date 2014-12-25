
var Users = require('./../models').User,
      Oauth = require('./../models/oauth');

module.exports.all = function (req, res, next) {
  var i;
  Users.find(null, null, {sort : {'order' : 1}}, function (err, users) {
    if (err) next(err);
    res.json(users);
  });
};