
var acl = require('acl'), node_acl;

module.exports.initialize = function (app, db, config) {

  node_acl = new acl(
    new acl.mongodbBackend(db.connection.db, 'acl_')
  );

  node_acl.allow([{
    roles : 'admin',
    allows : [{
      resources: '/api/user/me',
      permissions: ['create', 'remove', 'update', 'delete']
    }]
  }]);
};

module.exports.node_acl = function () {
  return node_acl;
};