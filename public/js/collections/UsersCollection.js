
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
        this.fetch({
          success : function (collection, response, options) {

          }
        });
      } else {
        this.reset();
      }
    }
  });

  return new UsersCollection();

});