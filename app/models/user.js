
var mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

var OAuthUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  displayname : {
    type : String,
    default : 'Display name'
  },
  firstname: {
    type : String,
    default : 'First name'
  },
  lastname: {
    type : String,
    default : 'Last name'
  },
  company: {
    type : String,
    default : 'Company name'
  },
  hashed_password: {
    type: String,
    required: true
  },
  password_reset_token: {
    type: String
    // unique: true TODO Find out why this is duplicate if set
  },
  reset_token_expires: Date
});

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

OAuthUsersSchema.statics.register = function (fields, callback) {
  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;
  var user = new OAuthUsersModel(fields);
  user.save(callback);
};

OAuthUsersSchema.statics.authenticate = function (email, password, callback) {
  this.findOne({ email: email }, function (err, user) {
    if (err || !user) return callback(err, user);
    callback(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
};

OAuthUsersSchema.statics.getUser = function (email, password, callback) {
  OAuthUsersModel.authenticate(email, password, function (err, user) {
    if (err || !user) return callback(err, user);
    callback(null, user.email);
  });
};

OAuthUsersSchema.statics.logout = function (req, callback) {
  req.session.destroy(function () {
    callback();
  });
};

mongoose.model('users', OAuthUsersSchema);
var OAuthUsersModel = mongoose.model('users');
module.exports = OAuthUsersModel;