
define([
  'Siteify',
  'UserModel'
], function (Siteify, UserModel) {

  'use strict';

  var UsersCollection = Backbone.Collection.extend({

    url : '/api/users/all',
    model : UserModel,

    initialize : function () {
      this.listenTo(Siteify.Me, 'change:loggedin', function (me, loggedin) {
        this.getUsers(me, loggedin);
      }, this);
      this.getUsers();
    },

    getUsers : function (me, loggedin) {
      loggedin = loggedin ? loggedin : Siteify.Me.get('loggedin');
      me = me ? me : Siteify.Me;
      if(loggedin && me.get('owner')) {
        $.ajax({
          type : 'GET',
          context : this,
          url : this.url,
          contentType : 'application/x-www-form-urlencoded',
          headers : {
            Authorization : 'Bearer ' + Siteify.Oauth2.get('access_token')
          },
          success : function (data, status) {
            this.set(data);
          },
          error : function (data, status) {
            alert('Theres a problem getting the users');
          }
        });
      } else {
        this.reset();
      }
    }
  });

  return new UsersCollection();

});