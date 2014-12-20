
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
    owner : user.owner,
    loggedin : true
  };
}

function logMeOut (req, res, next) {
  Oauth.deleteAccessToken(req, function () {
    Oauth.deleteRefreshToken(req, function () {
      res.send(200);
    });
  });
}

/* Register user
============================= */
module.exports.register = function (req, res, next) {
  User.register({
      displayname : req.body.displayname,
      email : req.body.email,
      password : req.body.password
    }, function (err, user) {
    if (err) return next(err);
    res.json(parseUserObject(user));
  });
};

/* See if the email exists
============================= */
module.exports.unique = function (req, res, next) {
  User.findOne({ email : req.body.email }, function (err, user) {
    if (err) res.send(err);
    var statusCode = user ? 401 : 200;
    res.send(statusCode);
  });
};

/* Get me as the user
============================= */
module.exports.me = function (req, res, next) {
  console.log('REQ ************************** : ', req);
  // User.findById(req.user.id, function (err, user) {
  //   console.log('USER ************************** : ', user);
  //   if (err) next(err);
  //   res.json(parseUserObject(user));
  // });
  res.send(200);
};

/* Delete me as a user
============================= */
module.exports.deleteMe = function (req, res, next) {
  User.findById(req.user.id, function (err, user) {
    User.findByIdAndRemove(user.id, function (err) {
      if (err) res.send(err);
      logMeOut(req, res, next);
    });
  });
};

/* Update me a user
============================= */
module.exports.putMe = function (req, res, next) {
  // findByIdAndUpdate
  User.findById(req.user.id, function (err, user) {
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