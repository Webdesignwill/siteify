
var path = require('path'),
      rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development : {
    db : 'mongodb://127.0.0.1:27017/siteify',
    root : rootPath
  },
  production : {
    db : process.env.MONGOLAB_URI,
    root : rootPath
  }
};