
define([
  'Backbone'
], function (Backbone) {

  "use strict";

  var Oauth2Model = Backbone.Model.extend({

    app : {
      secret : 'aW50ZXJ2YWxmaWx0ZXI6aW50ZXJ2YWxmaWx0ZXJpc3RoZWJlc3RmaWx0ZXJpbnRoZXdvcmxk'
    },

    urls : {
      token : '/api/oauth/token'
    },

    requestAccessToken : function (user, callback) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.token,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Basic ' + this.app.secret
        },
        data : {
          'grant_type' : 'password',
          'username' : user.email,
          'password' : user.password
        },
        success : function (data, status) {
          this.set({
            refresh_token : data.refresh_token,
            access_token : data.access_token
          });
          callback(true, data, status);
        },
        error : function (data, status) {
          callback(false, data, status);
        }
      });
    }

  });

  return new Oauth2Model();

});
