
define([
  'Siteify'
], function (Siteify) {

  'use strict';

  var UserModel = Backbone.Model.extend({

    initialize : function () {},

    parse : function (model) {
      return model;
    }

  });

  return UserModel;

});