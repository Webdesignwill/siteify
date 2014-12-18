
define([
  'Siteify'
],

function (Siteify) {

  "use strict";

  var UserModel = Backbone.Model.extend({

    defaults : {
      loggedin : false
    },

    urls : {
      register : '/api/user/register',
      login : '/api/user/login',
      logout : '/api/user/logout',
      me : '/api/user/me'
    },

    initialize : function () {
      var self = this;
      Siteify.$broker.on('user:logout', function () {
        self.logout();
      });

      if(Siteify.Oauth2.get('refresh_token')) {
        Siteify.Oauth2.refreshToken(function (result, data, status) {
          if (result) { return self.getMe(null); }
        });
      }
    },

    register : function (user, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.register,
        contentType : 'application/x-www-form-urlencoded',
        data : user,
        success : function (data, status) {
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    login : function (user, done) {
      var self = this;
      Siteify.Oauth2.requestAccessToken(user, function (result, data, status) {
        if (result) { return self.getMe(done); }
        done(false, data, status);
      });
    },

    getMe : function (done) {
      $.ajax({
        type : 'GET',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Siteify.Oauth2.get('access_token')
        },
        success : function (data, status) {
          this.set(data);
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    put : function (user, done) {
      $.ajax({
        type : 'PUT',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Siteify.Oauth2.get('access_token')
        },
        data : user,
        success : function (data, status) {
          this.set(data);
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    deleteMe : function (done) {
      $.ajax({
        type : 'DELETE',
        context : this,
        url : this.urls.me,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Siteify.Oauth2.get('access_token')
        },
        success : function (data, status) {
          this.clearUser();
          if(done) return done(true, data, status);
        },
        error : function (data, status) {
          if(done) return done(false, data, status);
        }
      });
    },

    logout : function () {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.logout,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Siteify.Oauth2.get('access_token')
        },
        success : function (data, status) {
          this.clearUser();
        }
      });
    },

    clearUser : function () {
      this.clear({silent : true});
      Siteify.Oauth2.clear();
      this.set(this.defaults);
    },

  });

  return UserModel;

});
