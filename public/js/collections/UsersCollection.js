
define([
  'Siteify'
], function (Siteify) {

  'use strict';

  var UsersCollection = Backbone.Collection.extend({

    url : '/api/users/all',

    initialize : function () {
      this.listenTo(Siteify.User, 'change:loggedin', function (user, prop) {
        if(prop && user.get('owner')) {
          this.fetch({
            success : function (collection, response, options) {

            }
          });
        } else {
          this.reset();
        }
      }, this);
    }
  });

  return new UsersCollection();

});