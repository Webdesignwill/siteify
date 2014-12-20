
define(['Siteify'], function (Siteify) {

  "use strict";

  var Errors = function (err, message) {

    var map = {
      OAuth2Error : function OAuth2Error () {
        Siteify.$broker.trigger('modal:open', 'Login');
      }
    };

    // OAuth2Error: User credentials are invalid
    // OAuth2Error: Malformed auth header

    function normaliseError () {
      if(err.indexOf('OAuth2Error') === -1) {
        return 'OAuth2Error';
      }
    }

    map[normaliseError()]();

  };

  return Errors;

});