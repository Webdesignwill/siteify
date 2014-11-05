
var Siteify = require('./../models').Siteify;

module.exports.hello = function (req, res, next) {
  Siteify.hello(function (err, firstTimeInstallation) {
    if(err) res.send(err);
    var showSetup = false;
    if(firstTimeInstallation) {
      showSetup = true;
    }
    res.json({showSetup:showSetup});
  });
};