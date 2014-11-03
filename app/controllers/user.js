
var User = require('./../models').User,
      Oauth = require('./../models/oauth');

function parseUserObject (user) {
  return {
    id : user._id,
    email : user.email,
    displayname : user.displayname,
    firstname : user.firstname,
    lastname : user.lastname,
    company : user.company,
    loggedin : true
  };
}

function logMeOut (req, res, next) {
  Oauth.deleteAccessToken(req, function () {
    Oauth.deleteRefreshToken(req, function () {
      User.logout(req, function () {
        res.send(200, {message : 'Logged out'});
      });
    });
  });
}

/* Start session, login
============================= */
module.exports.session = function (req, res, next) {
  User.authenticate(req.body.email, req.body.password, function (err, user) {
    if (err) return next(err);
    req.session.userId = user.email;
    res.send(200, parseUserObject(user));
  });
};

/* Register user
============================= */
module.exports.register = function (req, res, next) {
  User.register(req.body, function (err, user) {
    if (err) return next(err);
    res.send(200);
  });
};

/* See if the email exists
============================= */
module.exports.unique = function (req, res, next) {
  User.findOne({ email : req.body.email }, function (err, user) {
    if (err) res.send(err);
    var statusCode = user ? 500 : 200;
    res.send(statusCode);
  });
};

/* Get me as the user
============================= */
module.exports.getMe = function (req, res, next) {
  User.findOne({ email : req.user.id }, function (err, user) {
    if (err) res.send(err);
    res.send(200, parseUserObject(user));
  });
};

/* Delete me as a user
============================= */
module.exports.deleteMe = function (req, res, next) {
  User.findOne({ email : req.user.id }, function (err, user) {
    User.findByIdAndRemove(user.id, function (err) {
      if (err) res.send(err);
      logMeOut(req, res, next);
    });
  });
};

/* Update me a user
============================= */
module.exports.putMe = function (req, res, next) {
  User.findOne({ email : req.user.id }, function (err, user) {
    if (err) res.send(err);
    for(var key in req.body) {
      user[key] = req.body[key];
    }
    user.save(function (err, user) {
      if (err) res.send(err);
      res.send(200, parseUserObject(user));
    });
  });
};

/* Log me out
============================= */
module.exports.logout = function (req, res, next) {
  logMeOut(req, res, next);
};