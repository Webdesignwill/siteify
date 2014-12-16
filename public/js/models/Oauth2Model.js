
define([
  'Backbone'
], function (Backbone) {

  "use strict";

  var Oauth2Model = Backbone.Model.extend({

    app : {
      secret : 'c2l0ZWlmeWF3ZXNvbWVjbXM6c2l0ZWlmeWlzdGhlb25seWF3ZXNvbWVjb250ZW50bWFuYWdlbWVudHN5c3RlbXRoYXR3ZWxvdmVmb3JldmVy'
    },

    urls : {
      token : '/api/oauth/token'
    },

    requestAccessToken : function (user, done) {
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
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    }

  });

  return new Oauth2Model();

});
