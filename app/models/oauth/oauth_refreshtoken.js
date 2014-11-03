
var mongoose = require('mongoose');

var OAuthRefreshTokensSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
    unique: true
  },
  clientId: String,
  userId: {
    type: String,
    required: true
  },
  expires: Date
});

module.exports.saveRefreshToken = function(token, clientId, expires, userId, callback) {
  if (userId.id) {
    userId = userId.id;
  }
  var refreshToken = new OAuthRefreshTokensModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });
  refreshToken.save(callback);
};

module.exports.getRefreshToken = function(refreshToken, callback) {
  OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, function(err, token) {
    // node-oauth2-server defaults to .user or { id: userId }, but { id: userId} doesn't work
    // This is in node-oauth2-server/lib/grant.js on line 256
    if (token) {
      token.user = token.userId;
    }
    callback(err, token);
  });
};

module.exports.deleteRefreshToken = function(req, callback) {
  OAuthRefreshTokensModel.findOneAndRemove({ userId: req.session.userId }, callback);
};

mongoose.model('oauth_refreshtokens', OAuthRefreshTokensSchema);
var OAuthRefreshTokensModel = mongoose.model('oauth_refreshtokens');