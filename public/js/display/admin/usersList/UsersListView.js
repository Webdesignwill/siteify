
define([
  'Siteify',
  'UsersCollection'
], function (Siteify, UsersCollection) {

  'use strict';

  var UsersListView = Backbone.View.extend({

    initialize : function () {

    },

    close : function () {
      alert('TO DO, remove collection, kill all sub views, stopListening etc etc');
    }

  });

  return UsersListView;

});