
module.exports.requiresUser = function (req, res, next) {
  if (req.session.userId) {
    req.user = { id: req.session.userId };
    next();
  } else {
    res.app.oauth.authorise()(req, res, next);
  }
};