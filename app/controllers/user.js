
var User = require('./../models').User,
      Oauth = require('./../models/oauth'),

      // access control settings
      node_acl = require('./../../config/acl').node_acl();

function parseUserObject (user) {
  return {
    id : user._id,
    email : user.email,
    displayname : user.displayname,
    firstname : user.firstname,
    lastname : user.lastname,
    company : user.company,
    roles : user.roles,
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
  User.register({
      displayname : req.body.displayname,
      email : req.body.email,
      password : req.body.password
    }, function (err, user) {
    if (err) return next(err);

    node_acl.addUserRoles(user._id.toString(), 'admin');

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
  // findByIdAndUpdate
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

module.exports.getPermissions = function (req, res, next) {
  User.findOne({ _id : req.body.id }, function (err, user) {
    if(err) return next(err);

    if(!user) {
      return res.send(404, 'Fuck all');
    }

    // node_acl.allowedPermissions(user._id.toString(), req.body.resource, function (err, permissions) {
    //   res.json(permissions);
    // });

    node_acl.isAllowed(user._id.toString(), req.body.resource, req.body.permission, function (err, response) {
      res.json({result : response});
    });
  });
};