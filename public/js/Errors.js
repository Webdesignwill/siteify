
define(['Siteify'], function (Siteify) {

  "use strict";

  var Errors = function (err, message) {

    var map = {
      OAuth2Error : function OAuth2Error () {
        Siteify.$broker.trigger('modal:open', 'Login');
      }
    };

    function normaliseError () {
      if(err.indexOf('OAuth2Error') === -1) {
        return 'OAuth2Error';
      }
    }

    map[normaliseError()]();

  };

  return Errors;

});